import React, { useState, useEffect } from 'react';
import { DataGrid,  GridToolbar } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from '@mui/material/Container';
import axios from 'axios';
import Box from '@mui/material/Box';
import Select from 'react-select';
import InputGroup from 'react-bootstrap/InputGroup';
import { createFakeServer } from '@mui/x-data-grid-generator';
import SearchIcon from '@mui/icons-material/Search';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import moment from 'moment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ModalTitle } from 'react-bootstrap';
import { RateReview } from '@mui/icons-material';

 

const Inicio = () => {
  
 
  
  const [fechaini, setFechaIni]=useState("");
  const [fechafin, setFechaFin]=useState("");
  const [almacen, setAlmacen]= useState([]);
  const [linea, setLinea] = useState([]);
  const [offset,setOffset]= useState(0);
  const [finicio, setFinicio] = useState("");
  const [ffin, setFfin] = useState("");

  const [dashboard, setDashboard] = useState([]);
  
  
  
 
  
  const [lpralmid, setLpralmid] = useState("");
  const [lprnombre, setLprnombre] = useState("");
  const [prdclave, setPrdclave] = useState("");
  const [prdnombre, setPrdnombre] = useState("");
  const [proestatus, setProestatus] = useState([]);
  const [proheadcount, setProheadcount] = useState("");
  const [unidades, setUnidades] = useState("");
  const [procesadas, setProcesadas] = useState("");
  const [horas, setHoras] = useState("");
  const [avance, setAvance] = useState("");
  const [rate, setRate] = useState(0);

 
  const columns = [
    { field: "mprid", headerName: "ID"},
    { field: "lprnombre", headerName: "Alm" },
    { field: "prdclave", headerName: "Clave" },
    { field: "prdnombre", headerName: "Descripción" },
    { field: "proestatus", headerName: "Est"},
    { field: "proheadcount", headerName: "HC"},
    { field: "unidades", headerName: "Unidades"},
    { field: "procesado", headerName: "Procesadas"},
    { field: "avance", headerName: "Rate"  },
    { field: "rate", headerName: "Avance" },
  ];

  const options = [
    { value: 'A', label: 'A' },
    { value: 'T', label: 'T' },
  ]

  useEffect(() => {
   
    fetchDashboard();
   
    setOffset(0)
  },  []);

 

  const fetchDashboard = () => {
    console.log('ON')
    
    

   
    
    axios
      .get(`https://cia.argomex1.com/cia/prod/prod/dashboard1`)
      .then((data) => {
        setDashboard(data.data.items);
      
       
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  return (
    <div className="App">

<Container fixed>
        

        <Accordion defaultActiveKey="2">
        <Accordion.Item eventKey="0">
        <Accordion.Header>Busqueda Avanzada</Accordion.Header>
        <Accordion.Body>

        <Form>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Estatus</Form.Label>
          <Select 
              
              placeholder={"Seleccione una opción"}
                
              
              />    
          
        </Form.Group>
        
      </Row>

     

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>División</Form.Label>
          <Select 
             
             
              placeholder={"Seleccione una opción"}
              
                />  
          
        </Form.Group>
        
      </Row>


      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Clave</Form.Label>
          <Form.Control
          placeholder="Ingresa una clave"
          value={prdclave}
          onChange={(e)=>setPrdclave(e.target.value)}
          autoFocus
          
          
        />
        </Form.Group>
      </Row>

   

      <Row className="mb-3">
      <Form.Group as={Col} controlId="formGridEmail">
      <Button variant="primary" onClick={fetchDashboard}>
        Buscar
      </Button>

      </Form.Group>
      
      <Form.Group as={Col} controlId="formGridEmail">
      <Button variant="primary" >
        Limpiar
      </Button>

      </Form.Group>
      


      </Row>

      
    </Form>


        </Accordion.Body>
        </Accordion.Item>
        </Accordion>




 <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '100%',
          height: 500,
          
        },
      }}
    >

        <DataGrid
         initialState={{
          sorting: {
            sortModel: [{ field: 'prdid', sort: 'desc' }],
          },
        }}
        getRowHeight={() => 'auto'} 
          rows={dashboard}
          hideFooterPagination
          hideFooter
          hideFooterSelectedRowCount
          columns={columns}
          getRowId={row => row.lprnombre}
          
         
          components={{ Toolbar: GridToolbar }}
          localeText={{
            toolbarExport: 'Exportar',
            toolbarDensity:'Densidad',
            toolbarFilters:'Filtros',
            toolbarColumns:'Columnas'
          
          }}

        />
          </Box>

<Grid item xs={5} >

          <IconButton color="primary" aria-label="add to shopping cart" >
          <ArrowBackIcon />
          </IconButton>
        
          <IconButton color="primary" aria-label="add to shopping cart" >
          <ArrowForwardIcon />
          </IconButton>
          
        </Grid>

        

      </Container>
     
    </div>
  );
};

export default Inicio;
