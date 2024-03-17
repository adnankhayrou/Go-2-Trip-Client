import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";


const UserSideBar = () => {
  const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [categories, setCategory] = useState([]);
    const [subCategories, setSubCategory] = useState([]);
    const [cities, setCity] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        city_id: '',
        category_id: '',
        subCategory_id: '',
    });

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const fetchCategories = async () => {
      try {
          const categories = await axios.get('http://localhost:3000/api/category/getCategories');
          setCategory(categories.data.data);
  
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
         fetchCategories();
      }, [formData.category_id]);

      const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/filterResults', { state: { searchData: formData }});
        setFormData({
          name: '',
          city_id: '',
          category_id: '',
          subCategory_id: '',
      });
      }
  return (
    <>
    {!sidebarOpen && (
        <button
          onClick={toggleSidebar}
          aria-controls="sidebar-multi-level-sidebar"
          type="button"
          className="inline-flex items-center pt-16 p-2 mt-8 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <aside
        id="sidebar-multi-level-sidebar"
        className={`m-4 fixed h-4/5 mt-28 left-0 r w-60  transition-transform ${
          sidebarOpen ? '' : 'hidden sm:block'
        }`}
        aria-label="Sidebar">
        
        <div className=" rounded-2xl h-full sm:px-3 overflow-y-auto bg-white dark:bg-white border-light shadow-2xl">
          <div className='text-end p-0'>
            <button
            onClick={toggleSidebar}
            aria-controls="sidebar-multi-level-sidebar"
            type="button"
            className="inline-flex items-center p-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
              </path>
            </svg>
          </button>
          </div>

          <div className='sm:ms-1 mx-1 sm:mx-0 flex items-center border mt-3 rounded-lg shadow-lg'>
            <div className='mt-3'>
            <form onSubmit={handleSubmit}>
                        <h2 className="text-center font-bold text-sm text-gray-900 mb-2">Search with filter</h2>
                        <div className=" grid grid-cols-1 gap-x-2 gap-y-4 grid-cols-6 ms-2">
                            <div className="col-span-6">
                                <div className="">
                                    <input
                                    placeholder="Search"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    type="text" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm " />
                                </div>
                            </div>
                            
                            <div className="col-span-6">
                                {/* <label htmlFor="city" className="block text-sm font-medium text-gray-900">Category</label> */}
                                <div className="">
                                    <select
                                    value={formData.category_id}
                                    onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                                      autoComplete="country-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm">
                                     <option value="">select your category</option>
                                    {categories.map((category, index)=>(
                                        <option key={index} value={category._id}>{category.name}</option>
                                    ))}
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-6">
                                {/* <label htmlFor="region" className="block text-sm font-medium text-gray-900">SubCategory</label> */}
                                <div className="">
                                    <select
                                    value={formData.subCategory_id}
                                    onChange={(e) => setFormData({ ...formData, subCategory_id: e.target.value })}
                                     id="country" name="country" autoComplete="country-name" 
                                     disabled={subCategories.length === 0}
                                     className=" block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm">
                                    <option value="">select your Subcategory</option>
                                    {subCategories.map((SubCategory, index)=>(
                                        <option key={index} value={SubCategory._id}>{SubCategory.name}</option>
                                    ))}
                                    
                                    </select>
                                </div>
                            </div>

                            <div className="col-span-6">
                                {/* <label className="block text-sm font-medium text-gray-900">City</label> */}
                                <div className="">
                                    <select
                                    value={formData.city_id}
                                    onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}
                                     id="country" name="country" autoComplete="country-name" className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset sm:max-w-xs sm:text-sm ">
                                    <option value="">select your city</option>
                                    {cities.map((city, index)=>(
                                        <option key={index} value={city._id}>{city.name}</option>
                                    ))}
                                    
                                    </select>
                                </div>
                        </div>
                    </div>   

                <div className=" flex items-center justify-center my-3">
                    <button disabled={Object.values(formData).every(value => value === '')} className={`rounded-md bg-black px-3 py-1 text-xs font-semibold text-white ${Object.values(formData).every(value => value === '') ? 'bg-gray-300' : 'bg-black'}`}>search</button>
                </div>

            </form>
            </div>
          </div>

          <ul className="ms-3 space-y-2 mt-5 font-medium items-center text-center">

            <li className=''>
            <Link to="/ " className="mb-5 flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
               <span className="ms-3 mt-1">Home</span>
            </Link>
            </li>

            <li>
            <Link to="/dashboard" className="mb-5 flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
                <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
              </svg>
              <span className="ms-3">Your Products</span>
            </Link>
            </li>


            <li>
            <Link to="/allItems" className="mb-5 flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
              <path fillRule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clipRule="evenodd" />
            </svg>
               <span className="ms-3">All items</span>
            </Link>
            </li>

            <li>
            <Link to="/savedProducts" className="mb-5 flex items-center p-2 text-gray-500 rounded-lg hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-black">
              <path fillRule="evenodd" d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V6a3 3 0 0 0-3-3H6Zm1.5 1.5a.75.75 0 0 0-.75.75V16.5a.75.75 0 0 0 1.085.67L12 15.089l4.165 2.083a.75.75 0 0 0 1.085-.671V5.25a.75.75 0 0 0-.75-.75h-9Z" clipRule="evenodd" />
            </svg>
               <span className="ms-3">Saved Products</span>
            </Link>
            </li>
            
          </ul>
        </div>
      </aside>
      </>
  )
}

export default UserSideBar