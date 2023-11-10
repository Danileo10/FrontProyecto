import { useAuth } from '../../../../hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import edit_but from '../../../../../public/edit.svg'
import dog_but from '../../../../../public/dog.svg'
import axios from 'axios';
import './PerfilUsuario.scss'

export const PerfilUsuario = () => {
  const { auth } = useAuth();
  const [newFoto, setNewfoto] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [datosEditados, setDatosEditados] = useState({
    nombre: auth.me.nombre,
    apellido: auth.me.apellido,
    email: auth.me.email,
    telefono: auth.me.telefono,
    direccion: auth.me.direccion,
    imagen: auth.me.imagen
  });

  const habilitarEdicion = () => {
    setModoEdicion(true);
  };

  const cancelarEdicion = () => {
    setModoEdicion(false);
    setDatosEditados({
      nombre: auth.me.nombre,
      apellido: auth.me.apellido,
      email: auth.me.email,
      telefono: auth.me.telefono,
      direccion: auth.me.direccion,
      imagen: auth.me.imagen,
    });
  };

  const verificarUsuario = async () => {
    try {
      const response = await axios.post(`http://127.0.0.1:8000/api/verificar_correo/?email=${auth.me.email}`, {
        // Puedes enviar cualquier dato adicional necesario en el cuerpo de la solicitud
      });

      if (response.status === 200) {
        Swal.fire({
          position: "center ",
          icon: "success",
          title: "Revisa tu correo el correo de verificación.",
          showConfirmButton: false,
          timer: 1000
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");

          }
        });// Realiza cualquier acción adicional necesaria después de la verificación
      } else {
        // La solicitud POST no fue exitosa
        console.error('Error al verificar el usuario');
      }
    } catch (error) {
      // Captura errores en la solicitud POST
      console.error('Error en la solicitud POST:', error);
    }
  };

  const handleFoto = (e) => {
    setNewfoto(e.target.files[0]);
  }


  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setDatosEditados((prevData) => ({
        ...prevData,
        [name]: files[0], // Almacena el archivo de imagen en el estado
      }));
    } else {
      setDatosEditados((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const validarCampos = () => {
    if (!datosEditados.nombre || !datosEditados.apellido || !datosEditados.email || !datosEditados.telefono || !datosEditados.direccion) {
      // Muestra un mensaje de error o realiza alguna acción para indicar que los campos son obligatorios
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios',
      });
      return false;
    }
    return true;
  };


  const guardarCambios = async () => {
    if (!validarCampos()) {
      return;
    }
    try {

      const formData = new FormData();

      // Agregar campos de texto
      formData.append("nombre", datosEditados.nombre);
      formData.append("apellido", datosEditados.apellido);
      formData.append("email", datosEditados.email);
      formData.append("telefono", datosEditados.telefono);
      formData.append("direccion", datosEditados.direccion);
      console.log(datosEditados.imagen)
      // Agregar archivo de imagen (si existe)
      if (newFoto !== null) {
        formData.append("imagen", newFoto);
      }
      console.log(formData)

      const response = await axios.patch(`http://127.0.0.1:8000/api/modificar_cliente/?id_cliente=${auth.me.idcliente}`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Configura el tipo de contenido como multipart/form-data
          },
        }


      );
      console.log(response.data)
      if (response.status == 200) {
        console.log('Datos actualizados con éxito');
        Swal.fire({
          position: "center ",
          icon: "success",
          title: "Perfil editado con exito.",
          showConfirmButton: false,
          timer: 1000
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            window.location.reload();
            setModoEdicion(false);
          }
        });


        // Actualizar el estado global del usuario si es necesario
      } else {
        throw new Error('Error al guardar los cambios');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>PERFIL</h1>
      </div>
      <div className='contact-infoizquierda'>
        <div className='lado_izquierdoPerfil'>
          <div className="section foto_perfil">
            {modoEdicion ? (
              <input
                type="file"
                name="imagen"
                onChange={handleFoto}
                accept="image/*" // Permite solo archivos de imagen
              />
            ) : (
              <img className='foto_perfil' src={`http://127.0.0.1:8000${datosEditados.imagen}`} alt="imagen de perfil" />
            )}
          </div>
        </div>
        <div className='botones-perfil'>



        </div>
        <div className='lado_derechoPerfil'>
          <div className="contact-infoderecha">
            <div className="section">
              <h2 className="section-title">Nombre</h2>
              {modoEdicion ? (
                <input
                  type="text"
                  name="nombre"
                  value={datosEditados.nombre}
                  onChange={handleInputChange}
                />
              ) : (
                <p className='p'>{datosEditados.nombre}</p>
              )}

              <h2 className="section-title">Apellido</h2>
              {modoEdicion ? (
                <input
                  type="text"
                  name="apellido"
                  value={datosEditados.apellido}
                  onChange={handleInputChange}
                />
              ) : (
                <p className='p'>{datosEditados.apellido}</p>
              )}

              <h2 className="section-title">Email</h2>
              {modoEdicion ? (
                <input
                  type="text"
                  name="email"
                  value={datosEditados.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p className='p'>{datosEditados.email}</p>
              )}

              <h2 className="section-title">Teléfono</h2>
              {modoEdicion ? (
                <input
                  type="text"
                  name="telefono"
                  value={datosEditados.telefono}
                  onChange={handleInputChange}
                />
              ) : (
                <p className='p'>{datosEditados.telefono}</p>
              )}
              <h2 className="section-title">Dirección</h2>
              {modoEdicion ? (
                <input
                  type="text"
                  name="direccion"
                  value={datosEditados.direccion}
                  onChange={handleInputChange}
                />

              ) : (
                <p className='p'>{datosEditados.direccion}</p>

              )}
            </div>
          </div>
        </div>
      </div>



      {modoEdicion ? (
        <div className="button-group">
          <button className="button" onClick={guardarCambios}>
            Guardar Cambios
          </button>
          <button className="button" onClick={cancelarEdicion}>
            Cancelar
          </button>
        </div>
      ) : (
        <button className="button " onClick={habilitarEdicion}>
          Editar
        </button>




      )}




  {!auth.me.is_verified &&
    <button className="button" onClick={verificarUsuario}>
          Verificarse
        </button>
  }
        

<Link to="/client/mascotas"><button className="button_edit_prof">
  <img src={dog_but} alt="Editar Mascota" />
</button></Link>



    </div >

  );
};
