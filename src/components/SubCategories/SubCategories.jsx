import { useEffect, useState } from 'react';
import axios from 'axios';
import sweetalert from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from "date-fns";
import * as yup from 'yup';

const SubCategories = ({ categories }) => {
    const navigate = useNavigate();
  
    const [loading, setLoading] = useState(false);
    const [subCategoryId, setSubCategoryId] = useState();
    const [editForm, setEditForm] = useState(false);
    const [subCategories, setSubCategory] = useState([]);
    const [refetch, setRefetch] = useState(true)
    const [errors, setErrors] = useState({});
    const [addFormData, setAddFormData] = useState({
        category_id:'',
        name: '',
    });

    const schema = yup.object().shape({
        category_id: yup.string().required('Category is Required'),
        name: yup.string().required('SubCategory is Required'),
    });

    async function handleEditSubmit(e, id) {
        e.preventDefault();
        try {
          await schema.validate(addFormData, { abortEarly: false });
          const requestData = { ...addFormData };
    
          axios.post(`http://localhost:3000/api/subCategory/updateSubCategory/${id}`, requestData)
            .then(result => {
              const msg = result.data.success;
              sweetalert.fire('Success!', `${msg}`, 'success');
              navigate('/category')
              setRefetch(!refetch);
              setAddFormData({
                category_id:'',
                name: ''
              });
              setErrors({});
              setEditForm(false)
            })
            .catch(err => {
              const errorMsg = err.response ? err.response.data.error : 'An error occurred in add apartment';
              console.log(errorMsg);
            });
        } catch (validationError) {
          const fieldErrors = {};
          validationError.inner.forEach(err => {
            fieldErrors[err.path] = err.message;
          });
          setErrors(fieldErrors);
        }
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await schema.validate(addFormData, { abortEarly: false });
          const requestData = { ...addFormData };
    
          axios.post('http://localhost:3000/api/subCategory/createSubCategory', requestData)
            .then(result => {
              const msg = result.data.success;
              sweetalert.fire('Success!', `${msg}`, 'success');
              navigate('/category')
              setRefetch(!refetch);
              setAddFormData({
                category_id: '',
                name: ''
              });
            })
            .catch(err => {
              const errorMsg = err.response ? err.response.data.error : 'An error occurred in add apartment';
              console.log(errorMsg);
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
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/subCategory/getAllSubCategories`);
        setSubCategory(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  
    const deleteSubCategory = async (id) => {
      const result = await new Promise((resolve) => {
        sweetalert.fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#7a014a',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          resolve(result);
        });
      });
    
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/api/subCategory/deleteSubCategory/${id}`);
          setRefetch(!refetch);
          sweetalert.fire('Deleted!', 'SubCategory has been deleted.', 'success');
        } catch (error) {
          console.log(error);
        }
      }
    };

    const editSubCategory = (item) => {
        setEditForm(true)
        setSubCategoryId(item._id)
        setAddFormData({
          category_id: item.category_id._id,
          name: item.name
        });
    }

    const cancelEditSubCategory = (e) => {
      e.preventDefault();
        setEditForm(false)
        setAddFormData({
          category_id: '',
          name: ''
        });
    }
  
    useEffect(() => {
      fetchData();
    }, [refetch, categories]);

  return (
    <>
    
     {/* edit form */}
     <div className={`sm:ml-64 sm:px-14 ps-3 my-2 sm:me-0 me-6 mt-8 ${editForm == false ? 'hidden' : ''}`}>
        <div className=" rounded-lg">
            <form onSubmit={(e) => handleEditSubmit(e, subCategoryId)}>
            <div className='flex justify-end sm:pe-32'>
                    {errors.category_id && <div className="text-red-600 text-xs">Category is Required</div>}
                    {errors.name && <div className="text-red-600 text-xs sm:ps-8 sm:pe-0 ps-10 pe-10">{errors.name}</div>}
                </div>

                <div className='flex justify-end'>
                    <div className="sm:col-span-2 sm:col-start-1 pe-2">
                        <div className="">
                            <select
                            value={addFormData.category_id}
                            onChange={(e) => setAddFormData({ ...addFormData, category_id: e.target.value })}
                                autoComplete="country-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                <option>select category</option>
                            {categories.map((category, index)=>(
                                <option key={index} value={category._id}>{category.name}</option>
                            ))}
                            </select>
                        </div>
                    </div>
                    <input 
                    value={addFormData.name}
                    onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                    type="text" className='p-1 me-2 rounded border border-gray'/>
                    <button className="shadow-2xl block text-white font-medium rounded-lg text-sm p-1.5 flex items-center text-center dark:bg-black " >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className=''>
                            Save
                        </span>
                    </button>
                    <button onClick={cancelEditSubCategory} className="block text-gray font-medium text-sm p-1.5 flex items-center text-center " >
                            Cancel
                    </button>
                </div>
            </form>
        </div>
      </div>
     
     {/* add form */}
      <div className={`sm:ml-64 sm:px-14 ps-3 my-2 sm:me-0 me-6 mt-8 ${editForm == false ? '' : 'hidden'}`}>
        <div className=" rounded-lg">
            <form onSubmit={handleSubmit}>
                
                <div className='flex justify-end sm:pe-32'>
                    {errors.category_id && <div className="text-red-600 text-xs">Category is Required</div>}
                    {errors.name && <div className="text-red-600 text-xs sm:ps-8 sm:pe-0 ps-10 pe-10">{errors.name}</div>}
                </div>

                <div className='flex justify-end'>
                    <div className="sm:col-span-2 sm:col-start-1 pe-2">
                        <div className="">
                            <select
                            value={addFormData.category_id}
                            onChange={(e) => setAddFormData({ ...addFormData, category_id: e.target.value })}
                                autoComplete="country-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                <option>select category</option>
                            {categories.map((category, index)=>(
                                <option key={index} value={category._id}>{category.name}</option>
                            ))}
                            </select>
                        </div>
                    </div>
                    
                    <input 
                    value={addFormData.name}
                    onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                    type="text" className='p-1 me-2 rounded border border-gray sm:w-max w-28'/>
                    <button className="shadow-2xl block text-white font-medium rounded-lg text-sm p-1.5 flex items-center text-center dark:bg-black " >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <span className=''>
                            New
                        </span>
                    </button>
                </div>
            </form>
        </div>
      </div>
    
        {/* single table */}
      {loading ? (
        <div className="sm:ml-64 pt-2">
      <div className="flex justify-center items-center mt-40 sm:me-40">
        <div className="spinner-border text-yellow-500" role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600" viewBox="0 0 100 101"  fill="none"  xmlns="http://www.w3.org/2000/svg" >
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"/>
        </svg>
        </div>
        <div className="ml-2">Loading...</div>
      </div>
      </div>
      ) : (
        loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <p className="fs-3">You Have No Categories For This Moment!</p>
          </div>
        ) : (
          <>
      
      {/* categories table */}
      <div className="sm:ml-64 sm:px-10 ps-3">
        <div className="overflow-x-auto rounded-lg mb-3 me-3 shadow-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-white dark:bg-white dark:text-gray-400">
              <tr>
                <th scope="col" className="text-black px-3 rounded-tl-lg rounded-tr-lg rounded-br-none rounded-bl-none py-3">
                  SubCategories
                </th>
              </tr>
              <tr>
            
                <th scope="col" className="ps-6 py-3">
                # {subCategories.length}
                </th>
                <th scope="col" className="px-6 py-3">
                name
                </th>

                <th scope="col" className="px-6 py-3">
                Category
                </th>
                <th scope="col" className="px-6 py-3">
                Created_at
                </th>

                <th scope="col" className="px-6 py-3">
                updated_at
                </th>
                
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {subCategories.map((subCategory, index) => (
              <tr key={index}  className="odd:bg-white odd:dark:bg-white-200 even:bg-white even:dark:bg-white-200">
               
                <td scope="row" className="ps-6 py-4 font-medium whitespace-nowrap">
                  {index+1}
                </td>
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {subCategory.name}
                </td>
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                  {subCategory.category_id.name}
                </td>
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                {formatDistanceToNow(new Date(subCategory.created_at), {
                    addSuffix: true,
                  })}
                </td>
                <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                {formatDistanceToNow(new Date(subCategory.updated_at), {
                    addSuffix: true,
                  })}
                </td>
                
                <td className="px-9 py-4">
                  <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  onClick={() => editSubCategory(subCategory)}
                  >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  </button>
                </td>
                <td className="px-9 py-4">
                  <button 
                  onClick={() => deleteSubCategory(subCategory._id)} 
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                  </button>
                </td>
              </tr>
               ))}
            </tbody>
          </table>
        </div>
      </div>
      </>
      ))}

    </>
  )
}

export default SubCategories