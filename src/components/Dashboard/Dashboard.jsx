import { useEffect, useState } from 'react';
import NavBar from '../Layouts/NavBar'
import SideBar from '../Layouts/SideBar'
import axios from 'axios';
import sweetalert from 'sweetalert2';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Statistics from './Statistics';
const Dashboard = () => {
  return (
    <>
    <NavBar/>
    <SideBar/>
    <Statistics/>
    
    </>
  )
}

export default Dashboard