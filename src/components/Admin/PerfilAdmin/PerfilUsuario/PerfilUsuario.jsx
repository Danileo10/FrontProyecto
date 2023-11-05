import { useAuth } from '../../../../hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PerfilUsuario.scss'

export const PerfilUsuario = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
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
        console.log(response)
        console.log('Usuario verificado con éxito');
        // Realiza cualquier acción adicional necesaria después de la verificación
      } else {
        // La solicitud POST no fue exitosa
        console.error('Error al verificar el usuario');
      }
    } catch (error) {
      // Captura errores en la solicitud POST
      console.error('Error en la solicitud POST:', error);
    }
  };
  

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

  const guardarCambios = async () => {
    try {

      const formData = new FormData();

      // Agregar campos de texto
      formData.append("nombre", datosEditados.nombre);
      formData.append("apellido", datosEditados.apellido);
      formData.append("email", datosEditados.email);
      formData.append("telefono", datosEditados.telefono);
      formData.append("direccion", datosEditados.direccion);

      // Agregar archivo de imagen (si existe)
      if (datosEditados.imagen) {
        formData.append("imagen", datosEditados.imagen);
      }

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
        window.location.reload();
        setModoEdicion(false);
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
                onChange={handleInputChange}
                accept="image/*" // Permite solo archivos de imagen
              />
            ) : (
              <img className='foto_perfil' src={`http://127.0.0.1:8000${datosEditados.imagen}`} alt="imagen de perfil" />
            )}
          </div>
        </div>
        <div className='lado_derechoPerfil'>
          <div className="contact-infoderecha">
            <div className="section">
              <p className="section-title">Nombre</p>
              {modoEdicion ? (
                <input
                  type="text"
                  name="nombre"
                  value={datosEditados.nombre}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{datosEditados.nombre}</p>
              )}

            </div>



            <div className="section">
              <p className="section-title">Apellido</p>
              {modoEdicion ? (
                <input
                  type="text"
                  name="apellido"
                  value={datosEditados.apellido}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{datosEditados.apellido}</p>
              )}
            </div>

            <div className="section">
              <p className="section-title">Email</p>
              {modoEdicion ? (
                <input
                  type="text"
                  name="email"
                  value={datosEditados.email}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{datosEditados.email}</p>
              )}
            </div>

            <div className="section">
              <p className="section-title">Teléfono</p>
              {modoEdicion ? (
                <input
                  type="text"
                  name="telefono"
                  value={datosEditados.telefono}
                  onChange={handleInputChange}
                />
              ) : (
                <p>{datosEditados.telefono}</p>
              )}
            </div>

            <div className="section">
              <p className="section-title">Dirección</p>
              {modoEdicion ? (
                <input
                  type="text"
                  name="direccion"
                  value={datosEditados.direccion}
                  onChange={handleInputChange}
                />

              ) : (
                <p>{datosEditados.direccion}</p>

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
        <button className="button" onClick={habilitarEdicion}>
          Editar
        </button>
        
        
        
      )}
       <button className="button" onClick={verificarUsuario}>
          Verificarse
        </button>
    </div>
  );
};
