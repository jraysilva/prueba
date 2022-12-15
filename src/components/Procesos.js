import React, { useState, useEffect } from 'react';
import { DataGrid, gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
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


const Procesos = () => {
  
  const [show, setShow] = useState(false);
  const [deshabilitado, setDeshabilitado] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [procesos, setProcesos] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [tipo, setTipo] = useState([]);
  const [estatus, setEstatus] = useState([]);
  const [linea, setLinea] = useState([]);
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

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
  const [prdclave, setPrdclave] = useState("");
  const [mprtipo, setMprtipo] = useState("");
  const [mprfecha, setMprfecha] = useState("");
  const [mprlprid, setMprlprid] = useState("");
  const [mprheadcount, setMprheadcount] = useState("");
  const [prdnombre, setPrdnombre] = useState("");
  const [mprcoms, setMprcoms] = useState("");
  const [mprcantidad, setMprcantidad] = useState("");
  const [mprusuid, setMprusuid] = useState("");
  const [mprunidad, setMprunidad] = useState("");
  const [mprestatus, setMprestatus] = useState("");
  const [error, setError] = useState("");



  const columns = [
    { field: "mprid", headerName: "ID", flex: 1 },
    { field: "mprtipo", headerName: "Tipo", flex: 1 },
    { field: "mprfecha", headerName: "Fecha/Hora", flex: 1 },
    { field: "mprlprid", headerName: "Linea", flex: 1 },
    { field: "mprheadcount", headerName: "HC", flex: 1 },
    { field: "prdclave", headerName: "Clave", flex: 1 },
    { field: "prdnombre", headerName: "Descripción", flex: 1 },
    { field: "mprcantidad", headerName: "Cantidad", flex: 1 },
    { field: "mprcoms", headerName: "Comentarios", flex: 1 },
  ];

  const options = [
    { value: 'E', label: 'E' },
    { value: 'S', label: 'S' },
  ]

  const handleAgregarProceso = () => {
    console.log(prdclave)
    console.log(mprtipo)
    
    axios({
      url:"http://ciacloud.dyndns.org:8088/cia/prod/prod/movproceso",method:"POST",
      data:
      {
        "items":    [
      {
        "mprtipo": mprtipo,
        "mprlprid": mprlprid,
        "prdclave": prdclave,
        "prdempid": 1,
        "mprusuid": 1,
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
    axios
      .get(`http://ciacloud.dyndns.org:8088/cia/prod/prod/movproceso`)
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
    .get(`http://ciacloud.dyndns.org:8088/cia/prod/prod/lineaproduccion?empresa=1`)
    .then((data) => {
      setLinea(data.data.items);
      
    })
    .catch((error) => {
      console.log(error);
    });
  
  };

  
  const fetchEstatus = () => {
    
    axios
    .get(`http://ciacloud.dyndns.org:8088/cia/prod/prod/estproducto`)
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
      .get(`http://ciacloud.dyndns.org:8088/cia/prod/prod/productos?empresa=1&clave=0001354`)
      .then((data) => {
        setCharacters(data.data.items);
       
       
       
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
   
   
    console.log(localStorage.getItem("userToken"))
  
  };

  const buscarProducto=()=>{
    fetchCharacters();
  }

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageInfo?.totalRowCount !== undefined
        ? pageInfo?.totalRowCount
        : prevRowCountState,
    );
    fetchProcesos();
  },  [pageInfo?.totalRowCount, setRowCountState]);

  return (
    <div className="App">
      <Container fixed>
        <Grid item xs={6}>
          <IconButton color="primary" aria-label="add to shopping cart" onClick={handleShow}>
          <AddIcon />
          </IconButton>
        </Grid>
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
        />
  </Box>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="prdclave">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="text" value={localStorage.getItem("userToken")} onChange={(e)=>setMprusuid(e.target.value)} autoFocus  disabled={deshabilitado}/>
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
          
        />
         <IconButton color="primary" aria-label="add to shopping cart" onClick={buscarProducto}>
          <SearchIcon />
          </IconButton>
      </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3" controlId="prdnombre">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" value={prdnombre} onChange={(e)=>setPrdnombre(e.target.value)}/>
              
            </Form.Group>

            <Form.Group className="mb-3" controlId="mprunidad">
              <Form.Label>Unidad</Form.Label>
              <Form.Control type="text" value={mprunidad} onChange={(e)=>setMprunidad(e.target.value)}/>
            </Form.Group>





            <Form.Group className="mb-3" controlId="mprcantidad">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control type="text" value={mprcantidad} onChange={(e)=>setMprcantidad(e.target.value)} autoFocus  disabled={deshabilitado}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="mprheadcount">
              <Form.Label>HC</Form.Label>
              <Form.Control type="text" value={mprheadcount} onChange={(e)=>setMprheadcount(e.target.value)} autoFocus  disabled={deshabilitado}/>
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
              <Form.Control type="text" value={mprcoms} onChange={(e)=>setMprcoms(e.target.value)} autoFocus  disabled={deshabilitado}/>
            </Form.Group>


           
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
          <Button variant="primary" onClick={handleAgregarProceso}>Agregar</Button>
        </Modal.Footer>

      </Modal>

    </div>
  );
};

export default Procesos;
