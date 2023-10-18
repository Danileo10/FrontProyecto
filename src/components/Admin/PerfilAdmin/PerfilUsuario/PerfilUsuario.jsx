import { useAuth } from '../../../../hooks'
import { useState } from 'react';

export const PerfilUsuario = () => {
  const { auth } = useAuth();
  const [respuesta, setRespuesta] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [datosEditados, setDatosEditados] = useState({
    nombre: auth.me.nombre,
    apellido: auth.me.apellido,
    email: auth.me.email,
    telefono: auth.me.telefono,
    direccion: auth.me.direccion
    
  });
  
  const habilitarEdicion = () => {
    setModoEdicion(true);
  };

  const cancelarEdicion = () => {
    setModoEdicion(false);
    // Restaura los datos originales del usuario si se cancela la edición
    setDatosEditados({
      nombre: auth.me.nombre,
      apellido: auth.me.apellido,
      email: auth.me.email,
      telefono: auth.me.telefono,
      direccion: auth.me.direccion,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDatosEditados((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 

  const guardarCambios = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/modificar_cliente/?id_cliente=${auth.me.idcliente}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosEditados),
      });

      if (response.ok) {
        console.log('Datos actualizados con éxito');
        // Desactivar el modo de edición después de guardar los cambios
        setModoEdicion(false);
        // Actualizar el estado global del usuario si es necesario
      } else {
        throw new Error('Error al guardar los cambios');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerificarCorreo = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/verificar_correo/?email=${auth.me.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Puedes incluir otros encabezados si es necesario
        },
        // Puedes enviar datos en el cuerpo de la solicitud si es necesario
        // body: JSON.stringify({ key: 'value' }),
      });
     
      const data = await response.json();
      setRespuesta(data); // Almacena la respuesta en el estado para mostrarla en la interfaz
    } catch (error) {
      console.error('Error:', error);
    }
  };
 
  

  return (
    <>

      <h1>Perfil</h1>
      <p>{auth.me.nombre}</p>
      <p>{auth.me.apellido}</p>
      <p>{auth.me.email}</p>
      <p>{auth.me.telefono}</p>
      <p>{auth.me.direccion}</p>
  


      {modoEdicion ? (
        <div>
          <input
            type="text"
            name="nombre"
            value={datosEditados.nombre}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="apellido"
            value={datosEditados.apellido}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="email"
            value={datosEditados.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="telefono"
            value={datosEditados.telefono}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="direccion"
            value={datosEditados.direccion}
            onChange={handleInputChange}
          />
          {/* Agregar campos de input para otros datos que se deseen editar */}
          <button onClick={guardarCambios}>Guardar Cambios</button>
          <button onClick={cancelarEdicion}>Cancelar</button>
        </div>
      ) : (
        <button onClick={habilitarEdicion}>Editar</button>
        
      )}

      {!auth.me.is_verified && <button onClick={handleVerificarCorreo}>Verificar Correo</button>}
      {respuesta && <div>Respuesta del servidor: {JSON.stringify(respuesta)}</div>}
    </>
  )
}

