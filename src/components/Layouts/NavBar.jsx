import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import logo from "../../assets/images/gototrip.svg";

const NavBar = () => {
  const user = JSON.parse(Cookies.get('user') || null);
  const [bgColor, setBgColor] = useState("rgba(255, 255, 255, 0.8)");

  useEffect(() => {
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

          <Link to={user ? '/dashboard' : '/login'}>
            <span className="self-center font-bold sm:text-lg whitespace-nowrap dark:text-gray-500">{user ? 'Dashboard' : 'login'}</span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default NavBar;
