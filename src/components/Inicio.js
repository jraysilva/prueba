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
import clsx from 'clsx';
import { width } from '@mui/system';



 

const Inicio = () => {
  
 
  
  const [fechaini, setFechaIni]=useState("");
  const [fechafin, setFechaFin]=useState("");
  const [almacen, setAlmacen]= useState([]);
  const [linea, setLinea] = useState([]);
  const [offset,setOffset]= useState(0);
  const [finicio, setFinicio] = useState(moment().format('DD/MM/YYYY'));
  const [ffin, setFfin] = useState(moment().format('DD/MM/YYYY'));
  const [mprlprid, setMprlprid] = useState("");

  const [dashboard, setDashboard] = useState([]);
  const [fechaincial, setFechaInicial]=useState(moment().format('DD/MM/YYYY'));
  const [fechafinal, setFechaFinal]=useState(moment().format('DD/MM/YYYY'));
  
  
  
 
  
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
   
    { field: "lprnombre", headerName: "Linea de producción",minWidth: 200, align:'center', headerAlign:'center'  },
    { field: "prdclave", headerName: "Clave",minWidth: 150, align:'center', headerAlign:'center'   },
    { field: "prdnombre", headerName: "Descripción",minWidth: 300, headerAlign:'center'  },
    { field: "proestatus", headerName: "Est",minWidth: 50, width: 50, align:'center', headerAlign:'center'  },
    { field: "proheadcount", headerName: "HC",minWidth: 50, width: 50, align:'center', headerAlign:'center'  },
    { field: "unidades", headerName: "Unidades",minWidth: 50, width: 80, align:'center', headerAlign:'center'  },
    { field: "procesado", headerName: "Procesadas", align:'center'},
    { field: "avance", headerName: "Avance", type: 'number',  align:'center', headerAlign:'center'  ,cellClassName: (params) => {
      if (params.value == null) {
        return '';
      }

      return clsx('super-app', {
        empty: params.value == 0 ,
        diez: params.value > 0 & params.value<=20,
        veinte: params.value > 20 & params.value<=30,
        treinta: params.value >30 & params.value<=40 ,
        cuarenta: params.value >40 & params.value<=50 ,
        cincuenta: params.value >50 & params.value<=60,
        sesenta: params.value >60 & params.value<=70 ,
        setenta: params.value >70 & params.value<=80,
        ochenta: params.value >80 & params.value<=90,
        noventa: params.value >90 & params.value<=99,
        complete: params.value ==100 ,
      

      } );
    },},
    { field: "rate", headerName: "Rate", align:'center', headerAlign:'center'  },
  ];

  const options = [
    { value: 'A', label: 'Activo' },
    { value: 'T', label: 'Terminado' },
  ]

  useEffect(() => {
   
   
    fetchAlmacen();
    fetchLinea();

    
    
  
    
    fetchDashboard();
   
    setOffset(0)
  },  []);

 

  const fetchDashboard = () => {
    console.log("Holaa")
    console.log('ON')
    console.log('ON fecha inicial')
    console.log(fechaincial)
   

    console.log('ON fecha inicialasa')
    console.log(ffin)

    
    if (fechaini==""|| fechafin=="") {
      console.log("sin fechas")
     
      
     } else {
      setFinicio(moment(fechaini).format('DD/MM/YYYY'))
      setFfin(moment(fechafin).format('DD/MM/YYYY'))
    
      console.log(fechaini)
      console.log("buscando entre el rango de fechas")
     }
   
    axios
      .get(`https://cia.argomex1.com/cia/prod/prod/dashboard1?empresa=1&estatus=${proestatus}&fechaini=${finicio}&fechafin=${ffin}&almacen=${lprnombre}&linea=${mprlprid}&clave=${prdclave}&offset=${offset}&limit=100`)
      .then((data) => {
        setDashboard(data.data.items);
      
       
      })
      .catch((error) => {
        console.log(error);
      });
      
  };

  const fetchAlmacen = () => {
    
    axios
    .get(`https://cia.argomex1.com/cia/prod/prod/almacenes?empresa=1`)
    .then((data) => {
      setAlmacen(data.data.items);
      
    })
    .catch((error) => {
      console.log(error);
    });
  
  };

  const fetchLinea = () => {
    
    axios
    .get(`https://cia.argomex1.com/cia/prod/prod/lineaproduccion?empresa=1`)
    .then((data) => {
      setLinea(data.data.items);
      
    })
    .catch((error) => {
      console.log(error);
    });
  
  };


  const handleNext=()=>{

    setOffset(offset + 100)

    console.log('ON')
    fetchDashboard();


  }

  const handleBack=()=>{
    console.log("atras")

   

    if (offset<=0) {
      setOffset(0)
     
      
     } else {
      setOffset(offset - 100)
     }

    console.log('ON')
    fetchDashboard();
  }



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
           options = {options}
           defaultValue={0}
           onChange={(sup) => setProestatus(sup.value)}
           
           isDisabled={false}
           
           isClearable
              
              placeholder={"Seleccione una opción"}
                
              
              />    
          
        </Form.Group>
        
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Fecha Inicio</Form.Label>
          <Form.Control type="date" 
          placeholder="Enter email" 
         
          onChange={(e)=>setFechaIni(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Fecha Fin</Form.Label>
          <Form.Control type="date" 
          placeholder="Password" 
          
          onChange={(e)=>setFechaFin(e.target.value)}/>
          
        </Form.Group>
       
  
      </Row>

     

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Almacén</Form.Label>
          <Select 
            options = {almacen.map(sup => ({ label: sup.almnombre, value: sup.almid })) }
            defaultValue={0}
            onChange={(sup) => setLpralmid(sup.value)}
            isClearable
           
            placeholder={"Seleccione una opción"}
             
             
              
                />  
          
        </Form.Group>
        
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Linea de producción</Form.Label>
          <Select 
              options = { linea.map(sup => ({ label: sup.lprid, value: sup.lprid })) }
              defaultValue={0}
              onChange={(sup) => setMprlprid(sup.value)}
              isClearable
             
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
        height: 600,
        width: "100%",
        '& .super-app-theme--cell': {
         
          color: '#1a3e72',
          fontWeight: '600',
        },
        '& .super-app.empty': {
          backgroundColor: '#fff',
          color: '#00000',
          fontWeight: '600',
          border:2,
          borderWidth:1,
          borderRadius: 2,
          boxShadow: 2,
          opacity: 10
        },
        '& .super-app.diez': {
          background: "linear-gradient(to right, #e62e30, #fff, #fff, #fff, #fff, #fff, #fff,#fff, #fff, #fff);",
          color: '#00000',
          fontWeight: '600',
          border:2,
          borderWidth:1,
          borderRadius: 2,
          boxShadow: 2,
          opacity: 10
        },
        '& .super-app.veinte': {
          background: "linear-gradient(to right, #e62e30, #e62e30, #fff, #fff, #fff, #fff, #fff,#fff, #fff, #fff);",
          color: '#00000',
          fontWeight: '600',
          border:2,
          borderWidth:1,
          borderRadius: 2,
          boxShadow: 2,
        },
        '& .super-app.treinta': {
          background: "linear-gradient(to right, #e62e30, #e62e30, #e62e30, #fff, #fff, #fff, #fff,#fff, #fff, #fff);",
          color: '#00000',
          fontWeight: '600',
          border:2,
          borderWidth:1,
          borderRadius: 2,
          boxShadow: 2,
        },
        '& .super-app.cuarenta': {
          background: "linear-gradient(to right, #f08032, #f08032, #f08032, #f08032, #fff, #fff, #fff,#fff, #fff, #fff);",
          color: '#00000',
          fontWeight: '600',
          border:2,
          borderWidth:1,
          borderRadius: 2,
          boxShadow: 2,
        },
        '& .super-app.cincuenta': {
          background: "linear-gradient(to right, #f08032, #f08032, #f08032, #f08032, #f08032, #fff, #fff,#fff, #fff, #fff);",
          color: '#00000',
          fontWeight: '600',
          border:2,
          borderWidth:1,
          borderRadius: 2,
          boxShadow: 2,
        },
        '& .super-app.sesenta': {
          background: "linear-gradient(to right, #f08032, #f08032, #f08032, #f08032, #f08032, #f08032, #fff,#fff, #fff, #fff);",
          color: '#00000',
          fontWeight: '600',
          border:2,
          borderWidth:1,
          borderRadius: 2,
          boxShadow: 2,
        },
        '& .super-app.setenta': {
          background: "linear-gradient(to right, #ffd334, #ffd334, #ffd334, #ffd334, #ffd334, #ffd334, #ffd334,#fff, #fff, #fff);",
          color: '#00000',
          fontWeight: '600',
          border:2,
          borderWidth:1,
          borderRadius: 2,
          boxShadow: 2,
        },
        '& .super-app.ochenta': {
          background: "linear-gradient(to right, #ffd334, #ffd334, #ffd334, #ffd334, #ffd334, #ffd334, #ffd334,#ffd334, #fff, #fff);",
          color: '#00000',
          fontWeight: '600',
          border:2,
          borderWidth:1,
          borderRadius: 2,
          boxShadow: 2,
        },
        '& .super-app.noventa': {
          background: "linear-gradient(to right, #81bf2c, #81bf2c, #81bf2c, #81bf2c, #81bf2c, #81bf2c, #81bf2c,#81bf2c, #81bf2c, #fff);",
          color: '#fff',
          fontWeight: '600',
          border:2,
          borderWidth:1,
          borderRadius: 2,
          boxShadow: 2,
        },
        '& .super-app.complete': {
          backgroundColor: '#01ad23',
          color: '#fff',
          fontWeight: '600',
          border:2,
          borderWidth:1,
          borderRadius: 2,
          boxShadow: 2,
          
    
          
    
          
        }
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
          getRowId={row => row.id_reg}
      
         
          components={{ Toolbar: GridToolbar }}
          localeText={{
            toolbarExport: 'Exportar',
            toolbarDensity:'Densidad',
            toolbarFilters:'Filtros',
            toolbarColumns:'Columnas'
          
          }}

        />
          </Box>

          <Grid item xs={6}>

<IconButton color="primary" aria-label="add to shopping cart" onClick={handleBack}>
<ArrowBackIcon />
</IconButton>

<IconButton color="primary" aria-label="add to shopping cart" onClick={handleNext}>
<ArrowForwardIcon />
</IconButton>

</Grid>

        

      </Container>
     
    </div>
  );
};

export default Inicio;
