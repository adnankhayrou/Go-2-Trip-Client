import React, { useContext, useEffect } from 'react'
import { Link } from "react-router-dom";
import {DataContext} from '../Context/DataProvider';

const Statistics = () => {
  const { statistics, adminProducts, fetchData} = useContext(DataContext);

  useEffect(() => {
    fetchData();
  },[]);

  return (
    <div className="sm:ml-64 sm:pt-10">

    <div className="lg:flex sm:grid grid-cols-2  items-center mt-5 sm:pt-14 justify-center m-3">
        {/* Card 1 */}
        <Link to="/dashboard">
            <div className="flex justify-center content-center border rounded-2xl shadow mb-3 me-3 bg-white">
            <div className="flex sm:grid w-[190px] rounded-2xl bg-white sm:p-2 p-1 aspect">
                <div className="h-12 pe-1 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-black mt-1">
                <path d="M12.378 1.602a.75.75 0 0 0-.756 0L3 6.632l9 5.25 9-5.25-8.622-5.03ZM21.75 7.93l-9 5.25v9l8.628-5.032a.75.75 0 0 0 .372-.648V7.93ZM11.25 22.18v-9l-9-5.25v8.57a.75.75 0 0 0 .372.648l8.628 5.033Z" />
              </svg>
                </div>
                <div className="flex items-center">
                <div>
                    <p className="me-3 font-bold text-base font-large text-gray-500">
                    Your Products
                    </p>
                </div>
                <h2 className="text-xl font-bold ">
                    <span>{adminProducts.length}</span>
                </h2>
                </div>
            </div>
            </div>
        </Link>
        {/* Card 2 */}
        <Link to="/allProducts">
            <div className="flex justify-center content-center border rounded-2xl shadow mb-3 me-3 bg-white">
            <div className="flex sm:grid w-[190px] rounded-2xl bg-white sm:p-2 p-1 aspect">
                <div className="h-12 pe-1 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-black mt-1">
                <path fill-rule="evenodd" d="M1.5 7.125c0-1.036.84-1.875 1.875-1.875h6c1.036 0 1.875.84 1.875 1.875v3.75c0 1.036-.84 1.875-1.875 1.875h-6A1.875 1.875 0 0 1 1.5 10.875v-3.75Zm12 1.5c0-1.036.84-1.875 1.875-1.875h5.25c1.035 0 1.875.84 1.875 1.875v8.25c0 1.035-.84 1.875-1.875 1.875h-5.25a1.875 1.875 0 0 1-1.875-1.875v-8.25ZM3 16.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875v2.25c0 1.035-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 0 1 3 18.375v-2.25Z" clip-rule="evenodd" />
                </svg>
                </div>
                <div className="flex items-center">
                <div>
                    <p className="me-3 font-bold text-base font-large text-gray-500">
                    All Products
                    </p>
                </div>
                <h2 className="text-xl font-bold">
                    <span>{statistics.products.length}</span>
                </h2>
                </div>
            </div>
            </div>
        </Link>
        {/* Card 3 */}
        <Link to="/category">
            <div className="flex justify-center content-center border rounded-2xl shadow mb-3 me-3 bg-white">
            <div className="flex sm:grid w-[190px] rounded-2xl bg-white sm:p-2 p-1 aspect">
                <div className="h-12 pe-1 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-black mt-1">
                    <path d="M11.644 1.59a.75.75 0 0 1 .712 0l9.75 5.25a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.712 0l-9.75-5.25a.75.75 0 0 1 0-1.32l9.75-5.25Z" />
                    <path d="m3.265 10.602 7.668 4.129a2.25 2.25 0 0 0 2.134 0l7.668-4.13 1.37.739a.75.75 0 0 1 0 1.32l-9.75 5.25a.75.75 0 0 1-.71 0l-9.75-5.25a.75.75 0 0 1 0-1.32l1.37-.738Z" />
                    <path d="m10.933 19.231-7.668-4.13-1.37.739a.75.75 0 0 0 0 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 0 0 0-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 0 1-2.134-.001Z" />
                </svg>
                </div>
                <div className="flex items-center">
                <div>
                    <p className="me-3 font-bold text-base font-large text-gray-500">
                    Categories
                    </p>
                </div>
                <h2 className="text-xl font-bold">
                    <span>{statistics.categories.length}</span>
                </h2>
                </div>
            </div>
            </div>
        </Link>
        {/* Card 4 */}
        <Link to="/allComments">
            <div className="flex justify-center content-center border rounded-2xl shadow mb-3 me-3 bg-white">
            <div className="flex sm:grid w-[190px] rounded-2xl bg-white sm:p-2 p-1 aspect">
                <div className="h-12 pe-1 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-black mt-1">
                    <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clip-rule="evenodd" />
                </svg>
                </div>
                <div className="flex items-center">
                <div>
                    <p className="me-3 font-bold text-base font-large text-gray-500 ">
                    Comments
                    </p>
                </div>
                <h2 className="text-xl font-bold">
                    <span>{statistics.comments.length}</span>
                </h2>
                </div>
            </div>
            </div>
        </Link>
         {/* Card 5 */}
         <Link to="/allUsers">
            <div className="flex justify-center content-center border rounded-2xl shadow mb-3 me-3 bg-white">
            <div className="flex sm:grid w-[190px] rounded-2xl bg-white sm:p-2 p-1 aspect">
                <div className="h-12 pe-1 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-black mt-1">
                    <path fill-rule="evenodd" d="M8.25 6.75a3.75 3.75 0 1 1 7.5 0 3.75 3.75 0 0 1-7.5 0ZM15.75 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM2.25 9.75a3 3 0 1 1 6 0 3 3 0 0 1-6 0ZM6.31 15.117A6.745 6.745 0 0 1 12 12a6.745 6.745 0 0 1 6.709 7.498.75.75 0 0 1-.372.568A12.696 12.696 0 0 1 12 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 0 1-.372-.568 6.787 6.787 0 0 1 1.019-4.38Z" clip-rule="evenodd" />
                    <path d="M5.082 14.254a8.287 8.287 0 0 0-1.308 5.135 9.687 9.687 0 0 1-1.764-.44l-.115-.04a.563.563 0 0 1-.373-.487l-.01-.121a3.75 3.75 0 0 1 3.57-4.047ZM20.226 19.389a8.287 8.287 0 0 0-1.308-5.135 3.75 3.75 0 0 1 3.57 4.047l-.01.121a.563.563 0 0 1-.373.486l-.115.04c-.567.2-1.156.349-1.764.441Z" />
                </svg>
                </div>
                <div className="flex items-center">
                <div>
                    <p className="me-3 font-bold text-base font-large text-gray-500">
                    All users
                    </p>
                </div>
                <h2 className="text-xl font-bold">
                    <span>{statistics.users.length}</span>
                </h2>
                </div>
            </div>
            </div>
        </Link>
        {/* Card 6 */}
        <Link to="/city">
            <div className="flex justify-center content-center border rounded-2xl shadow mb-3 me-3 bg-white">
            <div className="flex sm:grid w-[190px] rounded-2xl bg-white sm:p-2 p-1 aspect">
                <div className="h-12 pe-1 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-black mt-1">
                    <path fill-rule="evenodd" d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd" />
                </svg>
                </div>
                <div className="flex items-center">
                <div>
                    <p className="me-3 font-bold text-base font-large text-gray-500">
                    Cities
                    </p>
                </div>
                <h2 className="text-xl font-bold">
                    <span>{statistics.cities.length}</span>
                </h2>
                </div>
            </div>
            </div>  
        </Link>
    </div>

    </div>
  )
}

export default Statistics