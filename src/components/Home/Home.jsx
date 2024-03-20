import NavBar from '../Layouts/NavBar'
import Footer from '../Layouts/Footer'
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom';
import './home.css'
import { useEffect, useState } from 'react';
import axios from 'axios';



const Home = () => {
  const user = JSON.parse(Cookies.get('user') || null);
  const navigate = useNavigate();
  const [cities, setCity] = useState([]);
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

  useEffect(() => {
     fetchCities();
  }, [formData.city_id]);

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
      
      <div className="home flex items-cente justify-center">
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
          
        <div className='font-bold text-white sm:mt-[260px] mt-40 '>
        <button onClick={handleClick} className='sm:ms-[200px] ms-[140px]'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5" />
          </svg>
        </button>
        </div>

        </div>
      </div>

      <div id='nextSection' className=" block items-center justify-center mb-10">
            {user && (
              <div className="block bg-green-100 mt-10 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded" role="alert">
                <span className="">Welcome {user.name}, Your Role is {user.role}</span> 
              </div>
            )}
            {user && (
              <div className="block bg-green-100 mt-10 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded" role="alert">
                <span className="">Welcome {user.name}, Your Role is {user.role}</span> 
              </div>
            )}
            {user && (
              <div className="block bg-green-100 mt-10 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded" role="alert">
                <span className="">Welcome {user.name}, Your Role is {user.role}</span> 
              </div>
            )}
            {user && (
              <div className="block bg-green-100 mt-10 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded" role="alert">
                <span className="">Welcome {user.name}, Your Role is {user.role}</span> 
              </div>
            )}
            {user && (
              <div className="block bg-green-100 mt-10 border border-green-400 text-green-700 fw-bold px-4 py-3 rounded" role="alert">
                <span className="">Welcome {user.name}, Your Role is {user.role}</span> 
              </div>
            )}  
      </div>

      <div className=" block items-center justify-center mb-10">
        
        {/* back button */}
        <div className="container w-3/4 items-center rounded-lg mb-3 text-end">
          <button className=" items-center text-white ps-2 p-1 bg-black rounded-md">
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