import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Home/Home'
import Register from '../Auth/Register'
import Login from '../Auth/Login'
import ForgotPassword from '../Auth/ForgotPassword'
import ResetPassword from '../Auth/ResetPassword'
import Cookies from 'js-cookie';
import VerifyEmail from '../Auth/VerifyEmail'
import Dashboard from '../Dashboard/Dashboard'
import AddProduct from '../Products/AddProduct'
import EditProduct from '../Products/EditProduct'
import Categories from '../Categories/Categories'
import Cities from '../Cities/Cities'
import AllComments from '../Comment/AllComments'
import AllUsers from '../Users/AllUsers'
import AllProducts from '../Products/AllProducts'
import ProductDetails from '../Products/ProductDetails'

// eslint-disable-next-line react/prop-types
const LogoutMiddleware = ({ children }) => {
  const isAuthenticated = !!Cookies.get('jwtToken'); 

  if (isAuthenticated) {
    return children;
  } 

  return (
    <Navigate to="/login" />
  )
}

// eslint-disable-next-line react/prop-types
const LoginMiddleware = ({ children }) => {
  const isAuthenticated = !!Cookies.get('jwtToken'); 

  if (!isAuthenticated) {
    return children;
  } 

  return (
    <Navigate to="/" />
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/dashboard' element={<LogoutMiddleware> <Dashboard /> </LogoutMiddleware>} />
        <Route path='/allProducts' element={<LogoutMiddleware> <AllProducts /> </LogoutMiddleware>} />
        <Route path='/addProduct' element={<LogoutMiddleware> <AddProduct /> </LogoutMiddleware>} />
        <Route path='/editProduct' element={<LogoutMiddleware> <EditProduct /> </LogoutMiddleware>} />
        <Route path='/productDetails' element={<LogoutMiddleware> <ProductDetails /> </LogoutMiddleware>} />
        <Route path='/category' element={<LogoutMiddleware> <Categories /> </LogoutMiddleware>} />
        <Route path='/allComments' element={<LogoutMiddleware> <AllComments /> </LogoutMiddleware>} />
        <Route path='/allUsers' element={<LogoutMiddleware> <AllUsers /> </LogoutMiddleware>} />
        <Route path='/city' element={<LogoutMiddleware> <Cities /> </LogoutMiddleware>} />
        <Route path='/register' element={<LoginMiddleware> <Register /> </LoginMiddleware>} />
        <Route path='/login' element={<LoginMiddleware> <Login /> </LoginMiddleware>} />
        <Route path='/forgotPassword' element={ <ForgotPassword />} />
        <Route path='/resetPassword/:token' element={ <ResetPassword /> }/>
        <Route path='/verifyEmail/:token' element={ <VerifyEmail /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App