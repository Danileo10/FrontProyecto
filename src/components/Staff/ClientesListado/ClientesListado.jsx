import './ClientesListado.scss';
import cerrar from "../../../../public/x.svg"
import edit_but from '../../../../public/edit.svg'
import busc_but from '../../../../public/busc.svg'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'


export const ClientesListado = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteAEditar, setClienteAEditar] = useState(null);
  const [nuevosDatos, setNuevosDatos] = useState({
    is_staff: false,
  });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const clientesPorPagina = 8;
  const indiceInicial = (currentPage - 1) * clientesPorPagina;
  const indiceFinal = currentPage * clientesPorPagina;
  const clientesPaginaActual = clientes.slice(indiceInicial, indiceFinal);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/ver_clientes/');
        if (!response.ok) {
          throw new Error('No hay datos');
        }
        const jsonData = await response.json();
        setClientes(jsonData);
      } catch (error) {
        console.error('Error');
      }
    };
    fetchData();
  }, []);

  const handleReiniciar = async () => {

    try {
      const response = await fetch('http://127.0.0.1:8000/api/ver_clientes/');
      if (!response.ok) {
        throw new Error('No hay datos');
      }
      const jsonData = await response.json();
      setClientes(jsonData);
    } catch (error) {
      console.error('Error');
    }


  }

  const handleEditar = (cliente) => {
    setClienteAEditar(cliente);
    setNuevosDatos({
      nombre: cliente.persona_idusuario.nombre || '',
      apellido: cliente.persona_idusuario.apellido || '',
      email: cliente.persona_idusuario.email || '',
      direccion: cliente.direccion || '',
      is_staff: cliente.persona_idusuario.is_staff === 1,
    });
    setMostrarModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setNuevosDatos((prevState) => ({
      ...prevState,
      [name]: inputValue,
    }));
  };

  const handleBuscar = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/usuario/?email=${busqueda}`)

      setClientes(response.data)
    } catch (error) {
      console.log("error")
      Swal.fire({
        position: "center ",
        icon: "error",
        title: "El email no existe",
        showConfirmButton: true,
      })
      throw new Error(error);
    }





  }

  const handleGuardarCambios = async (e) => {
    e.preventDefault();
    if (!nuevosDatos.nombre || !nuevosDatos.apellido || !nuevosDatos.email || !nuevosDatos.direccion) {
      console.error('Todos los campos son obligatorios');
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/modificar_cliente/?id_cliente=${clienteAEditar.idcliente}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevosDatos),
        }
      );
      if (response.ok) {
        Swal.fire({
          position: "center ",
          icon: "success",
          title: "Cliente editado con éxito!",
          showConfirmButton: false,
          timer: 1000
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");

          }
        });

        const nuevaRespuesta = await fetch('http://127.0.0.1:8000/api/ver_clientes/');
        if (nuevaRespuesta.ok) {
          const nuevosDatos = await nuevaRespuesta.json();
          setClientes(nuevosDatos);
        } else {
          throw new Error('Error al obtener los datos actualizados');
        }
        setClienteAEditar(null);
        setMostrarModal(false);
      } else {
        throw new Error('Error al editar el producto');
      }


    } catch (error) {
      console.error(error);
    }
  };

  const handlePaginaAnterior = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log(`Página actual: ${currentPage - 1}`);
    }
  };


  const handlePaginaSiguiente = () => {
    const totalPages = Math.ceil(clientes.length / clientesPorPagina);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log(`Página actual: ${currentPage + 1}`);
    }
  };


  return (
    <div className=''>
      <h2 className="titulo-mascotas">Listado de Usuarios</h2 >
      <div className='buscador'>
         <input
        type="text"
        placeholder="Buscar usuario"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button className='btn-16' onClick={handleBuscar}>
        <img src={busc_but} alt="cerrar" className='cerrar' />
      </button>
      <button className='btn-16' onClick={handleReiniciar}>✖️</button>
      </div>
     
      <ul className='ulC  '>
        {clientesPaginaActual.map((item) => (
          <li key={item.idcliente} className='c'>
            <h2>ID Usuario: {item.idcliente}</h2>
            <p>Nombre: {item.persona_idusuario.nombre}</p>
            <p>Apellido: {item.persona_idusuario.apellido}</p>
            <p>Email: {item.persona_idusuario.email}</p>
            <p>Dirección: {item.direccion}</p>
            <p>Es empleado: {item.persona_idusuario.is_staff ? 'Sí' : 'No'}</p>
            <div className='contentBtn'>
              <button className='button_edit' onClick={() => handleEditar(item)}>
                <img src={edit_but} alt="Editar Mascota" />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="paginacion">
        <span className="btn-17" >Página {currentPage} de {Math.ceil(clientes.length / clientesPorPagina)}</span>
        <button className="btn-16" onClick={handlePaginaAnterior} disabled={currentPage === 1}>Anterior</button>
        <button className="btn-16" onClick={handlePaginaSiguiente} disabled={currentPage === Math.ceil(clientes.length / clientes)}>Siguiente</button>
      </div>

      {mostrarModal && clienteAEditar && (
        <div className='modal-background'>
          <div className='modal-content'>
            <h2 className='titulo2'>Editar Cliente</h2>
            <form>
              <div className='input-group'>
                <label htmlFor="">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={nuevosDatos.nombre !== undefined ? nuevosDatos.nombre : clienteAEditar.persona_idusuario.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                />
              </div>
              <div className='input-group'>
                <label htmlFor="">Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={nuevosDatos.apellido !== undefined ? nuevosDatos.apellido : clienteAEditar.persona_idusuario.apellido}
                  onChange={handleInputChange}
                  placeholder="Apellido"
                />
              </div>
              <div className='input-group'>
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  name="email"
                  value={nuevosDatos.email !== undefined ? nuevosDatos.email : clienteAEditar.persona_idusuario.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>
              <div className='input-group'>
                <label htmlFor="">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={nuevosDatos.direccion !== undefined ? nuevosDatos.direccion : clienteAEditar.direccion}
                  onChange={handleInputChange}
                  placeholder="Dirección"
                />
              </div>
              <div className='input-group_emp'>
                <label>Es empleado</label>
                <input
                  type="checkbox"
                  name="is_staff"
                  checked={nuevosDatos.is_staff}
                  onChange={handleInputChange}
                />

              </div>
              <button className='button_save' type="button_save" onClick={handleGuardarCambios}>
                Guardar Cambios
              </button>
              <button className='button_close' type="button_close" onClick={() => setMostrarModal(false)}>
                <img src={cerrar} alt="cerrar" className='cerrar' />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
