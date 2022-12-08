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
  <img src={process.env.PUBLIC_URL + '/logo.png'}  /> 
</div>



    </div>

  )
}

export default Inicio