import React,{useState} from 'react'
import banner from '../Assets/banner7.png'
import './Signup.css'
import {Link, useNavigate} from 'react-router-dom'
import {ToastContainer} from 'react-toastify';
import { handleError, handleSuccess } from '../../Utils';
// import axios from "axios";
const Signup = () => {

const[signupInfo,setSignupInfo] = useState({
  name:'',
  email:'',
  password:''
})
const  navigate = useNavigate();
const handleChange = (e)=>{
const {name,value} = e.target;
console.log(name, value);
const copySignupInfo = { ...signupInfo };
copySignupInfo[name] = value;
setSignupInfo(copySignupInfo);
}
 
const handleSignup = async (e)=>{
  e.preventDefault();
  const{ name, email , password } = signupInfo;
if(!name || !email || !password){
  return handleError('name,email and password are required')
}

try{
   const url = "http://localhost:8080/auth/signup";
   const response = await fetch(url,{
    method: "POST",
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(signupInfo)
   });
   const result = await response.json();
   const {success, message, error} = result;
   if(success){
    handleSuccess(message);
    setTimeout(()=>{
      navigate('/login')
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
      <form onSubmit={handleSignup} >
          <li>Sign up</li>
          Create your account
          <input onChange={handleChange} type='text' placeholder='Enter name' autoFocus name='name' value={signupInfo.name}/>
          <input onChange={handleChange} type='email' placeholder='Enter your email ' name='email' value={signupInfo.email}/>
          <input  onChange={handleChange} type='password' placeholder='Enter your password' name='password' value={signupInfo.password}/>
          <button type='submit'>Sign up</button>
          <p>Already have an account?<span><Link style={{color:'rgb(32, 107, 193',textDecoration:'none'}}to='/login'>Login</Link></span></p>
      </form>
      <ToastContainer/>
   </div>
  </div>
  )
}

export default Signup
