import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom"
import Menu from './components/Menu';
import Footer from './components/Footer';
import Productos from './components/Productos';
import Login from './components/Login';
import Inicio from './components/Inicio'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {

  const [token, setToken]=useState(localStorage.getItem("userToken") ?? null);
  

  return (
    <div >
      <Menu setToken={setToken} />
     
      <HashRouter>
          <Route exact path="/productos" element={token ?  <Productos  />  : <Login token={token} setToken={setToken}/>}/>
          <Route exact path="/" element={token ?  <Inicio />  : <Login token={token} setToken={setToken}/>}/>
      </HashRouter>
    
      <Footer />
    </div>

  );
}

export default App;
