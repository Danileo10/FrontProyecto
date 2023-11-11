import { useEffect, useState } from 'react';
import './ProductosListado.scss'
import close from "../../../../public/x.svg"
import edit_but from '../../../../public/edit.svg'
import trash_but from '../../../../public/trashb.svg'
import agregar from '../../../../public/boton-agregar.png'
import Swal from 'sweetalert2'
import { useAuth } from '../../../hooks';
import axios from 'axios';
import { Link } from 'react-router-dom';


export const ProductosListado = () => {

    const [productos, setProductos] = useState([]);
    const { auth } = useAuth();

    const [productoAEditar, setProductoAEditar] = useState(null); // Estado para el producto que se está editando
    const [nuevosDatos, setNuevosDatos] = useState({}); // Estado para los nuevos datos del producto
    const [mostrarModal, setMostrarModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [busqueda, setBusqueda] = useState('')
    const productosFiltrados = productos.filter((producto) => {
        return producto.nombre.toLowerCase().includes(busqueda.toLowerCase());
    });
    const productosPorPagina = 6;
    const indiceInicial = (currentPage - 1) * productosPorPagina;
    const indiceFinal = currentPage * productosPorPagina;
    const productosPaginaActual = productosFiltrados.slice(indiceInicial, indiceFinal);

    const handleBusqueda = (event) => {
        const searchTerm = event.target.value;
        setBusqueda(searchTerm);
        setCurrentPage(1); // Reiniciar la página a la primera cuando se cambia la búsqueda.
    };


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
            imagen: null,
        });
        setMostrarModal(true);
    };

    const handleImageChange = (event) => {
        const imagen = event.target.files[0];
        setNuevosDatos({ ...nuevosDatos, imagen: imagen || null }); // Almacena la imagen en el estado o nulo si no hay imagen
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
        const { nombre, precio, descripcion, imagen } = nuevosDatos;

        // Validar los datos
        if (!validarNombre(nombre) || !validarPrecio(precio) || !validarDescripcion(descripcion) ) {
            // La validación falló, no envíes los datos al servidor
            return;
        }
        try {

            const empleado = auth.me.idcliente;
            const formData = new FormData();
            formData.append('nombre', nuevosDatos.nombre);
            formData.append('precio', nuevosDatos.precio);
            formData.append('descripcion', nuevosDatos.descripcion);
            if (imagen) {
                formData.append('imagen', imagen);
            }

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
                Swal.fire({
                    position: "center ",
                    icon: "success",
                    title: "Producto editado con éxito!",
                    showConfirmButton: false,
                    timer: 1000
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("I was closed by the timer");

                    }
                });
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
    const validarNombre = (nombre) => {
        if (!nombre || nombre.trim() === '') {
            Swal.fire({
                position: "center ",
                icon: "error",
                title: "El nombre es obligatorio",
                showConfirmButton: false,
                timer: 1000
              })
            return false;
        }
        return true;
    };

    const validarImagen = (imagen) => {
        if (!imagen) {
            Swal.fire({
                position: "center ",
                icon: "error",
                title: "Debes seleccionar una imagen",
                showConfirmButton: false,
                timer: 1000
              })
            return false;
        }

        return true;
    };

    const validarPrecio = (precio) => {
        const numeroPrecio = parseFloat(precio);
        if (isNaN(numeroPrecio) || numeroPrecio <= 0) {
            Swal.fire({
                position: "center ",
                icon: "error",
                title: "El precio debe ser un número positivo y es obligatorio",
                showConfirmButton: false,
                timer: 1000
              })
            return false;
        }
        return true;
    };

    const validarDescripcion = (descripcion) => {
        if (!descripcion || descripcion.trim() === '') {
            Swal.fire({
                position: "center ",
                icon: "error",
                title: "La descripción es obligatoria",
                showConfirmButton: false,
                timer: 1000
              })
            return false;
        }
        return true;
    };


  

    const handleEliminar = async (idProducto) => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "No podrás revertirlo",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Borrar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Obtener el ID del empleado desde el contexto de autenticación
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
                        Swal.fire({
                            title: "Eliminado",
                            text: "Producto eliminado",
                            icon: "success"
                        }); // Mostrar un mensaje de éxito
                    } else {
                        throw new Error('Error al eliminar el producto');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
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
        <div className=''>
            <h2 className="titulo-mascotas">Listado de Productos</h2>
            <div className='ajustar'>
                <Link className="botonCrearProducto" to={"/admin/productos/crear"}>
                    <button className="button_edit ">
                        <img src={agregar} alt="" />
                    </button>
                </Link>
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={busqueda}
                    onChange={handleBusqueda}
                />
            </div>
            <ul className='productosT container'>
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
                        <label htmlFor="">Nombre</label>
                        <input
                            className='input-1'
                            type="text"
                            name="nombre"
                            value={(productoAEditar && nuevosDatos.nombre) || ''}
                            onChange={handleInputChange}
                            placeholder="Nombre"
                        />
                        <label htmlFor="">Precio</label>
                        <input
                            className='input-1'
                            type="text"
                            name="precio"
                            value={(productoAEditar && nuevosDatos.precio) || ''}
                            onChange={handleInputChange}
                            placeholder="Precio"
                        />
                        <label htmlFor="">Descripción</label>
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
