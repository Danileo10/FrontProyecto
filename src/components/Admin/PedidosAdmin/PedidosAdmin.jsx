import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks';
import cerrar from "../../../../public/x.svg"

export const PedidosAdmin = () => {
  const { auth } = useAuth()
  const [pedidos, setPedidos] = useState([]);
  const [pedidoDetallado, setPedidoDetallado] = useState([]);
  const [detallesVisible, setDetallesVisible] = useState(false);
  const [pedidoAEditar, setPedidoAEditar] = useState(null);
  const [nuevosDatos, setNuevosDatos] = useState({
    fecha: '',
    estado: '',
    tipo_entrega: '',
    total: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const pedidosPorPagina = 6;
  const indiceInicial = (currentPage - 1) * pedidosPorPagina;
  const indiceFinal = currentPage * pedidosPorPagina;
  const pedidosPaginaActual = pedidos.slice(indiceInicial, indiceFinal);

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
      setDetallesVisible(true);
    } catch (error) {
      console.error("Error al obtener el pedido detallado: ", error);
    }
  }

  const handlePaginaAnterior = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        console.log(`Página actual: ${currentPage - 1}`);
    }
};


const handlePaginaSiguiente = () => {
    const totalPages = Math.ceil(pedidos.length / pedidosPorPagina);
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        console.log(`Página actual: ${currentPage + 1}`);
    }
};

  return (
    <>
      <h1 className='tituloPedidos'>Lista de Pedidos</h1>
      <div className='container'>
        <div className="contenedorPedidos">
          <div className="lista-pedidos">
            <ul>
              {pedidosPaginaActual.map((pedido) => (
                <li key={pedido.idpedido}>
                  <div className="tarjetaPedido">
                    <h2>Fecha</h2>
                    <p>{pedido.fecha}</p>
                    <h2>Estado</h2>
                    <p>{pedido.estado}</p>
                    <h2>Tipo de entrega</h2>
                    <p>{pedido.tipo_entrega}</p>
                    <h2>Total</h2>
                    <p>${pedido.total}</p>
                    <button className="verDetalle custom-btn btn-16" onClick={() => fetchPedidoDetallado(pedido.idpedido)}>Ver Detalles</button>
                    <button className='custom-btn btn-16' onClick={() => confirmarEliminarPedido(pedido.idpedido)}>Eliminar</button>
                    <button className='custom-btn btn-16' onClick={() => handleEditar(pedido)}>Editar</button>
                  </div>

                </li>
              ))}
            </ul>

            <div className="paginacion">
                <span>Página {currentPage} de {Math.ceil(pedidos.length / pedidosPorPagina)}</span>
                <button className="btn-16" onClick={handlePaginaAnterior} disabled={currentPage === 1}>Anterior</button>
                <button className="btn-16" onClick={handlePaginaSiguiente} disabled={currentPage === Math.ceil(pedidos.length / pedidos)}>Siguiente</button>
            </div>
          </div>

          <div className="contenedorDetalles">
            <div className="detalles-pedido">
              <h2 className="tituloDetalle">Detalles del Pedido</h2>
              {detallesVisible && pedidoDetallado.map((detalle, index) => (
                <div key={index}>
                  <div className="tarjetaDetalle">
                    <h2>Producto</h2>
                    <p>{detalle.producto_idProducto.nombre}</p>
                    <h3>Precio</h3>
                    <p>${detalle.producto_idProducto.precio}</p>
                    <h3>Cantidad</h3>
                    <p>{detalle.cantidad}</p>
                    <h3>ID del Pedido</h3>
                    <p>{detalle.pedido_idPedido}</p>
                    <button className="custom-btn btn-16" onClick={() => setDetallesVisible(false)}>Cerrar</button>

                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>




      {mostrarModal && pedidoAEditar && (
        <div className='modal-background'>
          <div className='modal-content'>
            <h2 className='titulo2'>Editar Cliente</h2>
            <form>
              
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
