import React, { useState } from 'react'
import NavBar from '../Layouts/NavBar'
import SideBar from '../Layouts/SideBar'
import axios from 'axios';
import sweetalert from 'sweetalert2';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddProduct = () => {
    const user = JSON.parse(Cookies.get('user') || null);
    const user_id = user._id
    const navigate = useNavigate();
   
    const [apartments, setApartment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [addFormData, setAddFormData] = useState({
        building_ID: '',
        apartment_number: '',
        resident_name: '',
        resident_phone: '',
        resident_cin: '',
        condition: '',
        user_id: user_id,
    });

    const schema = yup.object().shape({
        building_ID: yup.string().required('Building ID is Required'),
        apartment_number: yup.number().required('Apartment Number is Required'),
        resident_name: yup.string().required('Resident Name is Required'),
        resident_phone: yup.string().required('Resident Phone is Required'),
        resident_cin: yup.string().required('Resident CIN is Required'),
        condition: yup.string().required('Condition is Required'),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await schema.validate(addFormData, { abortEarly: false });
          const requestData = { ...addFormData };
    
          axios.post('http://localhost:3000/api/apartment/createApartment', requestData)
            .then(result => {
              const msg = result.data.success;
              setRefetch(!refetch);
              sweetalert.fire('Success!', `${msg}`, 'success');
              setShowModal(false)
              resetForm()
            })
            .catch(err => {
              const errorMsg = err.response ? err.response.data.error : 'An error occurred in add apartment';
              console.log(errorMsg);
              setError(errorMsg);
            });
        } catch (validationError) {
          const fieldErrors = {};
          validationError.inner.forEach(err => {
            fieldErrors[err.path] = err.message;
          });
          setErrors(fieldErrors);
        }
      };

  return (
    <>
    <NavBar/>
    {/* <SideBar/> */}
    
     {/* add modal */}
    <div className="justify-center items-center flex pt-20 overflow-x-hidden overflow-y-hidden inset-0 z-50 outline-none focus:outline-none">
        <div className=" sm:w-full w-max my-6 mx-auto max-w-3xl">
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-2">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                        <p className=" text-sm text-gray-600">Use a permanent address where you can receive mail.</p>

                        <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label  className="block text-sm font-medium leading-6 text-gray-900">Product name</label>
                                <div className="">
                                    <input type="text" name="name" id="first-name" autoComplete="given-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">Product price</label>
                                <div className="">
                                    <input type="number" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">Phone</label>
                                <div className="">
                                    <input type="tel" name="last-name" id="last-name" autoComplete="family-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6" />
                                </div>
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
                                <input id="dropzone-file" type="file" className="hidden" multiple/>
                            </label>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">Category</label>
                                <div className="">
                                    <select id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">SubCategory</label>
                                <div className="">
                                    <select id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">City</label>
                                <div className="">
                                    <select id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm sm:leading-6">
                                    <option>United States</option>
                                    <option>Canada</option>
                                    <option>Mexico</option>
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">About</label>
                                <div className="">
                                    <textarea id="about" name="about" rows="2" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"></textarea>
                                </div>
                                <p className="mt-2 text-sm leading-6 text-gray-600">Write a few.</p>
                            </div>
                        </div>
                    </div>   
                </div>

                <div className="mt-4 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                    <button type="submit" className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                </div>

            </form>
        </div>
    </div>
    </>
  )
}

export default AddProduct