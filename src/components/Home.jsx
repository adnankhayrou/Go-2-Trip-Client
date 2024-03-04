// eslint-disable-next-line no-unused-vars
import React from 'react'
import NavBar from './Layouts/NavBar'
import Footer from './Layouts/Footer'
// import SideBar from './Layouts/SideBar'
import Cookies from 'js-cookie';
import homeCss from './home.css'



const Home = () => {
  const user = JSON.parse(Cookies.get('user'));

  const handleClick = () => {
    const nextSection = document.querySelector('#nextSection');
    if (nextSection) {
      const targetY = nextSection.getBoundingClientRect().top + window.scrollY;
      const initialY = window.scrollY;
      const diff = targetY - initialY;
      const duration = 700; 
      let start;
  
      const step = (timestamp) => {
        if (!start) start = timestamp;
        const timeElapsed = timestamp - start;
        const percentage = Math.min(timeElapsed / duration, 1);
        window.scrollTo(0, initialY + diff * percentage);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(step);
        }
      };
  
      requestAnimationFrame(step);
    }
  };


  return (
    <>
      <NavBar/>
      {/* <SideBar/> */}

      {/* <div>
      <form className="max-w-md mx-auto">
        <div className="flex">
            <label htmlFor="location-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
            <button id="dropdown-button-2" data-dropdown-toggle="dropdown-search-city" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">
                <svg aria-hidden="true" className="h-3 me-2" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="0.5" width="14" height="12" rx="2" fill="white"/><mask id="mask0_12694_49953" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="15" height="12"><rect x="0.5" width="14" height="12" rx="2" fill="white"/></mask><g mask="url(#mask0_12694_49953)"><path fillRule="evenodd" clipRule="evenodd" d="M14.5 0H0.5V0.8H14.5V0ZM14.5 1.6H0.5V2.4H14.5V1.6ZM0.5 3.2H14.5V4H0.5V3.2ZM14.5 4.8H0.5V5.6H14.5V4.8ZM0.5 6.4H14.5V7.2H0.5V6.4ZM14.5 8H0.5V8.8H14.5V8ZM0.5 9.6H14.5V10.4H0.5V9.6ZM14.5 11.2H0.5V12H14.5V11.2Z" fill="#D02F44"/><rect x="0.5" width="6" height="5.6" fill="#46467F"/><g filter="url(#filter0_d_12694_49953)"><path fillRule="evenodd" clipRule="evenodd" d="M1.83317 1.20005C1.83317 1.42096 1.68393 1.60005 1.49984 1.60005C1.31574 1.60005 1.1665 1.42096 1.1665 1.20005C1.1665 0.979135 1.31574 0.800049 1.49984 0.800049C1.68393 0.800049 1.83317 0.979135 1.83317 1.20005ZM3.1665 1.20005C3.1665 1.42096 3.01727 1.60005 2.83317 1.60005C2.64908 1.60005 2.49984 1.42096 2.49984 1.20005C2.49984 0.979135 2.64908 0.800049 2.83317 0.800049C3.01727 0.800049 3.1665 0.979135 3.1665 1.20005ZM4.1665 1.60005C4.3506 1.60005 4.49984 1.42096 4.49984 1.20005C4.49984 0.979135 4.3506 0.800049 4.1665 0.800049C3.98241 0.800049 3.83317 0.979135 3.83317 1.20005C3.83317 1.42096 3.98241 1.60005 4.1665 1.60005ZM5.83317 1.20005C5.83317 1.42096 5.68393 1.60005 5.49984 1.60005C5.31574 1.60005 5.1665 1.42096 5.1665 1.20005C5.1665 0.979135 5.31574 0.800049 5.49984 0.800049C5.68393 0.800049 5.83317 0.979135 5.83317 1.20005Z" fill="white"/></g></g></svg>
                Location
            </button>
            <input id="location-search" className="block w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-s-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500 focus:border-red-500 dark:text-white dark:bg-gray-800 dark:border-gray-600" type="text" placeholder="Search for a location" />
        </div>
        <div className="mt-3">
            <label htmlFor="date" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Date</label>
            <input id="date" className="block w-full text-sm border-gray-300 rounded-s-lg shadow-sm focus:outline-none focus:ring-4 focus:ring-red-500 focus:border-red-500 dark:text-white dark:bg-gray-800 dark:border-gray-600" type="date" />
        </div>
        <button className="mt-4 w-full py-2.5 px-5 text-sm font-medium text-white bg-red-500 border border-transparent rounded-s-lg shadow-sm hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-100 dark:bg-red-700 dark:hover:bg-red-600 dark:focus:ring-red-700" type="submit">Search</button>
      </form> 
      </div> */}
      
      <div className="home flex items-center justify-center">
        <div className='font-bold text-white sm:mt-52 mt-28 me-6'>
        <button onClick={handleClick}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
          </svg>
        </button>
        </div>
      </div>

      <div id='nextSection' className=" block items-center justify-center mb-10">
            {user && (
              <div className="block bg-green-100 mt-10 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded" role="alert">
                <span className="">Welcome {user.name}, Your Role is {user.role}</span> 
              </div>
            )}
            {user && (
              <div className="block bg-green-100 mt-10 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded" role="alert">
                <span className="">Welcome {user.name}, Your Role is {user.role}</span> 
              </div>
            )}
            {user && (
              <div className="block bg-green-100 mt-10 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded" role="alert">
                <span className="">Welcome {user.name}, Your Role is {user.role}</span> 
              </div>
            )}
            {user && (
              <div className="block bg-green-100 mt-10 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded" role="alert">
                <span className="">Welcome {user.name}, Your Role is {user.role}</span> 
              </div>
            )}
            {user && (
              <div className="block bg-green-100 mt-10 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded" role="alert">
                <span className="">Welcome {user.name}, Your Role is {user.role}</span> 
              </div>
            )}  
      </div>


      <Footer/>
    </>
  )
}

export default Home