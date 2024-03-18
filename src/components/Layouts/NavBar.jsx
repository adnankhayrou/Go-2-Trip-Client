import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import logo from "../../assets/images/gototrip.svg";
import {DataContext} from '../Context/DataProvider';


const NavBar = () => {
  const { favorites, loadFavorites } = useContext(DataContext);
  const user = JSON.parse(Cookies.get('user') || null);
  const [bgColor, setBgColor] = useState("rgba(255, 255, 255, 0.8)");

  useEffect(() => {
    loadFavorites();

    const handleScroll = () => {
      if (window.scrollY === 0) {
        setBgColor("rgba(255, 255, 255, 0.8)");
      } else {
        setBgColor("whitesmoke");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);

  return (
    <nav
      id="nav"
      className="fixed top-0 left-0 right-0 z-40 bg-white border-light shadow-lg rounded-2xl m-4"
      style={{
        background: bgColor,
      }}
    >
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between sm:ms-3">
          <div className="flex items-center justify-start rtl:justify-end">
            <Link to="/" className="flex md:me-24">
              <img src={logo} width={40} alt="Logo" />
              <span className="self-center font-bold sm:text-2xl whitespace-nowrap dark:text-gray-500 pt-3">
                Go2Trip
              </span>
            </Link>
          </div>

          {/* <Link to={user ? '/dashboard' : '/login'}>
            <span className="self-center font-bold sm:text-lg whitespace-nowrap dark:text-gray-500">{user ? 'Dashboard' : 'login'}</span>
          </Link> */}
          {user ?  
          <>
          <div className="flex items-center">

          <Link to="/savedProducts" className="me-6 mt-1">
          <span className="count absolute top-4 sm:top-[17px] sm:right-[68px] right-[60px] text-xs bg-red-500 rounded-full w-4 h-4 text-center text-white font-bold">{favorites.length}</span>
            <span className=" font-bold sm:text-lg whitespace-nowrap dark:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
              </svg>
            </span>
          </Link>

          <Link to="/dashboard">
            <span className="self-center font-bold sm:text-lg whitespace-nowrap dark:text-gray-500"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
            </span>
          </Link>
          </div>
          </>
          : 
          <Link to="/login">
            <span className="flex items-center self-center font-bold sm:text-lg whitespace-nowrap dark:text-gray-500">login
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M16.5 3.75a1.5 1.5 0 0 1 1.5 1.5v13.5a1.5 1.5 0 0 1-1.5 1.5h-6a1.5 1.5 0 0 1-1.5-1.5V15a.75.75 0 0 0-1.5 0v3.75a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V5.25a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3V9A.75.75 0 1 0 9 9V5.25a1.5 1.5 0 0 1 1.5-1.5h6Zm-5.03 4.72a.75.75 0 0 0 0 1.06l1.72 1.72H2.25a.75.75 0 0 0 0 1.5h10.94l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 0 0-1.06 0Z" clipRule="evenodd" />
            </svg>
            </span>
          </Link>}


        </div>
      </div>
    </nav>
  );
};

export default NavBar;
