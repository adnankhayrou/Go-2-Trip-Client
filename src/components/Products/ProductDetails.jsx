import React, { useEffect, useRef, useState } from 'react'
import NavBar from '../Layouts/NavBar'
import axios from 'axios';
import Comments from '../Comment/ProductComments';
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
      // console.log(response.data.data);
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>
          </Link>
        </div>

        <div className="container pt-3 w-3/3 sm:w-3/4 bg-white p-2 rounded-lg mb-5 shadow-2xl ">

            <div className="relative w-full container mb-6 p-2 rounded-xl bg-gray-200">
              {product.images && product.images.length > 0 && (
              <div className="relative h-56 overflow-hidden rounded-lg md:h-96 ">
                  {product.images.map((image, index) => (
                    <div key={index}  className={`image-slide ${index === currentImageIndex ? 'block' : 'hidden'}`}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mb-0.5 me-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                  <p className=""> agadir - </p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 mx-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  <p className="">listed date</p>
                </div>

                <div>
                  <hr className="my-3" />
                </div>

                <div className='sm:flex items-center my-5 justify-between'>
                  <div className="mx-3 flex items-center text-gray-600">
                    <p>Category</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <p>{product.category_id?.name}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                    <p>{product.subCategory_id?.name}</p>
                  </div>

                  <div>
                  <hr className="my-3" />
                  </div>

                  <div className='flex text-center justify-end pt-2 sm:pt-0'>
                    <div className="bg-black border rounded-md me-2 py-1 px-2">
                      <p className="text-white flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>
                      <a href={"tel:" + product.phone}>{product.phone}</a> 
                      </p>
                    </div>

                    <div className="bg-green-700 border rounded-md me-2 py-1 px-2">
                      <p className="text-white flex items-center">
                      <svg viewBox="0 0 56.693 56.693" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 56.693 56.693" className='h-6 w-6 me-1'>
                        <path d="M46.38 10.714C41.73 6.057 35.544 3.492 28.954 3.489c-13.579 0-24.63 11.05-24.636 24.633a24.589 24.589 0 0 0 3.289 12.316L4.112 53.204l13.06-3.426a24.614 24.614 0 0 0 11.772 2.999h.01c13.577 0 24.63-11.052 24.635-24.635.002-6.582-2.558-12.772-7.209-17.428zM28.954 48.616h-.009a20.445 20.445 0 0 1-10.421-2.854l-.748-.444-7.75 2.033 2.07-7.555-.488-.775a20.427 20.427 0 0 1-3.13-10.897c.004-11.29 9.19-20.474 20.484-20.474a20.336 20.336 0 0 1 14.476 6.005 20.352 20.352 0 0 1 5.991 14.485c-.004 11.29-9.19 20.476-20.475 20.476z" fillRule="evenodd" clipRule="evenodd" fill="#ffffff" className="fill-000000"/>
                        <path d="M40.185 33.281c-.615-.308-3.642-1.797-4.206-2.003-.564-.205-.975-.308-1.385.308-.41.617-1.59 2.003-1.949 2.414-.359.41-.718.462-1.334.154-.615-.308-2.599-.958-4.95-3.055-1.83-1.632-3.065-3.648-3.424-4.264-.36-.617-.038-.95.27-1.257.277-.276.615-.719.923-1.078.308-.36.41-.616.616-1.027.205-.41.102-.77-.052-1.078-.153-.308-1.384-3.338-1.897-4.57-.5-1.2-1.008-1.038-1.385-1.057-.359-.018-.77-.022-1.18-.022s-1.077.154-1.642.77c-.564.616-2.154 2.106-2.154 5.135 0 3.03 2.206 5.957 2.513 6.368.308.41 4.341 6.628 10.516 9.294a35.341 35.341 0 0 0 3.509 1.297c1.474.469 2.816.402 3.877.244 1.183-.177 3.642-1.49 4.155-2.927.513-1.438.513-2.67.359-2.927-.154-.257-.564-.41-1.18-.719z" fillRule="evenodd" clipRule="evenodd" fill="#ffffff" className="fill-000000"/>
                      </svg>
                      <a target="_blank" href={`https://wa.me/${product.telephone}?text=Hello ${product.user_id?.name}, is this item "${product.name}" still available on Go2Trip market?`}>
                        Contact Seller
                      </a>                      
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

                <Comments product={product}/>
                
            </div>
        </div>
        )}  
    </>
  );
}



export default ProductDetails