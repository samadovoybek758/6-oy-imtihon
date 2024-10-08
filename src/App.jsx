import React, { useState,useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/home'
import Login from './pages/login';
import Header from './layouts/Header';
import Details from './pages/Details';

function App() {
  const [token,settoken] = useState(localStorage.getItem('token'))
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(function () {
    if (localStorage.getItem("token")) {
      settoken(localStorage.getItem("token"));
    } else {
      if (!location.pathname.includes("register")) {
        navigate("/login");
      }
    }
  }, []);

  function PrivateRoute({ isAuth, children }) {
    if (!isAuth) {
      navigate("/login");
    }

    return children;
  }

  
  return (
    <div>
      <Routes>
        <Route path='/' element={<PrivateRoute isAuth={!!token}>
          <Header><Home></Home></Header>
          </PrivateRoute>}></Route>
        <Route path='/product/:id' element={<PrivateRoute isAuth={!!token}>
          <Header><Details></Details></Header>
        </PrivateRoute>
        }></Route>

        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>

      </Routes>
    </div>
  )
}

export default App