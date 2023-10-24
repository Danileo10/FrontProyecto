import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks";
import './PerfilMascota.scss';

export const PerfilMascota = () => {
    const [mascotas, setMascotas] = useState([]);
    const { auth } = useAuth();
    useEffect(() => {
        const fetchData = async () => {
            try {

                console.log(auth)
                const response = await fetch(`http://127.0.0.1:8000/api/mascota_esp/?id_cliente=${auth.me.idcliente}`);
                if (!response.ok) {
                    throw new Error('No hay datos');
                }
                const jsonData = await response.json();
                setMascotas(jsonData);
                console.log(jsonData)
            } catch (error) {
                console.error('Error');
            }
        };
        fetchData();
    }, []);

    const handleEliminar = async (idmascota) => {
        try {
            // Preguntar al usuario si realmente desea eliminar el producto
            const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar esta mascota?');
    
            if (confirmacion) {
                // Esperar 5 segundos antes de eliminar el producto definitivamente
                const timer = setTimeout(async () => {
                    try {
                        // Realizar la solicitud DELETE al servidor
                        const response = await fetch(`http://127.0.0.1:8000/api/eliminar_mascota/?id_mascota=${idmascota}`, {
                            method: 'DELETE',
                        });
    
                        if (response.ok) {
                            // Producto eliminado con éxito, puedes actualizar el estado o recargar la lista de productos
    
                            // Realizar una nueva solicitud para obtener los datos actualizados
                            const nuevaRespuesta = await fetch(`http://127.0.0.1:8000/api/mascota_esp/?id_cliente=${auth.me.idcliente}`);
                            if (nuevaRespuesta.ok) {
                                const nuevosDatos = await nuevaRespuesta.json();
                                setMascotas(nuevosDatos); // Actualizar el estado con los nuevos datos
                            } else {
                                throw new Error('Error al obtener los datos actualizados');
                            }
                        } else {
                            throw new Error('Error al eliminar el cliente');
                        }
                    } catch (error) {
                        console.error(error);
                    }
                }, 5000); // Esperar 5 segundos (5000 milisegundos) antes de eliminar el producto
    
                // Función para cancelar la eliminación si el usuario desea deshacer la acción
                const cancelarEliminacion = () => {
                    clearTimeout(timer); // Cancelar el temporizador
                    alert('Eliminación cancelada'); // Mostrar un mensaje al usuario
                };
    
                // Mostrar un mensaje con la opción de deshacer
                alert('Cliente eliminado. Tienes 5 segundos para deshacer la acción.');
                
                // Esperar a que el usuario haga clic en el botón de deshacer
                const deshacer = window.confirm('¿Deshacer eliminación?');
                
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
           <h1 className="title2">Mascotas</h1>
            <ul className="ul-mascotas">
                {mascotas.map((mascota) => (
                    <li className="li-mascotas c" key={mascota.idmascota}>
                        <p>Nombre: {mascota.nombre}</p>
                        <p>Fecha de nacimiento: {mascota.fecha_nacim}</p>
                        <p>Raza: {mascota.raza}</p>
                        <p>Fecha de defunción: {mascota.fecha_defun}</p>
                        <button className="eliminar-button_pet" onClick={() => handleEliminar(mascota.idmascota)}>Eliminar</button>
                        {/* Agrega aquí otras propiedades de la mascota que desees mostrar */}
                    </li>
                ))}
            </ul>

        </>
    )
}


