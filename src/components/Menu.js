import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';





const Menu = ({setToken}) => {

  const logOutHandler=()=>{
    localStorage.clear();
    document.location.href = '/'
  }
  return (
    <div>
        <Navbar bg="light" expand="lg">
      <Container>
      <a class="navbar-brand" href="/">
      <img src={process.env.PUBLIC_URL + '/logo.png'} alt="" width="150" height="70" class="d-inline-block align-text-top"/>
    
    </a>
        <Navbar.Brand href="/">INICIO</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          
            <Nav.Link href="#link">Procesos E/S</Nav.Link>
            <Nav.Link href="productos">PRODUCTOS</Nav.Link>


          
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
      <Button variant="link" onClick={()=>logOutHandler()}>Cerrar Sesión
        </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>





    </div>
  )
}

export default Menu