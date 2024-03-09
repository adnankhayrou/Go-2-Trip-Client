import React from 'react'

const Statistics = () => {
  return (
    <div className="sm:ml-64 sm:pt-10">

    <div className="lg:flex sm:grid grid-cols-2  items-center mt-5 sm:pt-14 justify-center m-3">
        {/* Card 1 */}
        <div className="flex justify-center content-center border rounded-2xl shadow mb-3 me-3 bg-white">
        <div className="flex sm:grid w-[190px] rounded-2xl bg-white sm:p-2 p-1 aspect">
            <div className="h-12 pe-1 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
                className="h-8 w-8 fill-white stroke-yellow-600 mt-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
            </svg>
            </div>
            <div className="flex items-center">
            <div>
                <p className="me-3 font-bold text-base font-large text-gray-500">
                Your Products
                </p>
            </div>
            <h2 className="text-xl font-bold ">
                <span>6</span>
            </h2>
            </div>
        </div>
        </div>
        {/* Card 2 */}
        <div className="flex justify-center content-center border rounded-2xl shadow mb-3 me-3 bg-white">
        <div className="flex sm:grid w-[190px] rounded-2xl bg-white sm:p-2 p-1 aspect">
            <div className="h-12 pe-1 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="h-8 w-8 fill-white stroke-yellow-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
            </svg>
            </div>
            <div className="flex items-center">
            <div>
                <p className="me-3 font-bold text-base font-large text-gray-500">
                All Products
                </p>
            </div>
            <h2 className="text-xl font-bold">
                <span>6</span>
            </h2>
            </div>
        </div>
        </div>
        {/* Card 3 */}
        <div className="flex justify-center content-center border rounded-2xl shadow mb-3 me-3 bg-white">
        <div className="flex sm:grid w-[190px] rounded-2xl bg-white sm:p-2 p-1 aspect">
            <div className="h-12 pe-1 pt-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
            className="h-8 w-8 fill-white stroke-yellow-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
            </svg>
            </div>
            <div className="flex items-center">
            <div>
                <p className="me-3 font-bold text-base font-large text-gray-500">
                Categories
                </p>
            </div>
            <h2 className="text-xl font-bold">
                <span>6</span>
            </h2>
            </div>
        </div>
        </div>
        {/* Card 4 */}
        <div className="flex justify-center content-center border rounded-2xl shadow mb-3 me-3 bg-white">
        <div className="flex sm:grid w-[190px] rounded-2xl bg-white sm:p-2 p-1 aspect">
            <div className="h-12 pe-1 pt-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
            className="h-8 w-8 fill-white stroke-yellow-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
            </svg>
            </div>
            <div className="flex items-center">
            <div>
                <p className="me-3 font-bold text-base font-large text-gray-500 ">
                Comments
                </p>
            </div>
            <h2 className="text-xl font-bold">
                <span>6</span>
            </h2>
            </div>
        </div>
        </div>
         {/* Card 5 */}
         <div className="flex justify-center content-center border rounded-2xl shadow mb-3 me-3 bg-white">
        <div className="flex sm:grid w-[190px] rounded-2xl bg-white sm:p-2 p-1 aspect">
            <div className="h-12 pe-1 pt-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"              
                className="h-8 w-8 fill-white stroke-yellow-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
            </svg>
            </div>
            <div className="flex items-center">
            <div>
                <p className="me-3 font-bold text-base font-large text-gray-500">
                All users
                </p>
            </div>
            <h2 className="text-xl font-bold">
                <span>6</span>
            </h2>
            </div>
        </div>
        </div>
        {/* Card 6 */}
        <div className="flex justify-center content-center border rounded-2xl shadow mb-3 me-3 bg-white">
        <div className="flex sm:grid w-[190px] rounded-2xl bg-white sm:p-2 p-1 aspect">
            <div className="h-12 pe-1 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                className="h-8 w-8 fill-white stroke-yellow-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                </svg>
            </div>
            <div className="flex items-center">
            <div>
                <p className="me-3 font-bold text-base font-large text-gray-500">
                Cities
                </p>
            </div>
            <h2 className="text-xl font-bold">
                <span>6</span>
            </h2>
            </div>
        </div>
        </div>  
    </div>

    </div>
  )
}

export default Statistics