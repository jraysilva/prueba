import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
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
      <BrowserRouter>
      <Routes>
          <Route exact path="/productos" element={token ?  <Productos  />  : <Login token={token} setToken={setToken}/>}/>
          <Route exact path="/" element={token ?  <Inicio />  : <Login token={token} setToken={setToken}/>}/>
      </Routes>
      </BrowserRouter>
      <Footer />
    </div>

  );
}

export default App;
