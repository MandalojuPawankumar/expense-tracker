import React from 'react';
import { Navigate, useLocation,useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
const RefreshHandler = ({setIsAuthenticated}) => {
    const location = useLocation();
      const Navigate = useNavigate();

      useEffect(()=>{
        if(localStorage.getItem('token')){
            setIsAuthenticated(true);
            if(location.pathname === '/' ||
                location.pathname ==='/login' ||
                location.pathname === '/signup'
            ){
                Navigate('/home',{replace:false});
            }
        }
      },[location,Navigate,setIsAuthenticated])
      return(
        null
      )
  return (
    null
  )
}

export default RefreshHandler
