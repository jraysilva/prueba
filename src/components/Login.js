import React, { useState } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import  Row  from 'react-bootstrap/Row';
import Container  from 'react-bootstrap/Container';





const Login = ({token,setToken}) => {
const [userName, setUserName] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const loginHandler=()=>{
  setError("");
  setPassword("");
  setUserName("");
  
  axios({
    url:"http://ciacloud.dyndns.org:8088/cia/prod/prod/login",method:"POST",
    data:{
      "nomusuario":userName,
      "password":password
    },
  }).then(res=>{

    if (res.status === 200) {
      console.log(res.data.usuempid);
      console.log(res.data.token)
      setToken(res.data.usumail);
      localStorage.setItem("userToken", res.data.usumail);
  } else {
    setError(res.data.message);
}
   
  }).catch(err=>{
    console.log(err.response);
    setError(err.response.data.message)
    
  })
};

  return (
    <div >

   
<div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <div className="border border-3 border-primary"></div>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                <img className='center' src={process.env.PUBLIC_URL + '/logo.png'} width="300" height="100" /> 
            
                  <h2 className="fw-bold mb-2 text-uppercase ">Login</h2>
                  
                  <p className=" mb-5">Ingrese su usuario y contraseña</p>
                  <div className="mb-3">
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="text-center">
                          Usuario
                        </Form.Label>
                        <Form.Control type="text" placeholder="Enter email"  value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                      </Form.Group>

                      {error && <small>{error}</small>}
                      
                      <div className="d-grid">
                        <Button variant="primary"  onClick={loginHandler}>
                          Iniciar Sesión
                        </Button>
                      </div>
                    </Form>
                   
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
     
      

      



    </div>
  )
}

export default Login