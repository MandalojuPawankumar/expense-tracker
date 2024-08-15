import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Router, Routes } from 'react-router-dom';
import Signup from './Components/Signup/Signup';
import Login from './Components/Login/Login';
import Home from './Components/Home/Home';
import { useState } from 'react';
import RefreshHandler from './Components/RefreshHandler';

function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to='/login'/>
  }
  return (
    <div>
     <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
      <Route path='/' element={<Navigate to="/login"/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    
    </div>
  );
}

export default App;
