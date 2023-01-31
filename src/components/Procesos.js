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

 

const Procesos = () => {
  
  const [show, setShow] = useState(false);
  const [prdempid, setPrdempid] = useState(localStorage.getItem("empresa"));
  const [deshabilitado, setDeshabilitado] = useState(true);
  const [eliminar, setEliminar] = useState(false);
  const [procesos, setProcesos] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [tipo, setTipo] = useState([]);
  const [estatus, setEstatus] = useState([]);
  const [linea, setLinea] = useState([]);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  const [offset,setOffset]= useState(0);


  const SERVER_OPTIONS = {
    useCursorPagination: false,
  };

  const { initialState, useQuery } = createFakeServer({}, SERVER_OPTIONS);

  const queryOptions = React.useMemo(
    () => ({
      page,
      pageSize,
    }),
    [page, pageSize],
  );

  const { isLoading, data, pageInfo } = useQuery(queryOptions);

  const [rowCountState, setRowCountState] = React.useState(
    pageInfo?.totalRowCount || 0,
  );


  const [mprid, setMprid] = useState("");
  const [finicio, setFinicio] = useState("");
  const [ffin, setFfin] = useState("");
  const [prdclave, setPrdclave] = useState("");
  const [mprtipo, setMprtipo] = useState({value:"", label: ""});
  const [fechaini, setFechaIni]=useState("");
  const [fechafin, setFechaFin]=useState("");
  const [mprfecha, setMprfecha] = useState("");
  const [mprlprid, setMprlprid] = useState({value:"", label: ""});
  const [mprheadcount, setMprheadcount] = useState("");
  const [prdnombre, setPrdnombre] = useState("");
  const [mprcoms, setMprcoms] = useState("");
  const [mprcantidad, setMprcantidad] = useState("");
  const [mprusuid, setMprusuid] = useState(localStorage.getItem("usuario"));
  const [mprunidad, setMprunidad] = useState("");
  const [mprestatus, setMprestatus] = useState("");
  const [error, setError] = useState("");
  const [titulo, setTitulo] = useState("");
  const [botonTitulo, setBotontitulo] = useState("");




  const columns = [
    { field: "mprid", headerName: "ID"},
    { field: "mprtipo", headerName: "Tipo" },
    { field: "mprfecha", headerName: "Fecha/Hora" },
    { field: "mprlprid", headerName: "Linea" },
    { field: "mprheadcount", headerName: "HC"},
    { field: "prdclave", headerName: "Clave"},
    { field: "prdnombre", headerName: "Descripción",minWidth: 200 },
    { field: "mprcantidad", headerName: "Cantidad"},
    { field: "mprcoms", headerName: "Comentarios" ,minWidth: 200 },
  ];

  const options = [
    { value: 'E', label: 'Entrada' },
    { value: 'S', label: 'Salida' },
  ]




  const HandelChange = (obj) => {

    if(obj===null){
      setMprtipo({value:"", label: ""})
      console.log(mprtipo)
    }else{
      setMprtipo(obj);
      console.log(obj);

    }
   
  };


  const HandelChangeLinea = (obj) => {

    if(obj===null){
      setMprlprid({value:"", label: ""})
      console.log(mprlprid)
    }else{
      setMprlprid(obj);
      console.log(obj);

    }
   
  };

  const handleAgregarProceso = () => {
    console.log(prdclave)
    console.log(mprtipo)
    
    axios({
      url:"https://cia.argomex1.com/cia/prod/prod/movproceso",method:"POST",
      data:
      {
        "items":    [
      {
        "mprtipo": mprtipo,
        "mprlprid": mprlprid,
        "prdclave": prdclave,
        "prdempid": prdempid,
        "mprusuid": mprusuid,
        "mprcantidad": mprcantidad,
        "mprheadcount": mprheadcount,
        "mpreprid": mprestatus,
        "mprcoms": mprcoms
        
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

  const fetchProcesos = () => {
    console.log('ON')
    
    

    if (fechaini===""|| fechafin==="") {
      console.log("sin fechas")
     
      
     } else {
      setFinicio(moment(fechaini).format('DD/MM/YYYY'))
      setFfin(moment(fechafin).format('DD/MM/YYYY'))
      console.log("buscando entre el rango de fechas")
     }

    
    axios
      .get(`https://cia.argomex1.com/cia/prod/prod/movproceso?tipo=${mprtipo.value}&fechaini=${finicio}&fechafin=${ffin}&linea=${mprlprid.value}&clave=${prdclave}&offset=${offset}`)
      .then((data) => {
        setProcesos(data.data.items);
      
       
      })
      .catch((error) => {
        console.log(error);
      });
      
  };
  const handleRowClick = (params) => {
    


  };

  const handleClose = (params) => {

    setShow(false);
    setPrdclave("");
 
  };

  const fetchLinea = () => {
    
    axios
    .get(`https://cia.argomex1.com/cia/prod/prod/lineaproduccion?empresa=${prdempid}`)
    .then((data) => {
      setLinea(data.data.items);
      
    })
    .catch((error) => {
      console.log(error);
    });
  
  };

  
  const fetchEstatus = () => {
    
    axios
    .get(`https://cia.argomex1.com/cia/prod/prod/estproducto`)
    .then((data) => {
      setEstatus(data.data.items);
      
    })
    .catch((error) => {
      console.log(error);
    });
  
  };
  
  const fetchCharacters = () => {
    console.log('ON')
   
    axios
      .get(`https://cia.argomex1.com/cia/prod/prod/productos?empresa=${prdempid}&clave=${prdclave}`)
      .then((data) => {
        setCharacters(data.data.items);
       
        console.log(data.data.items[0].prdclave);
        setPrdnombre(data.data.items[0].prdnombre);
        setMprunidad(data.data.items[0].prdualid);
       
       
      })
      .catch((error) => {
        console.log(error);
      });
      
  };


  const handleShow = () => {
    fetchLinea();
    fetchEstatus();
    setDeshabilitado(false);
    setShow(true);
    setTitulo("Nuevo Proceso");
    setBotontitulo("Guardar");
    console.log(mprusuid)
   
   
    console.log(localStorage.getItem("userToken"))
  
  };

  const buscarProducto=()=>{
    fetchCharacters();
  }

  const fetchLimpiar=()=>{
    setPrdclave("");
    setMprlprid("");
    setMprtipo("");
    fetchProcesos();

    
  }

  const handleNext=()=>{

    setOffset(offset + 100)

    console.log('ON')
    fetchProcesos();


  }

  const handleBack=()=>{
    console.log("atras")

   

    if (offset<=0) {
      setOffset(0)
     
      
     } else {
      setOffset(offset - 100)
     }

    console.log('ON')
    fetchProcesos();
  }




  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageInfo?.totalRowCount !== undefined
        ? pageInfo?.totalRowCount
        : prevRowCountState,
    );
    fetchProcesos();
    fetchLinea();
  },  [pageInfo?.totalRowCount, setRowCountState]);

  return (
    <div className="App">
      <Container fixed>
        <Grid item xs={6}>
          <IconButton color="primary" aria-label="add to shopping cart" onClick={handleShow}>
          <AddIcon />
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
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              defaultValue={0}
             
              onChange={(option) => HandelChange(option)} // this returns (option) => option.phaseText) as a string
              isDisabled={eliminar}
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
          value={fechaini}
          onChange={(e)=>setFechaIni(e.target.value)}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Fecha Fin</Form.Label>
          <Form.Control type="date" 
          placeholder="Password" 
          value={fechafin}
          onChange={(e)=>setFechaFin(e.target.value)}/>
          
        </Form.Group>
       
  
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Linea de producción</Form.Label>
          <Select 
              options = { linea.map(sup => ({ label: sup.lprid, value: sup.lprid })) }
              getOptionLabel={(option) => option.label}
              getOptionValue={(option) => option.value}
              defaultValue={0}
             
              onChange={(option) => HandelChangeLinea(option)} // this returns (option) => option.phaseText) as a string
              
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
      <Button variant="primary" onClick={fetchProcesos}>
        Buscar
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
          height: 600,
        },
      }}
    >

        <DataGrid
         initialState={{
          sorting: {
            sortModel: [{ field: 'mprid', sort: 'desc' }],
          },
        }}
        getRowHeight={() => 'auto'} 
          rows={procesos}
          rowCount={rowCountState}
          loading={isLoading}
          rowsPerPageOptions={[5]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          columns={columns}
          getRowId={row => row.mprid}
          onRowClick={handleRowClick}
          components={{ Toolbar: GridToolbar }}
          localeText={{
            toolbarExport: 'Exportar',
  toolbarExportLabel: 'Exportar',
  toolbarExportCSV: 'Descargar como CSV',
  toolbarExportPrint: 'Imprimir',
  toolbarExportExcel: 'Descargar como Excel',
            toolbarDensity:'Densidad',
            toolbarFilters:'Filtros',
            toolbarColumns:'Columnas'
          
          }}
          hideFooter
        
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{titulo}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="prdclave">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" value={localStorage.getItem("userToken")} onChange={(e)=>setMprusuid(e.target.value)}   disabled={true}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="prdestatus">
              <Form.Label>Tipo</Form.Label>
              <Select 
              options = {options}
              defaultValue={{label: `${mprtipo}`, value:`${mprtipo}`}}
              onChange={(sup) => setMprtipo(sup.value)}
              isDisabled={eliminar}
              />    
            </Form.Group>

            <Form.Group className="mb-3" controlId="prdnombre">
              <Form.Label>Linea de producción</Form.Label>
              <Select 
              options = { linea.map(sup => ({ label: sup.lprid, value: sup.lprid })) }
              defaultValue={{label: `${mprlprid}`, value:`${mprlprid}`}}
              onChange={(sup) => setMprlprid(sup.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="prdclave">
              <Form.Label>Clave</Form.Label>
              
              <InputGroup className="mb-3">
        <Form.Control
          placeholder="Ingresa una clave"
          value={prdclave}
          onChange={(e)=>setPrdclave(e.target.value)}
          autoFocus
          
          
        />
         <IconButton color="primary" aria-label="add to shopping cart" onClick={buscarProducto}>
          <SearchIcon />
          </IconButton>
      </InputGroup>

      
            </Form.Group>

            <Form.Group className="mb-3" controlId="prdnombre">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" value={prdnombre} onChange={(e)=>setPrdnombre(e.target.value)}
              disabled={true}/>
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="mprunidad">
              <Form.Label>Unidad</Form.Label>
              <Form.Control type="text" value={mprunidad} onChange={(e)=>setMprunidad(e.target.value)} disabled={true}/>
            </Form.Group>





            <Form.Group className="mb-3" controlId="mprcantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control type="text" value={mprcantidad} onChange={(e)=>setMprcantidad(e.target.value)}   disabled={deshabilitado}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="mprheadcount">
              <Form.Label>HC</Form.Label>
              <Form.Control type="text" value={mprheadcount} onChange={(e)=>setMprheadcount(e.target.value)}   disabled={deshabilitado}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="mprestatus">
              <Form.Label>Estatus</Form.Label>
              <Select 
              options = { estatus.map(sup => ({ label: sup.eprnombre, value: sup.eprid })) }
              defaultValue={{label: `${mprestatus}`, value:`${mprestatus}`}}
              onChange={(sup) => setMprestatus(sup.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="mprcoms">
              <Form.Label>Comentarios</Form.Label>
              <Form.Control type="text" value={mprcoms} onChange={(e)=>setMprcoms(e.target.value)}   disabled={deshabilitado}/>
            </Form.Group>


           
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
          <Button variant="primary" onClick={handleAgregarProceso}>{botonTitulo}</Button>
        </Modal.Footer>

      </Modal>

    </div>
  );
};

export default Procesos;
