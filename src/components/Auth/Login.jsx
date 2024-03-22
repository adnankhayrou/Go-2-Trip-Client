/* eslint-disable react/no-unescaped-entities */
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import {DataContext} from '../Context/DataProvider';


const Login = () => {
  const { loadFavorites } = useContext(DataContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const location = useLocation();
  let message = location.state?.message;

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    let isValid = true;
    let validationErrors = {};

    if (formData.email === "" || formData.email === null) {
      isValid = false;
      validationErrors.email = "Email is Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)
    ) {
      isValid = false;
      validationErrors.email = "Email is Not Valid";
    }

    if (formData.password === "" || formData.password === null) {
      isValid = false;
      validationErrors.password = "Password is Required";
    } else if (formData.password.length < 8) {
      isValid = false;
      validationErrors.password = "Password length at least 8 char";
    }

    setErrors(validationErrors);
    setValid(isValid);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:3000/api/auth/login", formData)
        .then((result) => {
          const token = result.data.token;
          Cookies.set("jwtToken", token);
          const user = JSON.stringify( result.data.user);
          Cookies.set('user', user) ;
          loadFavorites();
          window.location.reload();
          navigate('/')
        })
        .catch((err) => {
          const error = err.response.data.error;
          setError(error);
        });
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="relative flex flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
          <div>
            {message && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{message}</span>
              </div>
            )}
          </div>
          <div>
            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                role="alert"
              >
                <span className="block sm:inline">{error}</span>
                <button
                  className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  onClick={() => setError(null)} >
                  <svg
                    className="fill-current h-6 w-6 text-red-500"
                    role="button"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <title>Close</title>
                    <path d="M14.348 5.652a.5.5 0 0 0-.697 0L10 9.303 5.348 4.652a.5.5 0 1 0-.697.697L9.303 10l-4.651 4.652a.5.5 0 0 0 .697.697L10 10.697l4.652 4.651a.5.5 0 0 0 .697-.697L10.697 10l4.651-4.652a.5.5 0 0 0 0-.697z" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center me-5">
            <img src={`http://localhost:3000/uploads/goToTrip1.png`} width={60} alt="Logo"/>
          </div>

          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            Sign In
          </h4>
          <form
            className="mt-6 mb-2 w-80 max-w-screen-lg sm:w-96"
            onSubmit={handleSubmit}
          >
            <div className="mb-4 flex flex-col gap-6">
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Email
                </label>
                {valid ? (
                  <></>
                ) : (
                  <span className="text-red-600 text-xs">{errors.email}</span>
                )}
              </div>
              <div className="relative h-11 w-full min-w-[200px]">
                <input
                  type="password"
                  className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-black focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  placeholder=" "
                  name="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-black peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-black peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-black peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Password
                </label>
                {valid ? (
                  <></>
                ) : (
                  <span className="text-red-600 text-xs">
                    {errors.password}
                  </span>
                )}
              </div>
            </div>

            <div className="inline-flex items-center">
              <p className="flex mt-3 items-center font-sans text-sm font-normal leading-normal text-gray-700 antialiased">
                <Link
                  className="font-medium text-gray transition-colors hover:text-red-700"
                  to="/forgotPassword"
                >
                  {" "}
                  Forgot Password?{" "}
                </Link>
              </p>
            </div>
            <button
              className="mt-6 block w-full select-none rounded-lg bg-black py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
            >
              Login
            </button>
            <p className="mt-4 block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
              Don't have an account?
              <Link
                className="ms-2 font-medium text-black transition-colors hover:text-red-700"
                to="/register"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
