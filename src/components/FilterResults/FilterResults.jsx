import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../Layouts/NavBar'
import UserSideBar from '../Layouts/UserSideBar'
import { formatDistanceToNow } from "date-fns";
import {DataContext} from '../Context/DataProvider';
import Cookies from 'js-cookie';

const FilterResults = () => {
  const location = useLocation();
  let searchData = location.state.searchData;

  const user = JSON.parse(Cookies.get('user') || null);
    const { favorites, addToFavorite, removeItem, loadFavorites} = useContext(DataContext);
    const navigate = useNavigate();
  
    const [loading, setLoading] = useState(false);
    const [products, setProduct] = useState([]);
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/product/productsFilter?name=${searchData.name}&category_id=${searchData.category_id}&city_id=${searchData.city_id}&subCategory_id=${searchData.subCategory_id}`);
        setProduct(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchData();
      loadFavorites();
    }, [searchData]);

    const productDetails = (id) => {
      navigate('/productDetails', { state: { productId: id }});
    }

  return (
    <>
    <NavBar/>
    <UserSideBar/>

        {/* single table */}
      {loading ? (
        <div className="sm:ml-64 pt-56">
          <div className="flex justify-center items-center mt-40 sm:me-40">
            <div className="spinner-border text-yellow-500" role="status">
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-600" viewBox="0 0 100 101"  fill="none"  xmlns="http://www.w3.org/2000/svg" >
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"/>
            </svg>
            </div>
            <div className="ml-2">Loading...</div>
          </div>
        </div>
      ) : (
        loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <p className="fs-3">There is No Products !</p>
          </div>
        ) : (
          <>
      
      {/* search bar */}
      <div className="sm:ml-64 sm:px-10 sm:pt-28 pt-5">
        <div className='flex items-center justify-center'>
            <p className='w-80 border rounded-lg text-center p-1 bg-white text-black shadow font-bold text-[13px]'>Search Result : {products.length} Products</p>
        </div>
      </div>

      {/* products cards */}
      <div className="sm:ml-64 sm:px-10">
          <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-12 gap-x-12 mt-5 mb-5">
              {/* card 1 */}
              {products.map((product, index) => (
              <div key={index} className="sm:w-60 w-80 bg-white shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl border">
                  <button onClick={() => productDetails(product._id)}>
                      <img src={`http://localhost:3000${product.images[0]}`} alt="Product" className=" border h-40 w-80 sm:w-60 object-cover rounded-t-lg" />
                  </button>
                      <div className="px-4 py-3 sm:w-60 w-80">
                          <div className='flex items-center justify-between'>
                            <p className="text-lg font-bold text-black truncate block capitalize">{product.name}</p>
                            <span className="text-gray-400 uppercase text-xs">{product.category_id.name}</span>
                          </div>

                          <div className="mt-3 items-center text-gray-400 ">

                            <div className='flex'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 mb-0.5 me-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                              </svg>
                              <p className="text-xs ">{product.city_id.name}</p>
                            </div>

                            <div className='flex mt-2'>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 me-1">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                              </svg>
                              <p className="text-xs">lested {formatDistanceToNow(new Date(product.updated_at), {
                                addSuffix: true,
                              })}</p>
                            </div>

                          </div>

                          <div className="flex items-center">
                              <p className="text-lg font-semibold text-black cursor-auto my-3">Price : </p>
                              <p className="text-sm text-gray-600 cursor-auto ml-2 mt-1">{product.price}{product.price < 100 ? '.00dh' : 'dh'}</p>
                              {user ?
                              <div className="ml-auto">
                              {favorites.some(favorite => favorite._id == product._id) ? (
                                <button onClick={() => removeItem(product)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                        <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                ) : (
                                  <button onClick={() => addToFavorite(product)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                    </svg>
                                    </button>
                                )}
                              </div>
                                : null}
                          </div>
                      </div>
              </div>
              ))}
          </section>
        
      </div>
      </>
      ))}

    </>
  )
}

export default FilterResults