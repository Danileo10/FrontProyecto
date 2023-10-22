import { useEffect, useState } from 'react';
import './ProductosListado.scss'

export const ProductosListado = () => {
    const [data, setData] = useState([]);
    const [productoAEditar, setProductoAEditar] = useState(null); // Estado para el producto que se está editando
    const [nuevosDatos, setNuevosDatos] = useState({}); // Estado para los nuevos datos del producto

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api-comercio/mostrar_producto');
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

    // Función para manejar el clic en el botón "Editar"
    const handleEditar = (producto) => {
        setProductoAEditar(producto);
    };

    // Función para manejar los cambios en los campos de edición
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevosDatos({ ...nuevosDatos, [name]: value });
    };

    // Función para enviar la solicitud PATCH al servidor
    // Función para enviar la solicitud PATCH al servidor
const handleGuardarCambios = async () => {
    try {
        // Realizar la solicitud PATCH con los nuevos datos
        const response = await fetch(`http://127.0.0.1:8000/api-comercio/modificar_producto/?id_producto=${productoAEditar.idproducto}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevosDatos),
        });

        if (response.ok) {
            // Producto editado con éxito, puedes actualizar el estado o recargar la lista de productos
            console.log('Producto editado con éxito');
            // Actualizar la lista de productos o realizar otras acciones necesarias

            // Realizar una nueva solicitud para obtener los datos actualizados
            const nuevaRespuesta = await fetch('http://127.0.0.1:8000/api-comercio/mostrar_producto');
            if (nuevaRespuesta.ok) {
                const nuevosDatos = await nuevaRespuesta.json();
                setData(nuevosDatos); // Actualizar el estado con los nuevos datos
            } else {
                throw new Error('Error al obtener los datos actualizados');
            }

            setProductoAEditar(null); // Cerrar el formulario de edición
        } else {
            throw new Error('Error al editar el producto');
        }
    } catch (error) {
        console.error(error);
    }
};

const handleEliminar = async (idProducto) => {
    try {
        // Preguntar al usuario si realmente desea eliminar el producto
        const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');

        if (confirmacion) {
            // Esperar 5 segundos antes de eliminar el producto definitivamente
            const timer = setTimeout(async () => {
                try {
                    // Realizar la solicitud DELETE al servidor
                    const response = await fetch(`http://127.0.0.1:8000/api-comercio/eliminar_producto/?id_producto=${idProducto}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        // Producto eliminado con éxito, puedes actualizar el estado o recargar la lista de productos

                        // Realizar una nueva solicitud para obtener los datos actualizados
                        const nuevaRespuesta = await fetch('http://127.0.0.1:8000/api-comercio/mostrar_producto');
                        if (nuevaRespuesta.ok) {
                            const nuevosDatos = await nuevaRespuesta.json();
                            setData(nuevosDatos); // Actualizar el estado con los nuevos datos
                        } else {
                            throw new Error('Error al obtener los datos actualizados');
                        }
                    } else {
                        throw new Error('Error al eliminar el producto');
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
            alert('Producto eliminado. Tienes 5 segundos para deshacer la acción.');
            
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
            <h1>Listado de Productos</h1>
            <ul className='ul-productos'>
                {data.map((item) => (
                    <li className='li-producto' key={item.idproducto}>
                        <p>{item.nombre}</p>
                        <p>{item.precio}</p>
                        <p>{item.descripcion}</p>
                        <p>{item.imagen}</p>
                        <button className='editar' onClick={() => handleEditar(item)}>Editar</button>
                         {/* Botón para eliminar el producto */}
                         <button className='eliminar' onClick={() => handleEliminar(item.idproducto)}>Eliminar</button>
                    </li>
                ))}
            </ul>

            {productoAEditar && (
                <div>
                    <h2>Editar Producto</h2>
                    <form>
                        <input
                            type="text"
                            name="nombre"
                            value={nuevosDatos.nombre || productoAEditar.nombre}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                        />
                        <input
                            type="text"
                            name="precio"
                            value={nuevosDatos.precio || productoAEditar.precio}
                            onChange={handleInputChange}
                            placeholder="Precio"
                        />
                        <input
                            type="text"
                            name="descripcion"
                            value={nuevosDatos.descripcion || productoAEditar.descripcion}
                            onChange={handleInputChange}
                            placeholder="Descripción"
                        />
                        <input
                            type="text"
                            name="imagen"
                            value={nuevosDatos.imagen || productoAEditar.imagen}
                            onChange={handleInputChange}
                            placeholder="Imagen"
                        />
                        <button type="button" onClick={handleGuardarCambios}>Guardar Cambios</button>
                    </form>
                </div>
            )}
        </>
    );
};
