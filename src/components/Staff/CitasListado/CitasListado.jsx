import { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks';
import cerrar from "../../../../public/x.svg"

export const CitasListado = () => {
    const [citas, setCitas] = useState([]);
    const {auth} = useAuth();
    const [citaAEditar, setCitaAEditar] = useState(null);
    const [nuevosDatos, setNuevosDatos] = useState({
        descripcion: '',
      });

      const [mostrarModal, setMostrarModal] = useState(false);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevosDatos({
            ...nuevosDatos,
            [name]: value,
        });
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
            console.log('Pedido editado con éxito');
    
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
        <>
            <h1>listado citas</h1>
            <ul>
                {citas.map((item) => (
                    <li key={item.id} className='c'>
                        <p>fecha: {item.Fecha}</p>
                        <p>bloque: {item.Bloque}</p>
                        <p>servicio: {item.Servicio}</p>
                        <p>cliente: {item.Cliente}</p>
                        <p>mascota: {item.Mascota} - {item.Raza}</p>
                        <p>Descripcion: {item.Descripcion}</p>
                        <button className='button1' onClick={() => handleEditar(item)}>Agregar Descripción</button>
                        
                    </li>
                ))}
            </ul>

            {mostrarModal && citaAEditar && (
        <div className='modal-background'>
          <div className='modal-content'>
            <h2 className='titulo2'>Agregar Descripción</h2>
            <form>
              <div className='input-group'>
                <input
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
        </>
    )
}


