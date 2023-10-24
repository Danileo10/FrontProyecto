import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks";
import './Citaslistado.scss';

export const CitasListado = () => {
  const [citas, setCitas] = useState([]);
  const { auth } = useAuth();
  useEffect(() => {
      const fetchData = async () => {
          try {

              console.log(auth)
              const response = await fetch(`http://127.0.0.1:8000/api-citas/cita/?id_cliente=${auth.me.idcliente}`);
              if (!response.ok) {
                  throw new Error('No hay datos');
              }
              const jsonData = await response.json();
              setCitas(jsonData);
              console.log(jsonData)
          } catch (error) {
              console.error('Error');
          }
      };
      fetchData();
  }, []);

  const handleEliminar = async (idcita) => {
    try {
        // Preguntar al usuario si realmente desea eliminar el producto
        const confirmacion = window.confirm('¿Estás seguro de que deseas cancelar la cita?');

        if (confirmacion) {
            // Esperar 5 segundos antes de eliminar el producto definitivamente
            const timer = setTimeout(async () => {
                try {
                    // Realizar la solicitud DELETE al servidor
                    const response = await fetch(`http://127.0.0.1:8000/api-citas/eliminar_cita/?id_cita=${idcita}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        // Producto eliminado con éxito, puedes actualizar el estado o recargar la lista de productos

                        // Realizar una nueva solicitud para obtener los datos actualizados
                        const nuevaRespuesta = await fetch(`http://127.0.0.1:8000/api-citas/cita/?id_cliente=${auth.me.idcliente}`);
                        if (nuevaRespuesta.ok) {
                            const nuevosDatos = await nuevaRespuesta.json();
                            setCitas(nuevosDatos); // Actualizar el estado con los nuevos datos
                        } else {
                            throw new Error('Error al obtener los datos actualizados');
                        }
                    } else {
                        throw new Error('Error al cancelar la cita');
                    }
                } catch (error) {
                    console.error(error);
                }
            }, 5000); // Esperar 5 segundos (5000 milisegundos) antes de eliminar el producto

            // Función para cancelar la eliminación si el usuario desea deshacer la acción
            const cancelarEliminacion = () => {
                clearTimeout(timer); // Cancelar el temporizador
                alert('Cancelación cancelada'); // Mostrar un mensaje al usuario
            };

            // Mostrar un mensaje con la opción de deshacer
            alert('Cita cancelada. Tienes 5 segundos para deshacer la acción.');
            
            // Esperar a que el usuario haga clic en el botón de deshacer
            const deshacer = window.confirm('¿Deshacer cancelación?');
            
            // Si el usuario desea deshacer la eliminación, cancelar la acción
            if (deshacer) {
                cancelarEliminacion();
            }
        }
    } catch (error) {
        console.error(error);
    }
};
  return (
      <>
         <h1>Citas Agendadas</h1>
          <ul className="ul-mascotas">
              {citas.map((cita) => (
                  <li key={cita.idcita}>
                      <p>Fecha de la Cita: {cita.Fecha}</p>
                      <p>Bloque de horas de la Cita: {cita.Bloque}</p>
                      <p>Servicio a atender: {cita.Servicio}</p>
                      <p>Mascota a atender: {cita.Mascota}</p>
                      <button className="eliminar-button_pet" onClick={() => handleEliminar(cita.idcita)}>Cancelar</button>
                      <p>Mascota a atender: {cita.Nombre_mascota} - {cita.Raza_mascota}</p>
                      <button onClick={() => handleEliminar(cita.idcita)}>Cancelar</button>
                     
                      {/* Agrega aquí otras propiedades de la mascota que desees mostrar */}
                  </li>
              ))}
          </ul>

      </>
  )
}

