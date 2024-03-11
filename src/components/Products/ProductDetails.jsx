import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../Layouts/NavBar'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';


const ProductDetails = () => {
  const location = useLocation();
  let product_id = location.state.productId;

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/product/getProduct/${product_id}`);
      console.log(response.data.data);
      setProduct(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [product_id]);


  const goToPreviousSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  return (
    <>
    <NavBar/>
    {loading ? (
    <div className="sm:ml-64 pt-10">
        {/* Loading indicator */}
        <div className="flex justify-center items-center mt-80 sm:me-60">
        <div className="spinner-border text-yellow-500" role="status">
            {/* SVG spinner */}
            <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600" viewBox="0 0 100 101"  fill="none"  xmlns="http://www.w3.org/2000/svg">
            {/* SVG paths */}
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
        </div>
        <div className="ml-2">Loading...</div>
        </div>
    </div>
    ) : (
    <div className="sm:mx-0 mx-5 sm:ml-64 pt-24">
        {/* back button */}
        <div className="container w-3/4 items-center rounded-lg mb-3 me-3 ">
          <Link to="/dashboard" className="text-decoration-none text-black">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          </Link>
        </div>

        <div className="container pt-3 w-3/3 sm:w-3/4 bg-white p-2 rounded-lg mb-5 shadow-2xl ">

            <div className="relative w-full container mb-6 p-2 rounded-xl bg-gray-200">
              {product.images && product.images.length > 0 && (
              <div className="relative h-56 overflow-hidden rounded-lg md:h-96 ">
                  {product.images.map((image, index) => (
                    <div  className={`image-slide ${index === currentImageIndex ? 'block' : 'hidden'}`}>
                      <img  src={`http://localhost:3000${image}`}
                            alt={`Slide ${index}`}
                            className="absolute inset-0 rounded w-max h-full object-cover sm:ms-[280px] ms-[47px]" />
                    </div>
                  ))}
              </div>
              )}
              <button onClick={goToPreviousSlide} className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                  </svg>
                  <span className="sr-only">Previous</span>
                </span>
              </button>
              <button onClick={goToNextSlide} type="button" className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <span className="sr-only">Next</span>
                </span>
              </button>
            </div>


                <div className="flex justify-between items-center mx-3 mt-5">
                  <p className="">
                      <b>{product.name}</b>
                  </p>

                  <div className='flex'>
                    <p className="font-bold">Price : </p>
                    <span className='text-gray-600'> {product.price}{product.price < 100 ? '.00dh' : 'dh'}</span>
                  </div>
                </div>

                <div className="mx-3 mt-5 flex items-center text-gray-400 ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mb-0.5 me-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <p className=""> agadir - </p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <p className="">listed date</p>
                </div>

                <div>
                  <hr className="my-3" />
                </div>

                <div className='sm:flex items-center my-5 justify-between'>
                  <div className="mx-3 flex items-center text-gray-600">
                    <p>Category</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <p>{product.category_id?.name}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <p>{product.subCategory_id?.name}</p>
                  </div>

                  <div>
                  <hr className="my-3" />
                  </div>

                  <div className='sm:flex text-center me-2 pt-2 sm:pt-0'>
                    <div className="col-12 col-md-6 col-lg-6 border rounded me-2">
                      <p className="text-light">
                        <i className="bi bi-phone"></i>
                      <a href={"tel:" + product.phone}>{product.phone}</a> 
                      </p>
                    </div>
                    <div className="col-12 col-md-6 col-lg-6 rounded border">
                      <p className="text-light">
                        <i className="bi bi-phone"></i>
                      <a href={"tel:" + product.phone}>{product.phone}</a> 
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <hr className="my-2" />
                </div>

                <div className="mx-3 mt-5 items-center text-black">
                  <p>Description</p>
                  <p className='text-gray-600'>{product.description}</p>
                </div> 

                <div>
                  <hr className="my-2" />
                </div>

            </div>
        </div>
        
    )}  
    </>
  );
}



export default ProductDetails