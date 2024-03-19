import React, { useEffect, useState } from 'react'
import NavBar from '../Layouts/NavBar'
import axios from 'axios';
import sweetalert from 'sweetalert2';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const EditProduct = () => {
const location = useLocation();
let product_id = location.state.productId;

const user = JSON.parse(Cookies.get('user') || null);
const user_id = user._id
const navigate = useNavigate();
const [loading, setLoading] = useState(false);
const [errors, setErrors] = useState({});
const [error, setError] = useState(null);
const [categories, setCategory] = useState([]);
const [subCategories, setSubCategory] = useState([]);
const [cities, setCity] = useState([]);
const [oldImg, setOldImg] = useState([]);
const [formData, setFormData] = useState({
    name: '',
    images: [],
    oldImages: [],
    description: '',
    price: '',
    phone: '',
    city_id: '',
    category_id: '',
    subCategory_id: '',
    user_id: user_id,
});

const removeImage = (e,index)=>{
    e.preventDefault();
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
}

const removeOldImage = (e, index) => {
    e.preventDefault();

    const updatedImagesFormData = [...formData.oldImages];
    updatedImagesFormData.splice(index, 1);
    setFormData(prevState => ({
        ...prevState,
        oldImages: updatedImagesFormData 
    }));

    const updatedImagesOldImg = [...oldImg]; 
    updatedImagesOldImg.splice(index, 1);
    setOldImg(updatedImagesOldImg);
};

const handleImageChange = (e) => {
    const images = e.target.files;
    const files = formData.images;
    const promises = [];

    for (let i = 0; i < images.length; i++) {
        const file = images[i];
        const reader = new FileReader();
        const promise = new Promise((resolve, reject) => {
            reader.onload = () => {
                files.push(reader.result);
                resolve();
            };
            reader.onerror = reject;
        });

        reader.readAsDataURL(file);
        promises.push(promise);
    }

    Promise.all(promises).then(() => {
        setFormData({ ...formData, images: files });
        console.log(formData);
    }).catch(error => console.error(error));
};

const schema = yup.object().shape({
    name: yup.string().required('Product Name is Required'),
    description: yup.string().required('Description is Required'),
    price: yup.number().required('Price is Required'),
    phone: yup.string()
    .required('Phone number is Required')
    .matches(/^[\+]?(212)[6-8]{1}[0-9]{8}$/, 'Invalid phone number format'),
    city_id: yup.string().required('City is Required'),
    category_id: yup.string().required('Category is Required'),
    subCategory_id: yup.string().required('SubCategory is Required'),
});

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await schema.validate(formData, { abortEarly: false });
        if (formData.images.length === 0 && formData.oldImages.length === 0) {
            return setErrors({images: 'At least one image is required'});
        }
        const requestData = { ...formData };

        axios.post(`http://localhost:3000/api/product/updateProduct/${product_id}`, requestData)
        .then(result => {
            const msg = result.data.success;
            sweetalert.fire('Success!', `${msg}`, 'success');
            navigate('/dashboard')
        })
        .catch(err => {
            const errorMsg = err.request.statusText;
            setError(errorMsg);
            console.log(error);
        });
    } catch (validationError) {
        const fieldErrors = {};
        validationError.inner.forEach(err => {
        fieldErrors[err.path] = err.message;
        });
        setErrors(fieldErrors);
    }
};

const fetchData = async () => {
try {
    setLoading(true)
    const response = await axios.get(`http://localhost:3000/api/product/getProduct/${product_id}`);
    // console.log(response.data);
    setOldImg(response.data.data.images)
    setFormData({
        name: response.data.data.name,
        oldImages: response.data.data.images,
        images: [],
        description: response.data.data.description,
        price: response.data.data.price,
        phone: response.data.data.phone,
        city_id: response.data.data.city_id._id,
        category_id: response.data.data.category_id._id,
        subCategory_id: response.data.data.subCategory_id._id,
        user_id: user_id,
    });    
    setLoading(false)
} catch (error) {
    console.error(error);
}
};

const fetchCategories = async () => {
try {
    const categories = await axios.get('http://localhost:3000/api/category/getCategories');
    setCategory(categories.data.data);

    // console.log(addFormData.category_id );
    if (formData.category_id && formData.category_id !== 'select your category') {
        const subCategoryResponse = await axios.get(`http://localhost:3000/api/subCategory/getSubCategories/${formData.category_id}`);
        setSubCategory(subCategoryResponse.data.data);
    }
    else {
        setSubCategory([]);
    }

    const cities = await axios.get('http://localhost:3000/api/city/getCities');
    setCity(cities.data.data);
} catch (error) {
    console.error(error);
}
};

useEffect(() => {
    fetchData();
}, []); 

useEffect(() => {
    fetchCategories();
}, [formData]);

const goBack = (e) => {
    e.preventDefault();
    window.history.back();
  };

return (
<>
    <NavBar/>
    {loading ? (
    <div className="sm:ml-64 pt-10">
        {/* Loading indicator */}
        <div className="flex justify-center items-center mt-80 sm:me-60">
        <div className="spinner-border text-yellow-500" role="status">
            {/* SVG spinner */}
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600" viewBox="0 0 100 101"  fill="none"  xmlns="http://www.w3.org/2000/svg">
            {/* SVG paths */}
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
        <div className="ml-2">Loading...</div>
        </div>
    </div>
    ) : (
        <>
        {/* edit modal */}
        <div className="justify-center items-center flex pt-20 overflow-x-hidden overflow-y-hidden inset-0 z-50 outline-none focus:outline-none">
        <div className="sm:w-full w-max my-6 mx-auto max-w-3xl">

        <form onSubmit={handleSubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-2">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Product Information</h2>
                    <p className=" text-sm text-gray-600">You need to add a good Informations for a good results.</p>
                    <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <label  className="block text-sm font-medium leading-6 text-gray-900">Product name</label>
                            <div className="">
                                <input
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                type="text" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                            </div>
                            {errors.name && <span className="text-red-600 text-xs">{errors.name}</span>}
                        </div>

                        <div className="sm:col-span-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900">Product price</label>
                            <div className="">
                                <input
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                type="number"  min="0"  id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                            </div>
                            <div className='sm:w-full w-60'>
                                {errors.price && <span className="text-red-600 text-xs">Price is Required</span>}
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label  className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                            <div className="">
                                <input 
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                type="tel" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                            </div>
                            {errors.phone && <span className="text-red-600 text-xs">{errors.phone}</span>}
                        </div>

                        {oldImg.length > 0 && (
                            <div className='text-sm font-semibold border ps-1 p-1 rounded-md bg-black text-white flex justify-center'>Old images</div>
                        )}
                        <div className='flex flex-wrap gap-2 justify-center sm:col-span-6'>
                            {oldImg.map((image, index) => (
                                <div key={index} className='w-[100px] h-[100px] rounded overflow-hidden relative bg-cover bg-center bg-no-repeat' style={{backgroundImage:`url(http://localhost:3000${image})`}}>
                                    <button className='absolute top-[5px] right-[5px] rounded-full bg-black text-white px-2 py-1' onClick={(e) => removeOldImage(e, index)}>x</button>
                                </div>
                            ))}
                        </div>

                        {formData.images.length > 0 && (
                            <div className='text-sm font-semibold border ps-1 p-1 rounded-md bg-black text-white flex justify-center'>New images</div>
                        )}
                        <div className='flex flex-wrap gap-2 justify-center sm:col-span-6'>
                            {formData.images.map((image, index) => (
                                <div key={index} className='w-[100px] h-[100px] rounded overflow-hidden relative bg-cover bg-center bg-no-repeat' style={{backgroundImage:`url(${image})`}}>
                                    <button className='absolute top-[5px] right-[5px] rounded-full bg-black text-white px-2 py-1' onClick={(e) => removeImage(e, index)}>x</button>
                                </div>
                            ))}
                        </div>

                        <div className="sm:col-span-6">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-90 h-24 border-2 border-gray-100 border-dashed rounded-lg cursor-pointer  dark:border-gray-500 dark:hover:border-gray-500 dark:hover:bg-gray-300">
                            <div className="flex flex-col items-center justify-center pt-3 pb-4">
                                <svg className="w-6 h-6 mb-2 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG (MAX. 800x400px)</p>
                            </div>
                            <input
                            onChange={handleImageChange}
                            id="dropzone-file" type="file" className="hidden" multiple/>
                        </label>
                        {errors.images && <span className="text-red-600 text-xs">Image is Required</span>}
                        {error && <span className="text-red-600 text-xs">Image is to large</span>}
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                            <div className="">
                                <select
                                value={formData.category_id}
                                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                autoComplete="country-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                <option>select your category</option>
                                {categories.map((category, index)=>(
                                    <option key={index} value={category._id}>{category.name}</option>
                                ))}
                                </select>
                            </div>
                            {errors.category_id && <span className="text-red-600 text-xs">Category is Required</span>}
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">SubCategory</label>
                            <div className="">
                                <select
                                value={formData.subCategory_id}
                                onChange={(e) => setFormData({ ...formData, subCategory_id: e.target.value })}
                                id="country" name="country" autoComplete="country-name" 
                                disabled={subCategories.length === 0}
                                className=" block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                <option>select your Subcategory</option>
                                {subCategories.map((SubCategory, index)=>(
                                    <option key={index} value={SubCategory._id}>{SubCategory.name}</option>
                                ))}
                                
                                </select>
                            </div>
                            {errors.subCategory_id && <span className="text-red-600 text-xs">SubCategory is Required</span>}
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                            <div className="">
                                <select
                                value={formData.city_id}
                                onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}
                                id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                <option >select your city</option>
                                {cities.map((city, index)=>(
                                    <option key={index} value={city._id}>{city.name}</option>
                                ))}
                                
                                </select>
                            </div>
                            {errors.city_id && <span className="text-red-600 text-xs">City is Required</span>}
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">About</label>
                            <div className="">
                                <textarea 
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                id="about" name="about" rows="2" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"></textarea>
                            </div>
                            {errors.description && <span className="text-red-600 text-xs">{errors.description}</span>}
                            <p className="mt-2 text-sm leading-6 text-gray-600">Write a few things about your product.</p>
                        </div>
                    </div>
                </div>   
            </div>

            <div className="mt-4 flex items-center justify-end gap-x-6">
                <button onClick={goBack} className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                <button type="submit" className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
            </div>

        </form>

        </div>
        </div>
      </>
    )}
  </>
);
}

export default EditProduct