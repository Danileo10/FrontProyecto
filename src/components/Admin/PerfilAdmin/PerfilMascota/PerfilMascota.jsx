import { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks';
import cerrar from '../../../../../public/x.svg'
import edit_but from '../../../../../public/edit.svg'
import trash_but from '../../../../../public/trashb.svg'
import Swal from 'sweetalert2'
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
    const fechaActual = new Date();
    fechaActual.setFullYear(fechaActual.getFullYear() - 20);



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
            fecha_defun: mascota.fecha_defun || null,

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
            !nuevosDatos.descripcion 
        ) {
            Swal.fire({
                position: "center ",
                icon: "error",
                title: "Todos los campos son obligatorios",
                showConfirmButton: false,
                timer: 3000
              })
        }

        console.log(nuevosDatos)

        const fechaDefuncion = new Date(nuevosDatos.fecha_defun); // Convertir la fecha de defunción a un objeto Date

        if (fechaDefuncion < fechaActual) {
            Swal.fire({
                position: "center ",
                icon: "error",
                title: "La fecha de defunción tiene como rango la fecha actual hasta 20 años atras",
                showConfirmButton: false,
                timer: 3000
              })
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
                Swal.fire({
                    position: "center ",
                    icon: "success",
                    title: "Mascota editada con éxito!",
                    showConfirmButton: false,
                    timer: 3000
                  }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                      console.log("I was closed by the timer");
                      
                    }
                  });

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
        // Preguntar al usuario si realmente desea eliminar el producto
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
                            setMascotas(nuevosDatos);
                            Swal.fire({
                                title: "Eliminado",
                                text: "Mascota eliminada",
                                icon: "success"
                            }); // Actualizar el estado con los nuevos datos
                        } else {
                            throw new Error('Error al obtener los datos actualizados');
                        }
                    } else {
                        throw new Error('Error al eliminar el cliente');
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        });
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


