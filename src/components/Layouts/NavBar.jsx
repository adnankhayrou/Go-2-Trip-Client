// eslint-disable-next-line no-unused-vars
import { React } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 z-40 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center sm:justify-start justify-center sm:ms-3">
          <div className=" flex items-center justify-start rtl:justify-end">
            <Link to="" className="flex md:me-24">
              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" class="h-8 me-3 text-pink-800">
                <image src="../assets/images/go to trip.svg" alt="" width="24" height="24"/>
              </svg> */}
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">SyndiPay</span>
            </Link>
          </div>
          <div className="flex items-center">
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
