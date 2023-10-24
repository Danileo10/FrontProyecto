import { useAuth } from '../../../../hooks';
import { useState } from 'react';
import './PerfilUsuario.scss'

export const PerfilUsuario = () => {
  const { auth } = useAuth();
  const [modoEdicion, setModoEdicion] = useState(false);
  const [datosEditados, setDatosEditados] = useState({
    nombre: auth.me.nombre,
    apellido: auth.me.apellido,
    email: auth.me.email,
    telefono: auth.me.telefono,
    direccion: auth.me.direccion,
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
      const response = await fetch(
        `http://127.0.0.1:8000/api/modificar_cliente/?id_cliente=${auth.me.idcliente}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosEditados),
        }
      );

      if (response.ok) {
        console.log('Datos actualizados con éxito');
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

      <div className="contact-info">  
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
    </div>
  );
};
