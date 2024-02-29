// eslint-disable-next-line no-unused-vars
import React from 'react'
import NavBar from './Layouts/NavBar'
import SideBar from './Layouts/SideBar'
import Cookies from 'js-cookie';


const Home = () => {
  const user = JSON.parse(Cookies.get('user'));
  // console.log(Cookies.get());


  return (
    <>
      <NavBar/>
      <SideBar/>
    <div className="flex items-center mt-10 pt-10 justify-center">
    <div>
      <div>
          {user && (
            <div className="bg-green-100 mt-10 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded relative" role="alert">
              <span className="block sm:inline">Welcome {user.name}, Your Role is {user.role}</span> 
            </div>
          )}
        </div>
    </div>
    </div>
    </>
  )
}

export default Home