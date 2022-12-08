import React, { useState, useEffect } from 'react';
import { DataGrid, gridColumnsTotalWidthSelector } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from '@mui/material/Container';
import axios from 'axios';
import Box from '@mui/material/Box';
import Select from 'react-select';
import { createFakeServer } from '@mui/x-data-grid-generator';


const Productos = () => {
  
  const [show, setShow] = useState(false);
  const [deshabilitado, setDeshabilitado] = useState(false);
  const [eliminar, setEliminar] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [unidades, setUnidades] = useState([]);
  const [divisiones, setDivisiones] = useState([]);
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

  

  const columns = [
    { field: "prdid", headerName: "ID", flex: 1 },
    { field: "prdclave", headerName: "Clave", flex: 1 },
    { field: "prdups", headerName: "UPS", flex: 1 },
    { field: "prdnombre", headerName: "Nombre", flex: 1 },
    { field: "prdlinid", headerName: "Unidad", flex: 1 },
    { field: "prdualid", headerName: "División", flex: 1 },
    { field: "prdpzascaja", headerName: "Pza Caja", flex: 1 },
    { field: "prdpzaspallet", headerName: "Pza Pallet", flex: 1 },
    { field: "prdpeso", headerName: "Peso", flex: 1 },
    { field: "prdvolumen", headerName: "Volumen", flex: 1 },
    { field: "prdestatus", headerName: "Estatus", fles:1},
   
    
  ];

  const options = [
    { value: 'A', label: 'A' },
    { value: 'I', label: 'I' },
    
  ]

  

  
  const handleAgregarProducto = () => {
    

    axios({
      url:"http://ciacloud.dyndns.org:8088/cia/prod/prod/productos",method:"POST",
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
    axios
      .get(`http://ciacloud.dyndns.org:8088/cia/prod/prod/productos?empresa=1`)
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
    .get(`http://ciacloud.dyndns.org:8088/cia/prod/prod/unidades`)
    .then((data) => {
      setUnidades(data.data.items);
      
    })
    .catch((error) => {
      console.log(error);
    });
  
  };

  const fetchDivision = () => {
    
    axios
    .get(`http://ciacloud.dyndns.org:8088/cia/prod/prod/division?empresa=1`)
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
  

  
  };

  
  

  

  useEffect(() => {
    setRowCountState((prevRowCountState) =>
      pageInfo?.totalRowCount !== undefined
        ? pageInfo?.totalRowCount
        : prevRowCountState,
    );
    fetchCharacters();
  },  [pageInfo?.totalRowCount, setRowCountState]);

  return (
    <div className="App">
      <Container fixed>
        <Grid item xs={6}>
          <IconButton color="primary" aria-label="add to shopping cart" onClick={handleShow}>
          <AddShoppingCartIcon />
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
            sortModel: [{ field: 'prdid', sort: 'desc' }],
          },
        }}



          rows={characters}
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
          
          
          getRowId={row => row.prdid}
          
          
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
          <Button variant="primary" onClick={handleAgregarProducto}>Agregar</Button>
        </Modal.Footer>

      </Modal>

    </div>
  );
};

export default Productos;
