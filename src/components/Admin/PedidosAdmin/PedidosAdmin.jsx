import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks';

export const PedidosAdmin = () => {
    const {auth} = useAuth()
    const [pedidos, setPedidos] = useState([]);
    const [pedidoDetallado, setPedidoDetallado] = useState([]);
    

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
                        <button onClick={() => fetchPedidoDetallado(pedido.idpedido)}>Ver Detalles</button>
                        <button onClick={() => confirmarEliminarPedido(pedido.idpedido)}>Eliminar</button>
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
        </>
    );
};
