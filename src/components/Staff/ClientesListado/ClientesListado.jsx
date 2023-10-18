import { useEffect, useState } from 'react';

export const ClientesListado = () => {
    const [data, setData] = useState([]);
    const [formularioVisible, setFormularioVisible] = useState(false);
    const [clienteAEditar, setClienteAEditar] = useState(null); // Estado para el producto que se está editando
    const [nuevosDatos, setNuevosDatos] = useState({
        is_staff: false, // Establecer el valor inicial de is_staff como falso
    });
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/ver_clientes/');
                if (!response.ok) {
                    throw new Error('No hay datos');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error');
            }
        };
        fetchData();
    }, []);

    const handleEditar = (cliente) => {
        setClienteAEditar(cliente);
        setNuevosDatos({
            ...cliente,
            is_staff: cliente.persona_idusuario.is_staff === 1,
        });
        setFormularioVisible(true);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        // Si el tipo de campo es 'checkbox', el valor es 'checked' en lugar de 'value'
        const inputValue = type === 'checkbox' ? checked : value;
        setNuevosDatos(prevState => ({
            ...prevState,
            [name]: inputValue
        }));
    };

    const handleGuardarCambios = async () => {
        try {
            // Realizar la solicitud PATCH con los nuevos datos
            const response = await fetch(`http://127.0.0.1:8000/api/modificar_cliente/?id_cliente=${clienteAEditar.idcliente}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(nuevosDatos),
            });
            if (response.ok) {
                // Producto editado con éxito, puedes actualizar el estado o recargar la lista de productos
                console.log('Cliente editado con éxito');
                // Actualizar la lista de productos o realizar otras acciones necesarias
    
                // Realizar una nueva solicitud para obtener los datos actualizados
                const nuevaRespuesta = await fetch('http://127.0.0.1:8000/api/ver_clientes/');
                if (nuevaRespuesta.ok) {
                    const nuevosDatos = await nuevaRespuesta.json();
                    setData(nuevosDatos); // Actualizar el estado con los nuevos datos
                } else {
                    throw new Error('Error al obtener los datos actualizados');
                }
                setClienteAEditar(null); // Limpiar los datos del cliente a editar
                setFormularioVisible(false);
    
                
            } else {
                throw new Error('Error al editar el producto');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEliminar = async (idcliente) => {
        try {
            // Preguntar al usuario si realmente desea eliminar el producto
            const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este cliente?');
    
            if (confirmacion) {
                // Esperar 5 segundos antes de eliminar el producto definitivamente
                const timer = setTimeout(async () => {
                    try {
                        // Realizar la solicitud DELETE al servidor
                        const response = await fetch(`http://127.0.0.1:8000/api/eliminar_cliente/?id_cliente=${idcliente}`, {
                            method: 'DELETE',
                        });
    
                        if (response.ok) {
                            // Producto eliminado con éxito, puedes actualizar el estado o recargar la lista de productos
    
                            // Realizar una nueva solicitud para obtener los datos actualizados
                            const nuevaRespuesta = await fetch('http://127.0.0.1:8000/api/ver_clientes/');
                            if (nuevaRespuesta.ok) {
                                const nuevosDatos = await nuevaRespuesta.json();
                                setData(nuevosDatos); // Actualizar el estado con los nuevos datos
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
            <h1>Listado de Clientes</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.idcliente}>
                        <p>ID Cliente: {item.idcliente}</p>
                        <p>Nombre: {item.persona_idusuario.nombre}</p>
                        <p>Apellido: {item.persona_idusuario.apellido}</p>
                        <p>Email: {item.persona_idusuario.email}</p>
                        <p>Dirección: {item.direccion}</p>
                        <p>Es Empleado: {item.persona_idusuario.is_staff ? "Sí" : "No"}</p>
                        {/* Agregar un enlace a la página de edición con el ID del cliente */}
                        <button onClick={() => handleEditar(item)}>Editar</button>
                        <button onClick={() => handleEliminar(item.idcliente)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            {formularioVisible && clienteAEditar && (
                <div>
                    <h2>Editar Cliente</h2>
                    <form>
                        <input
                            type="text"
                            name="nombre"
                            value={nuevosDatos.nombre || clienteAEditar.persona_idusuario.nombre}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                        />
                        <input
                            type="text"
                            name="apellido"
                            value={nuevosDatos.apellido || clienteAEditar.persona_idusuario.apellido}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                        />
                        <input
                            type="text"
                            name="email"
                            value={nuevosDatos.email || clienteAEditar.persona_idusuario.email}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                        />
                        <input
                            type="text"
                            name="direccion"
                            value={nuevosDatos.direccion || clienteAEditar.direccion}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                        />
                        <label>
                            Es Empleado:
                            <input
                                type="checkbox"
                                name="is_staff"
                                checked={nuevosDatos.is_staff}
                                onChange={handleInputChange}
                            />
                        </label>
                        
                        
                        <button type="button" onClick={handleGuardarCambios}>Guardar Cambios</button>
                    </form>
                </div>
            )}
        </>
    );
};
