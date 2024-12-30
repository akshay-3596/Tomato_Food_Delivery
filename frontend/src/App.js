import React from 'react'
import { useState } from 'react'
import Navbar from './components/navbar/navbar.jsx'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/home/home.jsx'
import Cart from './pages/cart/cart.jsx'
import PlaceOrder from './pages/place-order/place-order.jsx'
import Footer from './components/footer/footer.jsx'
import LoginPopup from './components/login-popup/login-popup.jsx'
import Verify from './pages/verify/verify.jsx'
import MyOrders from './pages/myOrders/myOrders.jsx'
const App = () => {

  const[showLogin,setShowLogin]=useState(false)

  return (
    <>
      {
        showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>
      }
      <div className='app container-fluid'>
          <Navbar setShowLogin={setShowLogin } />
          <Routes>
            <Route path='/' element={ <Home/> }></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/order' element={<PlaceOrder/>}></Route>
            <Route path='/verify' element={<Verify/>}></Route>
            <Route path='/myorders' element={<MyOrders/>}></Route>
          </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
