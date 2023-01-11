import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar,esES } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from '@mui/material/Container';
import axios from 'axios';
import Box from '@mui/material/Box';
import Select from 'react-select';
import { createFakeServer } from '@mui/x-data-grid-generator';
import SearchIcon from '@mui/icons-material/Search';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


const Productos = () => {
  
  const [show, setShow] = useState(false);
  const [deshabilitado, setDeshabilitado] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [divisiones, setDivisiones] = useState([]);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [offset,setOffset]= useState(0);

 

  
 

 



  const [prdid, setPrdid] = useState("");
  const [prdclave, setPrdclave] = useState("");
  const [prdups, setPrdups] = useState("");
  const [prdempid, setPrdempid] = useState("");
  const [prdnombre, setPrdnombre] = useState("");
  const [prdlinid, setPrdlinid] = useState("");
  const [prdualid, setPrdualid] = useState("");
  const [prdpzascaja, setPrdpzascaja] = useState("");
  const [prdpzaspallet, setPrdpzaspallet] = useState("");
  const [prdpeso, setPrdpeso] = useState("");
  const [prdvolumen, setPrdvolumen] = useState("");
  const [prdestatus, setPrdestatus]= useState("");
  const [error, setError] = useState("");
  const [titulo, setTitulo] = useState("");
  const [botonTitulo, setBotontitulo] = useState("");

  

  const columns = [
    { field: "prdid", headerName: "ID" },
    { field: "prdclave", headerName: "Clave"},
    { field: "prdups", headerName: "UPS" },
    { field: "prdnombre", headerName: "Nombre",minWidth: 300  },
    { field: "prdlinid", headerName: "División" },
    { field: "prdualid", headerName: "Unidad"},
    { field: "prdpzascaja", headerName: "Pza Caja"},
    { field: "prdpzaspallet", headerName: "Pza Pallet" },
    { field: "prdpeso", headerName: "Peso" },
    { field: "prdvolumen", headerName: "Volumen" },
    { field: "prdestatus", headerName: "Estatus"},
   
    
  ];

  const options = [
  
    { value: 'A', label: 'Activo' },
    { value: 'I', label: 'Inactivo' },
    
  ]

  

  
  const handleAgregarProducto = () => {
    

    axios({
      url:"https://cia.argomex1.com/cia/prod/prod/productos",method:"POST",
      data:
      {
        "items":    [
      {
        "prdid":prdid,
         "prdclave": prdclave,
         "prdups": prdups,
         "prdempid": 1,
         "prdnombre": prdnombre,
         "prdlinid": prdlinid,
         "prdualid": prdualid,
         "prdpzascaja": prdpzascaja,
         "prdpzaspallet": prdpzaspallet,
         "prdpeso": prdpeso,
         "prdvolumen": prdvolumen,
         "prdestatus": prdestatus
      }]},

    }).then(res=>{
      if (res.status === 200) {
       alert(res.data.message)
       window.location.reload();
      } else {
      setError(res.data.message);
      alert(res.data.message)
      }
    }).catch(err=>{
      console.log(err.response);
      setError(err.response.data.message)
      alert(err.response.data.message)
      
    })

  };

  const fetchCharacters = () => {
    console.log('ON')
    setPrdempid(localStorage.getItem("empresa"))
    axios
      .get(`https://cia.argomex1.com/cia/prod/prod/productos?empresa=1&clave=${prdclave}&estatus=${prdestatus}&division=${prdlinid}&limit=100`)
      .then((data) => {
        setCharacters(data.data.items);
       
      })
      .catch((error) => {
        console.log(error);
      });
      
  };
  const handleRowClick = (params) => {
    setDeshabilitado(true);
    setEliminar(false);
    fetchUnidades();
    fetchDivision();
    setTitulo("Editar/Eliminar producto");
    setBotontitulo("Guardar cambios");

   
    
    setPrdclave(`${params.row.prdclave}`);
    

    if (params.row.prdups === null) {
      setPrdups("");
      
     } else {
      setPrdups(`${params.row.prdups}`);
     }

    setPrdempid(`${params.row.prdempid}`);
    setPrdnombre(`${params.row.prdnombre}`);
    setPrdualid(`${params.row.prdualid}` );
    setPrdlinid( `${params.row.prdlinid}` );
    setPrdpzascaja(`${params.row.prdpzascaja}`);
    setPrdpzaspallet(`${params.row.prdpzaspallet}`);
    setPrdpeso(`${params.row.prdpeso}`);
    setPrdvolumen(`${params.row.prdvolumen}`);
    setPrdestatus(`${params.row.prdestatus}`);
   
    console.log(`${params.row.prdualid}`)
    setShow(true);

  };

  const handleClose = (params) => {

    setShow(false);
    setPrdclave("");
    setPrdups("");
    setPrdups("");
    setPrdempid("");
    setPrdnombre("");
    setPrdlinid("");
    setPrdualid("");
    setPrdpzascaja("");
    setPrdpzaspallet("");
    setPrdpeso("");
    setPrdvolumen("");
    setPrdestatus("A");
   
  };

  const fetchUnidades = () => {
    
    axios
    .get(`https://cia.argomex1.com/cia/prod/prod/unidades`)
    .then((data) => {
      setUnidades(data.data.items);
      
    })
    .catch((error) => {
      console.log(error);
    });
  
  };

  const fetchDivision = () => {
    
    axios
    .get(`https://cia.argomex1.com/cia/prod/prod/division?empresa=1`)
    .then((data) => {
      setDivisiones(data.data.items);
      
    })
    .catch((error) => {
      console.log(error);
    });
  
  };


  const handleShow = () => {
    fetchUnidades();
    fetchDivision();
    setDeshabilitado(false);
    setShow(true);
    setEliminar(true);
    setPrdestatus("A");
    setTitulo("Agregar nuevo producto");
    setBotontitulo("Guardar");
  

  
  };

  const fetchLimpiar=()=>{
    setPrdclave("");
    setPrdestatus("");

    console.log(prdestatus)
 
    
  }

  const handleNext=()=>{

    setOffset(offset + 100)
console.log(offset)
    console.log('ON')
    axios
      .get(`https://cia.argomex1.com/cia/prod/prod/productos?empresa=1&clave=${prdclave}&estatus=${prdestatus}&division=${prdlinid}&offset=${offset}&limit=100`)
      .then((data) => {
        setCharacters(data.data.items);
       
      })
      .catch((error) => {
        console.log(error);
      });


  }

  const handleBack=()=>{
    console.log("atras")
    

   

    if (offset<=0) {
      setOffset(0)
     
      
     } else {
      setOffset(offset - 100)
     }

    console.log('ON')
    console.log(offset)
    axios
      .get(`https://cia.argomex1.com/cia/prod/prod/productos?empresa=1&clave=${prdclave}&estatus=${prdestatus}&division=${prdlinid}&offset=${offset}&limit=100`)
      .then((data) => {
        setCharacters(data.data.items);
       
      })
      .catch((error) => {
        console.log(error);
      });
  }

  
  

  

  useEffect(() => {
   
    fetchCharacters();
    fetchDivision();
    setOffset(0)
  },  []);

  return (
    <div className="App">
      <Container fixed>
        <Grid item xs={6}>
          <IconButton color="primary" aria-label="add to shopping cart" onClick={handleShow}>
          <AddShoppingCartIcon />
          </IconButton>
          
        </Grid>

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
              
              isDisabled={false}
              
              isClearable
             
              placeholder={"Seleccione una opción"}
              onChange={(sup) => setPrdestatus(sup.value)}
             
              
              />    
          
        </Form.Group>
        
      </Row>

     

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>División</Form.Label>
          <Select 
              options = {divisiones.map(sup => ({ label: sup.linnombre, value: sup.linnombre })) }
              defaultValue={0}
              onChange={(sup) => setPrdlinid(sup.value)}
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
      <Button variant="primary" onClick={fetchCharacters}>
        Buscar
      </Button>

      </Form.Group>
      
      <Form.Group as={Col} controlId="formGridEmail">
      <Button variant="primary"  onClick={fetchLimpiar}>
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
          rows={characters}
          hideFooterPagination
          hideFooter
          hideFooterSelectedRowCount
          columns={columns}
          getRowId={row => row.prdid}
          onRowClick={handleRowClick}
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

          <IconButton color="primary" aria-label="add to shopping cart" onClick={handleBack}>
          <ArrowBackIcon />
          </IconButton>
        
          <IconButton color="primary" aria-label="add to shopping cart" onClick={handleNext}>
          <ArrowForwardIcon />
          </IconButton>
          
        </Grid>

        

      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="prdclave">
              <Form.Label>Clave</Form.Label>
              <Form.Control type="text" value={prdclave} onChange={(e)=>setPrdclave(e.target.value)} autoFocus  disabled={deshabilitado}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="prdups">
              <Form.Label>UPS</Form.Label>
              <Form.Control type="text" value={prdups} onChange={(e)=>setPrdups(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="prdnombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" value={prdnombre} onChange={(e)=>setPrdnombre(e.target.value)}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="prdualid">
              <Form.Label>Unidad</Form.Label>
              <Select 
              
              options = { unidades.map(sup => ({ label: sup.ualnombre, value: sup.ualnombre })) }
              defaultValue={{label: `${prdualid}`, value:`${prdualid}`}}
              onChange={(sup) => setPrdualid(sup.value)}
                />
             
            </Form.Group>

            <Form.Group className="mb-3" controlId="prdlinid">
              <Form.Label>División</Form.Label>
              <Select 
              options = { divisiones.map(sup => ({ label: sup.linnombre, value: sup.linnombre })) }
              defaultValue={{label: `${prdlinid}`, value:`${prdlinid}`}}
              onChange={(sup) => setPrdlinid(sup.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="prdpzascaja">
              <Form.Label>Pzas Caja</Form.Label>
              <Form.Control type="text" value={prdpzascaja} onChange={(e)=>setPrdpzascaja(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="prdpzaspallet">
              <Form.Label>Pzas Pallet</Form.Label>
              <Form.Control type="text" value={prdpzaspallet} onChange={(e)=>setPrdpzaspallet(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="prdpeso">
              <Form.Label>Peso</Form.Label>
              <Form.Control type="text" value={prdpeso} onChange={(e)=>setPrdpeso(e.target.value)} required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="prdvolumen">
              <Form.Label>Volumen</Form.Label>
              <Form.Control type="text" value={prdvolumen} onChange={(e)=>setPrdvolumen(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="prdestatus">
              <Form.Label>Estatus</Form.Label>
              <Select 
              options = {options}
              defaultValue={{label: `${prdestatus}`, value:`${prdestatus}`}}
              onChange={(sup) => setPrdestatus(sup.value)}
              isDisabled={eliminar}


              />
         
              
            </Form.Group>

          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
          <Button variant="primary" onClick={handleAgregarProducto}>{botonTitulo}</Button>
        </Modal.Footer>

      </Modal>

    </div>
  );
};

export default Productos;
