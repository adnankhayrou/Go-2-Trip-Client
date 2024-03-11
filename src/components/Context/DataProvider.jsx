import Cookies from "js-cookie";
import React, { useState } from "react";
import axios from 'axios';
const DataContext = React.createContext();

function DataProvider({ children }) {
    const user = JSON.parse(Cookies.get('user') || null);
    // const user_id = user._id
    
    // const [favorites, setFavorites] = useState([]);
    const [statistics, setStatistics] = useState({ products: [], categories: [], cities: [], users: [], comments: [] });
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
  
    // const addToFavorite = async (item) => {
    //   console.log('in the add function',item);
    //   try {
    //     let oldData = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    //     const isDuplicate = oldData.some(existingItem => existingItem && existingItem.id === item.id);
    //     if (!isDuplicate) {
    //       oldData.push(item);
    //       await AsyncStorage.setItem('favorites', JSON.stringify(oldData));
    //       console.log('Data added to favorites successfully.');
    //       // Alert.alert('Success', 'Match added to favorites successfully.');
    //     } else {
    //       console.log('This item is already in favorites.');
    //       Alert.alert('Alert', 'Match is already Saved.');
    //     }
    //   } catch (error) {
    //     console.error('Error adding to favorites:', error);
    //   }
    //   loadFavorites();
    // };
  
    // const removeItem = async (itemToRemove) => {
    //   try {
    //       let oldData = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    //       const newData = oldData.filter(existingItem => existingItem.id !== itemToRemove.id);
    //       await AsyncStorage.setItem('favorites', JSON.stringify(newData));
    //       console.log('Match removed from favorites successfully.');
    //       // Alert.alert('Match removed from favorites successfully.');
    //   } catch (error) {
    //       console.error('Error removing from favorites:', error);
    //   }
    //   loadFavorites();
    // };
  
  
    // const loadFavorites = async () => {
    //   try {
    //       const storedFavorites = await AsyncStorage.getItem('favorites');
    //       if (storedFavorites) {
    //         setFavorites(JSON.parse(storedFavorites));
    //       }
    //     } catch (error) {
    //       console.error('Error loading favorites:', error);
    //     }
    // };
  
    return (
      <DataContext.Provider value={{
        // favorites,
        // addToFavorite,
        // removeItem,
        // loadFavorites,
        fetchData,
        adminProducts,
        statistics
      }}>
        {children}
      </DataContext.Provider>
    );
  }

export { DataProvider, DataContext} ;