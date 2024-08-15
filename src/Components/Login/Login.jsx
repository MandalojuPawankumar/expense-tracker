import React,{useState} from 'react'
import banner from '../Assets/banner7.png'
import './Login.css'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../../Utils';
// import axios from "axios";
const Login = () => {

const[loginInfo,setLoginInfo] = useState({
  email:'',
  password:''
})
const  navigate = useNavigate();
const handleChange = (e)=>{
const {name,value} = e.target;
console.log(name, value);
const copyLoginInfo = { ...loginInfo };
copyLoginInfo[name] = value;
setLoginInfo(copyLoginInfo);
}
 
const handleLogin = async (e)=>{
  e.preventDefault();
  const{ email , password } = loginInfo;
if( !email || !password){
  return handleError('email and password are required')
}

try{
   const url = "http://localhost:8080/auth/login";
   const response = await fetch(url,{
    method: "POST",
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(loginInfo)
   });
   const result = await response.json();
   const {success, message,jwtToken,name, error} = result;
   if(success){
    handleSuccess(message);
    localStorage.setItem('token',jwtToken);
    localStorage.setItem('loggedInUser',name);
    setTimeout(()=>{
      navigate('/home')
    },1000)
   }else if(error){
const details = error?.details[0].message;
handleError(details);
   }
   console.log(result);
}catch (err){
  handleError(err);
}
}
  return (
    <div className='signup-page'>
    <div className='content-left'>
      <img src={banner} alt=''/>
    </div>
   <div className='signup-container'>
      <form onSubmit={handleLogin} >
          <li>Login</li>
          Create your account
          <input onChange={handleChange} type='email' placeholder='Enter your email ' name='email' value={loginInfo.email}/>
          <input  onChange={handleChange} type='password' placeholder='Enter your password' name='password' value={loginInfo.password}/>
          <button type='submit'>Login</button>
          <p>Doesn't have an account?<span><Link style={{color:'rgb(32, 107, 193',textDecoration:'none'}}to='/signup'>Sign Up</Link></span></p>
      </form>
      <ToastContainer/>
   </div>
  </div>
  )
}

export default Login
