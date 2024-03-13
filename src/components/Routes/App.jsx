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
import AllItems from '../Items/AllItems'

const AdminMiddleware = ({ children }) => {
  const isAuthenticated = !!Cookies.get('jwtToken'); 
  const user = JSON.parse(Cookies.get('user') || null);

  if (isAuthenticated && user.role == "Admin") {
    return children;
  } 

  return (
    <Navigate to="/login" />
  )
}

const LogoutMiddleware = ({ children }) => {
  const isAuthenticated = !!Cookies.get('jwtToken'); 

  if (isAuthenticated) {
    return children;
  } 

  return (
    <Navigate to="/login" />
  )
}

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

        <Route path='/allProducts' element={<AdminMiddleware> <AllProducts /> </AdminMiddleware>} />
        <Route path='/category' element={<AdminMiddleware> <Categories /> </AdminMiddleware>} />
        <Route path='/allComments' element={<AdminMiddleware> <AllComments /> </AdminMiddleware>} />
        <Route path='/allUsers' element={<AdminMiddleware> <AllUsers /> </AdminMiddleware>} />
        <Route path='/city' element={<AdminMiddleware> <Cities /> </AdminMiddleware>} />

        <Route path='/dashboard' element={<LogoutMiddleware> <Dashboard /> </LogoutMiddleware>} />
        <Route path='/addProduct' element={<LogoutMiddleware> <AddProduct /> </LogoutMiddleware>} />
        <Route path='/editProduct' element={<LogoutMiddleware> <EditProduct /> </LogoutMiddleware>} />

        <Route path='/register' element={<LoginMiddleware> <Register /> </LoginMiddleware>} />
        <Route path='/login' element={<LoginMiddleware> <Login /> </LoginMiddleware>} />
        
        <Route path='/allItems' element={ <AllItems /> }/>
        <Route path='/productDetails' element={ <ProductDetails /> }/>
        <Route path='/forgotPassword' element={ <ForgotPassword />} />
        <Route path='/resetPassword/:token' element={ <ResetPassword /> }/>
        <Route path='/verifyEmail/:token' element={ <VerifyEmail /> }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App