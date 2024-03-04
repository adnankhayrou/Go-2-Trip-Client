// eslint-disable-next-line no-unused-vars
import { React } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/gototrip.svg";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 z-40 w-full bg-white border-light shadow-2xl">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center sm:justify-start justify-center sm:ms-3">
          <div className=" flex items-center justify-start rtl:justify-end">
            <Link to="" className="flex md:me-24">
              <img src={logo} width={40} alt="Logo"/>
              <span className="self-center font-bold sm:text-2xl whitespace-nowrap dark:text-gray-500 pt-3">Go2Trip</span>
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
