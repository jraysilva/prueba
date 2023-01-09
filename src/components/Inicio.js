import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Inicio = () => {
  return (
    <div className='center'>

    
<div class="card">
  <div class="card-body">
    <h5 class="card-title">BIENVENIDO</h5>
    
  </div>
  <img className='center' src={process.env.PUBLIC_URL + '/logo.png'} width="500" height="500" /> 
</div>



    </div>

  )
}

export default Inicio