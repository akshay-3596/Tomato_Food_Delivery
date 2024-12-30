import React, {  useContext, useState } from 'react'
import './login-popup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/storeContext'
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {


    const{url , setToken}= useContext(StoreContext)
    const [currState,setCurrstate]=useState('Login')
    const [data , setData] = useState({
      name:"",
      email:"",
      password:""
    })

    const onChangeHandler = (event)=>{
      const name = event.target.name;
      const value = event.target.value;
      setData(data=>({...data , [name]:value}))
    }

    const onLogin = async(event)=>{
      event.preventDefault()
      let newUrl = url;
      console.log(newUrl);
      if(currState==="Login"){
        newUrl+="/api/user/login"
      }
      else{
        newUrl+="/api/user/register"
      }
      console.log(newUrl);
      try {
        const response = await axios.post(newUrl,data);

        if (response.data.success) {
          setToken(response.data.taken);
          localStorage.setItem("token", response.data.token)
          setShowLogin(false)
        }
        else{
          alert(response.data.message )
        }
        } catch (error) {
          console.error("Errorr in onLogin request: ", error)
          alert("An error occurred. Please check your network or server connection.")
        }
    }

   

  return (
    <div className='login-popup'>
      <form onSubmit={onLogin} className='login-popup-container'>
        <div className="ligin-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=> setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {
                currState==='Login'?<></>: <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />
            }
            <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
            <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='password' required />
        </div>
        <button type='submit'>{currState==='Sign up'?"create Account":"Login"}</button>
        <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing I agree to the terms of use & privacy policy.</p>
        </div>
        {
            currState==='Login'
            ?<p>Create a New Account?<span onClick={()=>setCurrstate('Sign up')}>click here</span></p>
            :<p>Create a New Account?<span onClick={()=>setCurrstate('Login')}>click here</span></p>
        }
      </form>
    </div>
  )
}

export default LoginPopup