import { useEffect, useState } from 'react';
import NavBar from '../Layouts/NavBar'
import SideBar from '../Layouts/SideBar'
import axios from 'axios';
import sweetalert from 'sweetalert2';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  return (
    <>
    <NavBar/>
    <SideBar/>
    <div>Dashboard</div>
    </>
  )
}

export default Dashboard