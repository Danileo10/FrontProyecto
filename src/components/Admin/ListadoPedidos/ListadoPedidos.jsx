import { useAuth } from "../../../hooks"
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './ListadoPedidos.scss'
export const ListadoPedidos = () => {
    const { auth } = useAuth()
    const [pedidos, setPedidos] = useState([])
    const [pedidoDetallado, setPedidoDetallado] = useState([]);
    const [detallesVisible, setDetallesVisible] = useState(false);



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
            setDetallesVisible(true);
        } catch (error) {
            console.error("Error al obtener el pedido detallado: ", error);
        }
    }
    return (
        <>
            <h1 className="tituloPedidos">Pedidos</h1>
            <div className="container">
                <div className="contenedorPedidos">
                    <div className="lista-pedidos">
                        <ul>
                            {pedidos.map((pedido) => (
                                <li key={pedido.idpedido}>
                                    <div className="tarjetaPedido">
                                        <h2>Fecha</h2>
                                        <p>{pedido.fecha}</p>
                                        <h2>Estado</h2>
                                        <p>{pedido.estado}</p>
                                        <h2>Tipo de entrega</h2>
                                        <p>{pedido.tipo_entrega}</p>
                                        <h2>Total</h2>
                                        <p>{pedido.total}</p>
                                        <button className="verDetalle custom-btn btn-16" onClick={() => fetchPedidoDetallado(pedido.idpedido)}>Ver Detalles</button>
                                    </div>

                                </li>
                            ))}
                        </ul>
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
                                        <p>{detalle.producto_idProducto.precio}</p>
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



            <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet"/>
        </>
    )
}

