import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import axios from 'axios';
import Swal from 'sweetalert2'
import cerrar from "../../../../public/x.svg"
import busc_but from '../../../../public/busc.svg'
import './CitasListato.scss';

export const CitasListado = () => {
  const [citas, setCitas] = useState([]);
  const { auth } = useAuth();
  const [citaAEditar, setCitaAEditar] = useState(null);
  const [nuevosDatos, setNuevosDatos] = useState({
    descripcion: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const citasPorPagina = 8;
  const indiceInicial = (currentPage - 1) * citasPorPagina;
  const indiceFinal = currentPage * citasPorPagina;
  const citasPaginaActual = citas.slice(indiceInicial, indiceFinal);
  const [busqueda, setBusqueda] = useState('');
  const [busquedaEmail, setBusquedaEmail] = useState('')
  const [busquedaMascota, setBusquedaMascota] = useState('')
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevosDatos({
      ...nuevosDatos,
      [name]: value,
    });
  };



  const handleReiniciar = async () => {

    try {
      const response = await fetch('http://127.0.0.1:8000/api-citas/citas/');
      if (!response.ok) {
        throw new Error('No hay datos');
      }
      const jsonData = await response.json();
      setCitas(jsonData);
      setBusqueda('')
      setBusquedaEmail('')
      setBusquedaMascota('')
    } catch (error) {
      console.error('Error');
    }


  }

  const handleBuscar = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api-citas/cita_filter/?fecha=${busqueda}`)

      setCitas(response.data)
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

  const handlePaginaAnterior = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log(`Página actual: ${currentPage - 1}`);
    }
  };
  const handlePaginaSiguiente = () => {
    const totalPages = Math.ceil(citas.length / citasPorPagina);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log(`Página actual: ${currentPage + 1}`);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api-citas/citas/');
        if (!response.ok) {
          throw new Error('No hay datos');
        }
        const jsonData = await response.json();
        setCitas(jsonData);
      } catch (error) {
        console.error('Error');
      }
    };
    fetchData();
  }, []);


  const handleEditar = (cita) => {
    setCitaAEditar(cita);
    setNuevosDatos({
      descripcion: cita.Descripcion || '',
    });
    setMostrarModal(true);
  };

  const handleHistorialCitas = async (e) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api-citas/mascota/?cliente=${busquedaEmail}&mascota=${busquedaMascota}`)

      setCitas(response.data)
      setBusqueda('')
    } catch (error) {
      console.log("error")
      Swal.fire({
        position: "center ",
        icon: "error",
        title: "Datos no encontrados",
        showConfirmButton: true,
      })
      throw new Error(error);
    }
  }
  const handleGuardarCambios = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api-citas/modificar_cita/?id_cita=${citaAEditar.idcita}&empleado=${auth.me.idcliente}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevosDatos),
        },
        console.log(nuevosDatos)
      );

      if (response.ok) {
        Swal.fire({
          position: "center ",
          icon: "success",
          title: "Descripción agregada",
          showConfirmButton: false,
          timer: 1000
        })

        const nuevaRespuesta = await fetch('http://127.0.0.1:8000/api-citas/citas/');
        if (nuevaRespuesta.ok) {
          const nuevosDatos = await nuevaRespuesta.json();
          setCitas(nuevosDatos);
        } else {
          throw new Error('Error al obtener los datos actualizados');
        }
        setCitaAEditar(null);
        setMostrarModal(false);
      } else {
        throw new Error('Error al editar el producto');
      }


    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className=''>
      <h2 className="titulo-mascotas">Listado de citas</h2>

      <div className='buscador'>
        <div className='BuscadorCita'>
          <h2>Fecha de la cita</h2>
          <input
            type="date"
            placeholder="Buscar cita"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}

          />
          <button className='btn-16' onClick={handleBuscar}>
            <img src={busc_but} alt="cerrar" className='cerrar' />
          </button>
          <button className='btn-16' onClick={handleReiniciar}>✖️</button>
        </div>


        <div className='buscadorHistorial'>
          <h2 className='tituloBuscador'>Mirar historial de citas</h2>
          <div>
            <input
            type="text"
            placeholder="Ingrese email cliente"
            value={busquedaEmail}
            onChange={(e) => setBusquedaEmail(e.target.value)}

          />
          <input
            type="text"
            placeholder="Ingrese nombre mascota"
            value={busquedaMascota}
            onChange={(e) => setBusquedaMascota(e.target.value)}

          />
          </div>
          
          <button className='btn-16' onClick={handleHistorialCitas}>
            <img src={busc_but} alt="cerrar" className='cerrar' />
          </button>
          

          <button className='btn-16' onClick={handleReiniciar}>✖️</button>
        </div>

      </div>

      <ul className='ulC'>
        {citasPaginaActual.map((item) => (
          <li key={item.id} className='c'>
            <h3>Fecha</h3>
            <p> {item.Fecha}</p>
            <h3>Bloque </h3>
            <p>{item.Bloque}</p>
            <h3>Servicio </h3>
            <p>{item.Servicio}</p>
            <h3>Cliente </h3>
            <p>{item.Cliente}</p>
            <h3>Mascota </h3>
            <p>{item.Mascota} - {item.Raza}</p>
            <h3>Descripción </h3>
            <p>{item.Descripcion}</p>
            <button className='button1' onClick={() => handleEditar(item)}>Agregar Descripción</button>

          </li>
        ))}
      </ul>

      <div className="paginacion">
        <span>Página {currentPage} de {Math.ceil(citas.length / citasPorPagina)}</span>
        <button className="btn-16" onClick={handlePaginaAnterior} disabled={currentPage === 1}>Anterior</button>
        <button className="btn-16" onClick={handlePaginaSiguiente} disabled={currentPage === Math.ceil(citas.length / citas)}>Siguiente</button>
      </div>

      {mostrarModal && citaAEditar && (
        <div className='modal-background'>
          <div className='modal-content'>
            <h2 className='titulo2'>Agregar Descripción</h2>
            <form>
              <div className='input-group'>
                <textarea
                  className='textTarea-2'
                  type="text"
                  name="descripcion"
                  value={nuevosDatos.descripcion !== undefined ? nuevosDatos.descripcion : citaAEditar.descripcion}
                  onChange={handleInputChange}
                  placeholder="Descripcion"
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
  )
}


