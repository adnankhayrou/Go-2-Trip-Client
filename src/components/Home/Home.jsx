import NavBar from '../Layouts/NavBar'
import Footer from '../Layouts/Footer'
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from "date-fns";
import { useContext, useEffect, useState } from 'react';
import {DataContext} from '../Context/DataProvider';
import axios from 'axios';
import './home.css'


const Home = () => {
    const user = JSON.parse(Cookies.get('user') || null);
    const { favorites, addToFavorite, removeItem, loadFavorites} = useContext(DataContext);
    const navigate = useNavigate();
    const [cities, setCity] = useState([]);
    const [products, setProduct] = useState([]);
    const [formData, setFormData] = useState({
      name: '',
      city_id: '',
      category_id: '',
      subCategory_id: '',
    });

    const fetchCities = async () => {
    try {
        const cities = await axios.get('http://localhost:3000/api/city/getCities');
        setCity(cities.data.data);
    } catch (error) {
        console.error(error);
    }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate('/filterResults', { state: { searchData: formData }});
      setFormData({
        name: '',
        city_id: '',
        category_id: '',
        subCategory_id: '',
    });
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/product/allProduct`);
        setProduct(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
      fetchData();
      fetchCities();
      loadFavorites();
    }, []);

    const productDetails = (product) => {
      navigate('/productDetails', { state: { product: product }});
    }

    const handleClick = () => {
      const nextSection = document.querySelector('#nextSection');
      if (nextSection) {
        const targetY = nextSection.getBoundingClientRect().top + window.scrollY;
        const initialY = window.scrollY;
        const diff = targetY - initialY;
        const duration = 700; 
        let start;
    
        const step = (timestamp) => {
          if (!start) start = timestamp;
          const timeElapsed = timestamp - start;
          const percentage = Math.min(timeElapsed / duration, 1);
          window.scrollTo(0, initialY + diff * percentage);
          
          if (timeElapsed < duration) {
            requestAnimationFrame(step);
          }
        };
    
        requestAnimationFrame(step);
      }
    };

  return (
    <>
      <NavBar/>
      
      <div className="home flex items-cente justify-center shadow-md">
          <div className='sm:mt-[130px] mt-[300px]'>

          <div className="">
          <form onSubmit={handleSubmit}>
            <div className=" flex items-center p-2 space-x-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
              <div className="flex bg-gray-100 p-2 sm:w-72 w-20 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="bg-gray-100 outline-none sm:ms-3 sm:w-60 w-16" type="text" placeholder="Search" />
              </div>
              <div className="py-2 px-3 rounded-lg text-gray-500 font-semibold cursor-pointer" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  <select
                  value={formData.city_id}
                  onChange={(e) => setFormData({ ...formData, city_id: e.target.value })}
                  >
                  <option value="">Select City</option>
                  {cities.map((city, index)=>(
                      <option key={index} value={city._id}>{city.name}</option>
                  ))}
                  
                  </select>
              </div>
              <div className={`${Object.values(formData).every(value => value === '') ? 'bg-gray-500' : 'bg-black'} py-2 px-4 text-white font-semibold rounded-lg hover:shadow-lg transition duration-3000 cursor-pointer`}>
              <button disabled={Object.values(formData).every(value => value === '')}>search</button>
              </div>
            </div>
            </form>
          </div>
          
          <div  className='font-bold text-white sm:mt-[260px] mt-40 '>
            <button onClick={handleClick} className='sm:ms-[200px] ms-[140px]'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id='nextSection' className=" block items-center justify-center mb-10">
            
              <div className=" my-10 text-center font-bold text-xl">
                <span className="">Latest Products</span> 
              </div>

              <section id="Projects" className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-12 gap-x-12 mt-5 mb-5">
              {/* card 1 */}
              {products.slice(0, 8).map((product, index) => (
              <div key={index} className="sm:w-60 w-80 bg-white shadow-md rounded-lg duration-500 hover:scale-105 hover:shadow-xl border">
                  <button onClick={() => productDetails(product)}>
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

      <div className=" block items-center justify-end mb-10">
        {/* back button */}
        <div className="container w-3/4 sm:ms-44 ms-16 items-center rounded-lg mb-3 text-end">
          <button className=" items-center text-black ">
            <Link to="/allItems" className='flex'>
              <p className='text-xs'>
                View More
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </button>
        </div>
      </div> 

      <Footer/>
    </>
  )
}

export default Home