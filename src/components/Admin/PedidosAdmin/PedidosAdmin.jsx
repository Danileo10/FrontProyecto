import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks';
import cerrar from "../../../../public/x.svg"

export const PedidosAdmin = () => {
  const { auth } = useAuth()
  const [pedidos, setPedidos] = useState([]);
  const [pedidoDetallado, setPedidoDetallado] = useState([]);
  const [pedidoAEditar, setPedidoAEditar] = useState(null);
  const [nuevosDatos, setNuevosDatos] = useState({
    fecha: '',
    estado: '',
    tipo_entrega: '',
    total: '',
  });

  const [mostrarModal, setMostrarModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevosDatos((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const confirmarEliminarPedido = (idpedido) => {
    const confirmacion = window.confirm("¿Estás seguro de que quieres eliminar este pedido?");
    if (confirmacion) {
      eliminarPedido(idpedido);
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch("http://127.0.0.1:8000/api-comercio/pedidos/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPedidos(data);
    } catch (error) {
      console.error("Error al obtener los datos del servidor: ", error);
    }
  }

  const handleEditar = (pedido) => {
    setPedidoAEditar(pedido);
    setNuevosDatos({
      fecha: pedido.fecha || '',
      estado: pedido.estado || '',
      tipo_entrega: pedido.tipo_entrega || '',
      total: pedido.total || '',
    });
    setMostrarModal(true);
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault();
    if (!nuevosDatos.fecha || !nuevosDatos.estado || !nuevosDatos.tipo_entrega || !nuevosDatos.total) {
      console.error('Todos los campos son obligatorios');
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api-comercio/modificar_pedido/?id_pedido=${pedidoAEditar.idpedido}&empleado=${auth.me.idcliente}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(nuevosDatos),
        }
      );
      if (response.ok) {
        console.log('Pedido editado con éxito');

        const nuevaRespuesta = await fetch('http://127.0.0.1:8000/api-comercio/pedidos/');
        if (nuevaRespuesta.ok) {
          const nuevosDatos = await nuevaRespuesta.json();
          setPedidos(nuevosDatos);
        } else {
          throw new Error('Error al obtener los datos actualizados');
        }
        setPedidoAEditar(null);
        setMostrarModal(false);
      } else {
        throw new Error('Error al editar el producto');
      }


    } catch (error) {
      console.error(error);
    }
  };

  async function eliminarPedido(idpedido) {
    try {
      await fetch(`http://127.0.0.1:8000/api-comercio/eliminar_pedido/?id_pedido=${idpedido}&empleado=${auth.me.idcliente}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Refresca la lista de pedidos después de eliminar uno
      fetchData();
      console.log("Pedido eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar el pedido: ", error);
    }
  }


  async function fetchPedidoDetallado(idpedido) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api-comercio/pedido_extend/?id_pedido=${idpedido}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setPedidoDetallado(data);
    } catch (error) {
      console.error("Error al obtener el pedido detallado: ", error);
    }
  }

  return (
    <>
      <h1>Lista de Pedidos</h1>
      <ul>
        {pedidos.map((pedido, index) => (
          <li key={index}>
            <p>Fecha: {pedido.fecha}</p>
            <p>Estado: {pedido.estado}</p>
            <p>Tipo de entrega: {pedido.tipo_entrega}</p>
            <p>Total: {pedido.total}</p>
            <button className='button1' onClick={() => fetchPedidoDetallado(pedido.idpedido)}>Ver Detalles</button>
            <button className='button1' onClick={() => confirmarEliminarPedido(pedido.idpedido)}>Eliminar</button>
            <button className='button1' onClick={() => handleEditar(pedido)}>Editar</button>
          </li>
        ))}
      </ul>
      {pedidoDetallado.map((detalle, index) => (
        <div key={index}>
          <h2>Detalles del Pedido</h2>
          <p>Producto: {detalle.producto_idProducto.nombre}</p>
          <p>Descripción: {detalle.producto_idProducto.descripcion}</p>
          <p>Precio: {detalle.producto_idProducto.precio}</p>
          <p>Cantidad: {detalle.cantidad}</p>
          <p>ID del Pedido: {detalle.pedido_idPedido}</p>
        </div>
      ))}

      {mostrarModal && pedidoAEditar && (
        <div className='modal-background'>
          <div className='modal-content'>
            <h2 className='titulo2'>Editar Cliente</h2>
            <form>
              <div className='input-group'>
                <input
                  type="text"
                  name="fecha"
                  value={nuevosDatos.fecha !== undefined ? nuevosDatos.fecha : pedidoAEditar.fecha}
                  onChange={handleInputChange}
                  placeholder="Fecha"
                />
              </div>
              <div className='input-group'>
                <label>Estado:</label>
                <select
                  name="estado"
                  value={nuevosDatos.estado !== undefined ? nuevosDatos.estado : pedidoAEditar.estado}
                  onChange={handleInputChange}
                >
                  <option value="Pendiente">Pendiente</option>
                  <option value="En progreso">En progreso</option>
                  <option value="Completado">Completado</option>
                </select>
              </div>

              <div className='input-group'>
                <input
                  type="text"
                  name="tipo_entrega"
                  value={nuevosDatos.tipo_entrega !== undefined ? nuevosDatos.tipo_entrega : pedidoAEditar.tipo_entrega}
                  onChange={handleInputChange}
                  placeholder="Tipo de entrega"
                />
              </div>
              <div className='input-group'>
                <input
                  type="text"
                  name="total"
                  value={nuevosDatos.total !== undefined ? nuevosDatos.total : pedidoAEditar.total}
                  onChange={handleInputChange}
                  placeholder="Total"
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
    </>
  );
};
