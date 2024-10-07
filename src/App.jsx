import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/home'
import Login from './pages/login';
import Header from './layouts/Header';
import Details from './pages/Details';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Header><Home></Home></Header>}></Route>
        <Route path='/product/:id' element={<Header><Details></Details></Header>}></Route>

        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>

      </Routes>
    </div>
  )
}

export default App