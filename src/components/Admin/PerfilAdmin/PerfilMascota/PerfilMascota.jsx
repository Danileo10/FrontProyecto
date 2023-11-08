import { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks';
import cerrar from '../../../../../public/x.svg'
import edit_but from '../../../../../public/edit.svg'
import trash_but from '../../../../../public/trashb.svg'
import './PerfilMascota.scss';


export const PerfilMascota = () => {
    const [mascotas, setMascotas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const mascotasPorPagina = 6;
    const { auth } = useAuth();
    const [mascotaAEditar, setMascotaAEditar] = useState(null);
    const [nuevosDatos, setNuevosDatos] = useState({
        nombre: '',
        fecha_nacim: '',
        raza: '',
        especie: '',
        descripcion: '',
        fecha_defun: '',

    });

    const indiceInicial = (currentPage - 1) * mascotasPorPagina;
    const indiceFinal = currentPage * mascotasPorPagina;
    const mascotasPaginaActual = mascotas.slice(indiceInicial, indiceFinal);


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

    const handleEditar = (mascota) => {
        setMascotaAEditar(mascota);
        setNuevosDatos({
            nombre: mascota.nombre || '',
            fecha_nacim: mascota.fecha_nacim || '',
            raza: mascota.raza || '',
            especie: mascota.especie || '',
            descripcion: mascota.descripcion || '',
            fecha_defun: mascota.fecha_defun || '',

        });
        setMostrarModal(true);
    };

    const fechaLimite = new Date(); // Obtener la fecha actual
    fechaLimite.setFullYear(fechaLimite.getFullYear() - 20); // Restar 20 años a la fecha actual


    const handleGuardarCambios = async (e) => {
        e.preventDefault()
        if (
            !nuevosDatos.nombre ||
            !nuevosDatos.fecha_nacim ||
            !nuevosDatos.raza ||
            !nuevosDatos.especie ||
            !nuevosDatos.descripcion ||
            !nuevosDatos.fecha_defun
        ) {
            alert('Todos los campos son obligatorios.');
            return;
        }

        const fechaNacimiento = new Date(nuevosDatos.fecha_nacim);
        if (fechaNacimiento > fechaLimite) {
            alert('La fecha de nacimiento debe ser al menos 20 años atrás desde la fecha actual.');
            return;
        }
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/modificar_mascota/?id_mascota=${mascotaAEditar.idmascota}`,
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
                console.log('mascota editada con éxito');

                const nuevaRespuesta = await fetch(`http://127.0.0.1:8000/api/mascota_esp/?id_cliente=${auth.me.idcliente}`);
                if (nuevaRespuesta.ok) {
                    const nuevosDatos = await nuevaRespuesta.json();
                    setMascotas(nuevosDatos);
                } else {
                    throw new Error('Error al obtener los datos actualizados');
                }
                setMascotaAEditar(null);
                setMostrarModal(false);
            } else {
                throw new Error('Error al editar las mascota');
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
        const totalPages = Math.ceil(mascotas.length / mascotasPorPagina);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            console.log(`Página actual: ${currentPage + 1}`);
        }
    };



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
        <div className="content3">
            <h2 className="titulo-mascotas">Tus mascotas</h2>
            <ul className="ul-mascotas">
                {mascotasPaginaActual.map((mascota) => (
                    <li className="li-mascotas c" key={mascota.idmascota}>
                        <img className="foto_mascota" src={`http://127.0.0.1:8000${mascota.imagen}`} alt="mascota" />
                        <p>Nombre: {mascota.nombre}</p>
                        <p>Fecha de nacimiento: {mascota.fecha_nacim}</p>
                        <p>Raza: {mascota.raza}</p>
                        <p>Descripción</p>
                        <p>{mascota.descripcion}</p>
                        <p>Especie</p>
                        <p>{mascota.especie}</p>
                        <p>Fecha de defunción: {mascota.fecha_defun}</p>
                        <div className='contentBtn'>
                            <button className='button_edit' onClick={() => handleEditar(mascota)}>
                                <img src={edit_but} alt="Editar Mascota" />
                            </button>
                            <button className="eliminar-button_mas" onClick={() => handleEliminar(mascota.idmascota)}>
                                <img src={trash_but} alt="Eliminar" />
                            </button>
                        </div>
                        
                    </li>
                ))}
            </ul>

            <div className="paginacion">
                <span>Página {currentPage} de {Math.ceil(mascotas.length / mascotasPorPagina)}</span>
                <button className="btn-16" onClick={handlePaginaAnterior} disabled={currentPage === 1}>Anterior</button>
                <button className="btn-16" onClick={handlePaginaSiguiente} disabled={currentPage === Math.ceil(mascotas.length / mascotas)}>Siguiente</button>
            </div>
            {mostrarModal && mascotaAEditar && (    
                <div className='modal-background'>
                    <div className='modal-content'>
                        <h2 className='titulo2'>Editar Mascota</h2>
                        <form>
                            <div className='input-group'>
                                <label htmlFor="">Nombre</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={nuevosDatos.nombre !== undefined ? nuevosDatos.nombre : mascotaAEditar.nombre}
                                    onChange={handleInputChange}
                                    placeholder="Nombre de la mascota"
                                />
                                <label htmlFor="">Fecha de nacimiento</label>
                                <input
                                    type="date"
                                    name="fecha_nacim"
                                    value={nuevosDatos.fecha_nacim !== undefined ? nuevosDatos.fecha_nacim : mascotaAEditar.fecha_nacim}
                                    onChange={handleInputChange}
                                    placeholder="Fecha de nacimiento"
                                />
                                <label htmlFor="">Raza</label>
                                <input
                                    type="text"
                                    name="raza"
                                    value={nuevosDatos.raza !== undefined ? nuevosDatos.raza : mascotaAEditar.raza}
                                    onChange={handleInputChange}
                                    placeholder="raza"
                                />
                                <label htmlFor="">Descripción</label>
                                <textarea
                                    type="text"
                                    name="descripcion"
                                    value={nuevosDatos.descripcion !== undefined ? nuevosDatos.descripcion : mascotaAEditar.descripcion}
                                    onChange={handleInputChange}
                                    className='textTarea'
                                    placeholder="Descripcion"
                                />
                                <label htmlFor="">Fecha de defución</label>
                                <input
                                    type="date"
                                    name="fecha_defun"
                                    value={nuevosDatos.fecha_defun !== undefined ? nuevosDatos.fecha_defun : mascotaAEditar.fecha_defun}
                                    onChange={handleInputChange}
                                    placeholder="fecha de defucion"
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


