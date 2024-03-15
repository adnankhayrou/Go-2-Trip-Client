import Cookies from "js-cookie";
import React, { useState } from "react";
import axios from 'axios';
const DataContext = React.createContext();

function DataProvider({ children }) {
    const user = JSON.parse(Cookies.get('user') || null);
    
    const [favorites, setFavorites] = useState([]);
    const [statistics, setStatistics] = useState({ 
      products: [], 
      categories: [], 
      cities: [], 
      users: [], 
      comments: [] 
    });
    const [adminProducts, setAdminProducts] = useState([]);

    const fetchData = async () => { 
        try {
          const response = await axios.get(`http://localhost:3000/api/statistics/AllStatistics`);
          const adminProduct = await axios.get(`http://localhost:3000/api/product/userProducts/${user?._id}`);
          setStatistics(response.data)
          setAdminProducts(adminProduct.data.data)
        } catch (error) {
          console.error(error);
        }
    };
  
    const addToFavorite = (item) => {
      console.log('in the add function',item);
      try {
          let oldData = JSON.parse(localStorage.getItem(`favorites + ${user._id}`)) || [];
          const isDuplicate = oldData.some(existingItem => existingItem && existingItem._id === item._id);
          if (!isDuplicate) {
              oldData.push(item);
              localStorage.setItem(`favorites + ${user._id}`, JSON.stringify(oldData));
              console.log('Data added to favorites successfully.');
          } else {
              console.log('This item is already in favorites.');
          }
      } catch (error) {
          console.error('Error adding to favorites:', error);
      }
      loadFavorites();
    };
  
  const removeItem = (itemToRemove) => {
    try {
        let oldData = JSON.parse(localStorage.getItem(`favorites + ${user._id}`)) || [];
        const newData = oldData.filter(existingItem => existingItem._id !== itemToRemove._id);
        localStorage.setItem(`favorites + ${user._id}`, JSON.stringify(newData));
        console.log('Item removed from favorites successfully.');
    } catch (error) {
        console.error('Error removing from favorites:', error);
    }
    loadFavorites();
  };
  
  
    const loadFavorites = () => {
      try {
          const storedFavorites = localStorage.getItem(`favorites + ${user._id}`);
          if (storedFavorites) {
              setFavorites(JSON.parse(storedFavorites));
          }
      } catch (error) {
          console.error('Error loading favorites:', error);
      }
    };
  
    return (
      <DataContext.Provider value={{
        favorites,
        addToFavorite,
        removeItem,
        loadFavorites,
        fetchData,
        adminProducts,
        statistics
      }}>
        {children}
      </DataContext.Provider>
    );
  }

export { DataProvider, DataContext} ;