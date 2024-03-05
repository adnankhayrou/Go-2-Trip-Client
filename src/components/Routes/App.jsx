import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from '../Home/Home'
import Register from '../Auth/Register'
import Login from '../Auth/Login'
import ForgotPassword from '../Auth/ForgotPassword'
import ResetPassword from '../Auth/ResetPassword'
import Cookies from 'js-cookie';
import VerifyEmail from '../Auth/VerifyEmail'
import Dashboard from '../Dashboard/Dashboard'

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