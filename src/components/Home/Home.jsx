// eslint-disable-next-line no-unused-vars
import React from 'react'
import NavBar from '../Layouts/NavBar'
import Footer from '../Layouts/Footer'
// import SideBar from '../Layouts/SideBar'
import Cookies from 'js-cookie';
import homeCss from './home.css'



const Home = () => {
  // const user = JSON.parse(Cookies.get('user'));

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
            {/* {user && (
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
            )}   */}
      </div>

      {/* <div id='nextSection' className=" block items-center justify-center mb-10">
           hhhhhhhhhhhhhhh
      </div> */}


      <Footer/>
    </>
  )
}

export default Home