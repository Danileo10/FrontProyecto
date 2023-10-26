import { useAuth } from "../../../hooks"
import { useEffect, useState } from "react";
export const ListadoPedidos = () => {
    const {auth} = useAuth()
    const [pedidos, setPedidos] = useState([])
    const [pedidoDetallado, setPedidoDetallado] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api-comercio/pedido_cliente?id_cliente=${auth.me.idcliente}`);
                if (!response.ok) {
                    throw new Error('No hay datos');
                }
                const jsonData = await response.json();
                if (Array.isArray(jsonData)) {
                    setPedidos(jsonData);
                } else {
                    console.error('Los datos recibidos no son un array');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        
        fetchData();
    }, []);

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
      <h1 className="title2">Pedidos</h1>
            <ul className="ul-mascotas">
                {pedidos.map((pedido) => (
                    <li className="li-mascotas c" key={pedido.idpedido}>
                        <p>fecha: {pedido.fecha}</p>
                        <p>estado: {pedido.estado}</p>
                        <p>Tipo de entrega: {pedido.tipo_entrega}</p>
                        <p>total: {pedido.total}</p>
                        <button onClick={() => fetchPedidoDetallado(pedido.idpedido)}>Ver Detalles</button>
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
  )
}

