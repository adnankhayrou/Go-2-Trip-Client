// eslint-disable-next-line no-unused-vars
import React from 'react'
import NavBar from './Layouts/NavBar'
import SideBar from './Layouts/SideBar'
import Footer from './Layouts/Footer'
import Cookies from 'js-cookie';
import fullcover from "../assets/images/fullcover.svg";
import homeCss from './home.css'



const Home = () => {
  const user = JSON.parse(Cookies.get('user'));
  // console.log(Cookies.get());


  return (
    <>
      <NavBar/>
      {/* <SideBar/> */}
      <div className="home flex items-center justify-center">
            {user && (
              <div className="bg-green-100 mt-10 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded relative" role="alert">
                <span className="block sm:inline">Welcome {user.name}, Your Role is {user.role}</span> 
              </div>
            )}
      </div>

      <div className=" block items-center justify-center">
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