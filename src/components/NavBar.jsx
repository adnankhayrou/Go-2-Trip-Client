// eslint-disable-next-line no-unused-vars
import { React } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';


const NavBar = () => {
  const navigate = useNavigate()
  const logout = () => {
      axios.get('http://localhost:3000/api/auth/logout')
      .then(result => {
        Cookies.remove('jwtToken');
        Cookies.remove('user') ;
        const msg = result.data.success;
        console.log(msg);
        navigate('/login')
      })
      .catch(err => {
        const error = err.response ? err.response.data.error : 'An error occurred in logout';
        console.log(error);
      });
    }
  
  return (
    <nav className="flex items-center justify-between flex-wrap bg-pink-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
        </svg>
        <span className="font-semibold text-xl tracking-tight">
          AlloMedia
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg" >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link to="/"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4">
            Home
          </Link>
          <Link to="/forgotPassword"
            className="block me-2 mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
            Reset Password
          </Link>
          <button
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
            onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
