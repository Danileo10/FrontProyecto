import  { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const ClientesEditar = () => {
  const [data, setData] = useState([]);
  const [productoAEditar, setProductoAEditar] = useState(null); // Estado para el producto que se está editando
  const [nuevosDatos, setNuevosDatos] = useState({});


    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        email: '',
        direccion: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/cliente_esp/?=${id_cliente}`);
                if (!response.ok) {
                    throw new Error('No hay datos');
                }
                const jsonData = await response.json();
                setCliente(jsonData);
            } catch (error) {
                console.error('Error');
            }
        };
        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCliente({ ...cliente, [name]: value });
    };

    const handleGuardarCambios = async () => {
      try {
          const response = await fetch(`http://127.0.0.1:8000/api/modificar_cliente/${idcliente}`, {
              method: 'PATCH', // Utiliza 'PATCH' para actualizar el cliente
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(cliente),
          });
  
          if (response.ok) {
              console.log('Cliente editado con éxito');
              navigate('/listado-clientes'); // Redirige a la lista de clientes después de la edición
          } else {
              throw new Error('Error al editar el cliente');
          }
      } catch (error) {
          console.error(error);
      }
  };
  

    return (
        <>
            <h1>Editar Cliente</h1>
            <form>
                <input
                    type="text"
                    name="nombre"
                    value={cliente.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                />
                <input
                    type="text"
                    name="apellido"
                    value={cliente.apellido}
                    onChange={handleInputChange}
                    placeholder="Apellido"
                />
                <input
                    type="text"
                    name="email"
                    value={cliente.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                />
                <input
                    type="text"
                    name="direccion"
                    value={cliente.direccion}
                    onChange={handleInputChange}
                    placeholder="Dirección"
                />
                <button type="button" onClick={handleGuardarCambios}>
                    Guardar Cambios
                </button>
            </form>
        </>
    );
};
