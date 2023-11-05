import './ClientesListado.scss';
import cerrar from "../../../../public/x.svg"
import { useEffect, useState } from 'react';


export const ClientesListado = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteAEditar, setClienteAEditar] = useState(null);
  const [nuevosDatos, setNuevosDatos] = useState({
    is_staff: false,
  });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
    const clientesPorPagina = 6;
    const indiceInicial = (currentPage - 1) * clientesPorPagina;
    const indiceFinal = currentPage * clientesPorPagina;
    const clientesPaginaActual = clientes.slice(indiceInicial, indiceFinal);

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
        console.log('Cliente editado con éxito');

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
    <div className='content'>
      <h1 className='titulo'>Listado de Clientes</h1>
      <ul className='ulC'>
        {clientesPaginaActual.map((item) => (
          <li key={item.idcliente} className='c'>
            <p>ID Cliente: {item.idcliente}</p>
            <p>Nombre: {item.persona_idusuario.nombre}</p>
            <p>Apellido: {item.persona_idusuario.apellido}</p>
            <p>Email: {item.persona_idusuario.email}</p>
            <p>Dirección: {item.direccion}</p>
            <p>Es empleado: {item.persona_idusuario.is_staff ? 'Sí' : 'No'}</p>
            <button className= 'button1' onClick={() => handleEditar(item)}>Editar</button>
          </li>
        ))}
      </ul>

      <div className="paginacion">
                <span>Página {currentPage} de {Math.ceil(clientes.length / clientesPorPagina)}</span>
                <button className="btn-16" onClick={handlePaginaAnterior} disabled={currentPage === 1}>Anterior</button>
                <button className="btn-16" onClick={handlePaginaSiguiente} disabled={currentPage === Math.ceil(clientes.length / clientes)}>Siguiente</button>
            </div>

      {mostrarModal && clienteAEditar && (
        <div className='modal-background'>
          <div className='modal-content'>
            <h2 className='titulo2'>Editar Cliente</h2>
            <form>
              <div className='input-group'>
                <input
                  type="text"
                  name="nombre"
                  value={nuevosDatos.nombre !== undefined ? nuevosDatos.nombre : clienteAEditar.persona_idusuario.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                />
              </div>
              <div className='input-group'>
                <input
                  type="text"
                  name="apellido"
                  value={nuevosDatos.apellido !== undefined ? nuevosDatos.apellido : clienteAEditar.persona_idusuario.apellido}
                  onChange={handleInputChange}
                  placeholder="Apellido"
                />
              </div>
              <div className='input-group'>
                <input
                  type="text"
                  name="email"
                  value={nuevosDatos.email !== undefined ? nuevosDatos.email : clienteAEditar.persona_idusuario.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>
              <div className='input-group'>
                <input
                  type="text"
                  name="direccion"
                  value={nuevosDatos.direccion !== undefined ? nuevosDatos.direccion : clienteAEditar.direccion}
                  onChange={handleInputChange}
                  placeholder="Dirección"
                />
              </div>
              <div className='input-group_emp'>
                <label>
                  Es empleado
                  <input
                    type="checkbox"
                    name="is_staff"
                    checked={nuevosDatos.is_staff}
                    onChange={handleInputChange}
                  />
                </label>
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
