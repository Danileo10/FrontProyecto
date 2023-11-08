import { useEffect, useState } from 'react';
import './ProductosListado.scss'
import close from "../../../../public/x.svg"
import edit_but from '../../../../public/edit.svg'
import trash_but from '../../../../public/trashb.svg'
import { useAuth } from '../../../hooks';
import axios from 'axios';


export const ProductosListado = () => {

    const [productos, setProductos] = useState([]);
    const { auth } = useAuth();

    const [productoAEditar, setProductoAEditar] = useState(null); // Estado para el producto que se está editando
    const [nuevosDatos, setNuevosDatos] = useState({}); // Estado para los nuevos datos del producto
    const [mostrarModal, setMostrarModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productosPorPagina = 6;
    const indiceInicial = (currentPage - 1) * productosPorPagina;
    const indiceFinal = currentPage * productosPorPagina;
    const productosPaginaActual = productos.slice(indiceInicial, indiceFinal);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api-comercio/mostrar_producto');
                if (!response.ok) {
                    throw new Error('No hay datos');
                }
                const jsonData = await response.json();
                setProductos(jsonData);

                console.log(jsonData)
            } catch (error) {
                console.error('Error');
            }
        };
        fetchData();
    }, []);

    // Función para manejar el clic en el botón "Editar"
    const handleEditar = (producto) => {
        setProductoAEditar(producto);
        setNuevosDatos({
            nombre: producto.nombre || '',
            precio: producto.precio || '',
            descripcion: producto.descripcion || '',
            imagen: producto.imagen || '',
        });
        setMostrarModal(true);
    };


    // Función para manejar los cambios en los campos de edición
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevosDatos({ ...nuevosDatos, [name]: value });
    };

    // Función para enviar la solicitud PATCH al servidor
    // Función para enviar la solicitud PATCH al servidor
    const handleGuardarCambios = async (e) => {
        e.preventDefault();
        try {

            const empleado = auth.me.idcliente;
            const formData = new FormData();
            formData.append('nombre', nuevosDatos.nombre);
            formData.append('precio', nuevosDatos.precio);
            formData.append('descripcion', nuevosDatos.descripcion);
            formData.append('imagen', nuevosDatos.imagen); // Agrega la imagen al formData

            const datosConId = {
                ...nuevosDatos
            };

            console.log(datosConId)
            // Realizar la solicitud PATCH con los nuevos datos
            const response = await axios.patch(`http://127.0.0.1:8000/api-comercio/modificar_producto/?id_producto=${productoAEditar.idproducto}&empleado=${empleado}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Configura el tipo de contenido como multipart/form-data
                },
            });
            console.log(response)
            if (response.status == 200) {
                // Producto editado con éxito, puedes actualizar el estado o recargar la lista de productos
                console.log('Producto editado con éxito');
                // Actualizar la lista de productos o realizar otras acciones necesarias

                // Realizar una nueva solicitud para obtener los datos actualizados
                const nuevaRespuesta = await fetch('http://127.0.0.1:8000/api-comercio/mostrar_producto');
                if (nuevaRespuesta.ok) {
                    const nuevosDatos = await nuevaRespuesta.json();
                    setProductos(nuevosDatos); // Actualizar el estado con los nuevos datos
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

    const handleImageChange = (event) => {
        const imagen = event.target.files[0];
        setNuevosDatos({ ...nuevosDatos, imagen }); // Almacena la imagen en el estado
    };

    const handleEliminar = async (idProducto) => {
        try {
            // Preguntar al usuario si realmente desea eliminar el producto
            const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este producto?');

            if (confirmacion) {
                // Esperar 5 segundos antes de eliminar el producto definitivamente
                const timer = setTimeout(async () => {
                    try {
                        const empleado = auth.me.idcliente;
                        // Realizar la solicitud DELETE al servidor
                        const response = await fetch(`http://127.0.0.1:8000/api-comercio/eliminar_producto/?id_producto=${idProducto}&empleado=${empleado}`, {
                            method: 'DELETE',
                        });

                        if (response.ok) {
                            // Producto eliminado con éxito, puedes actualizar el estado o recargar la lista de productos

                            // Realizar una nueva solicitud para obtener los datos actualizados
                            const nuevaRespuesta = await fetch('http://127.0.0.1:8000/api-comercio/mostrar_producto');
                            if (nuevaRespuesta.ok) {
                                const nuevosDatos = await nuevaRespuesta.json();
                                setProductos(nuevosDatos); // Actualizar el estado con los nuevos datos
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

    const handlePaginaAnterior = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            console.log(`Página actual: ${currentPage - 1}`);
        }
    };
    

    const handlePaginaSiguiente = () => {
        const totalPages = Math.ceil(productos.length / productosPorPagina);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            console.log(`Página actual: ${currentPage + 1}`);
        }
    };
    


    return (
        <div className='content3'>
            <h2 className="titulo-mascotas">Listado de Productos</h2>
            <ul className='productos'>
                {productosPaginaActual.map((item) => (
                    <li key={item.idproducto} className='c' >
                        <img className="foto_mascota" src={`http://127.0.0.1:8000${item.imagen}`} alt="producto" />
                        <div className="product-info">
                        <h2 className="product-title">{item.nombre}</h2>
                        <p className="product-price">
                                    {new Intl.NumberFormat("es-CL", {
                                        style: "currency",
                                        currency: "CLP",
                                        minimumFractionDigits: 0,
                                    }).format(item.precio)}
                        </p>
                        <p className="product-description">{item.descripcion}</p>
                        </div>               
                        <div className='contentBtn'>
                            <button className='button_edit' onClick={() => handleEditar(item)}>
                                <img src={edit_but} alt="Editar" />
                            </button>
                            <button className='eliminar-button_mas' onClick={() => handleEliminar(item.idproducto)}>
                                <img src={trash_but} alt="Eliminar" />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="paginacion">
                <span>Página {currentPage} de {Math.ceil(productos.length / productosPorPagina)}</span>
                <button className="btn-16" onClick={handlePaginaAnterior} disabled={currentPage === 1}>Anterior</button>
                <button className="btn-16" onClick={handlePaginaSiguiente} disabled={currentPage === Math.ceil(productos.length / productos)}>Siguiente</button>
            </div>

            {mostrarModal && productoAEditar && (
                <div className='modal-pro'>
                    <form className='form-dos'>
                        <h2 className='title'>Editar Producto</h2>
                        <input
                            className='input-1'
                            type="text"
                            name="nombre"
                            value={(productoAEditar && nuevosDatos.nombre) || ''}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                        />
                        <input
                            className='input-1'
                            type="text"
                            name="precio"
                            value={(productoAEditar && nuevosDatos.precio) || ''}
                            onChange={handleInputChange}
                            placeholder="Precio"
                        />
                        <input
                            className='input-1'
                            type="text"
                            name="descripcion"
                            value={(productoAEditar && nuevosDatos.descripcion) || ''}
                            onChange={handleInputChange}
                            placeholder="Descripción"
                        />
                        <input
                            className='input-1'
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            placeholder="Imagen"
                        />
                        <button className='button-guardar' type="button-g" onClick={handleGuardarCambios}>Guardar Cambios</button>
                        <button className='button-close' type="button-close" onClick={() => setMostrarModal(false)}>
                            <img src={close} alt="close" className='close' />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};
