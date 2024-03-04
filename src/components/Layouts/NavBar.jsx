import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/gototrip.svg";

const NavBar = () => {
  const [bgColor, setBgColor] = useState("rgba(255, 255, 255, 0.9)");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setBgColor("rgba(255, 255, 255, 0.9)");
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
      className="fixed top-0 left-0 right-0 z-40 bg-white border-light shadow-2xl rounded-2xl m-4"
      style={{
        background: bgColor,
      }}
    >
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center sm:justify-start justify-center sm:ms-3">
          <div className="flex items-center justify-start rtl:justify-end">
            <Link to="" className="flex md:me-24">
              <img src={logo} width={40} alt="Logo" />
              <span className="self-center font-bold sm:text-2xl whitespace-nowrap dark:text-gray-500 pt-3">
                Go2Trip
              </span>
            </Link>
          </div>
          {/* <div className="flex items-center">
            <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">Go2Trip</span>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
