import { useState } from 'react';
import { useAuth } from '../../../hooks';
import { useNavigate } from 'react-router-dom';

export const Carrito = () => {
  const {auth} = useAuth();
  const navigate = useNavigate();
  const [tipoDomicilio, setTipoDomicilio] = useState("opcion1"); // valor inicial
  const [carrito, setCarrito] = useState(JSON.parse(localStorage.getItem('carrito')) || []);


  // Función para agregar cantidad a un producto
  const agregarCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito[index].cantidad = (nuevoCarrito[index].cantidad || 0) + 1; // Iniciar en 1 si es undefined
    setCarrito(nuevoCarrito);
    actualizarLocalStorage(nuevoCarrito);
  };

  // Función para restar cantidad de un producto
  const restarCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    if (nuevoCarrito[index].cantidad > 1) {
      nuevoCarrito[index].cantidad--;
      setCarrito(nuevoCarrito);
      actualizarLocalStorage(nuevoCarrito);
    }
  };

  const handlePagar = async () => {
    // Crear un array de productos seleccionados con sus cantidades
    const productosSeleccionados = carrito.map((item) => ({
      producto_idProducto: item.idproducto,
      cantidad: item.cantidad || 1,
    }));

    const data = {
      productos: productosSeleccionados,
      tipo_entrega: tipoDomicilio,
      id_cliente: auth.me.idcliente
    };

    console.log(data)

    try {
      const response = await fetch('http://127.0.0.1:8000/api-comercio/pago/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // La solicitud fue exitosa, puedes manejar la respuesta aquí
        const responseData = await response.json(); // Convertir la respuesta a JSON
        console.log('Respuesta del servidor:', responseData);
        window.location.href = responseData
        setCarrito([]);
        actualizarLocalStorage([]);

      } else {
        // La solicitud no fue exitosa, maneja el error aquí
        console.error('Error al realizar la compra');
      }
    } catch (error) {
      // Error de red o cualquier otro error
      console.error('Error:', error);
    }
  };

    

  


  // Función para actualizar el carrito en el almacenamiento local
  const actualizarLocalStorage = (nuevoCarrito) => {
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {carrito.map((item, index) => (
          <li key={index}>
            {/* Muestra los detalles del producto en el carrito */}
            <p>Nombre: {item.nombre}</p>
            <p>Precio: {item.precio}</p>
            <p>Cantidad: {item.cantidad || 1}</p> {/* Iniciar en 1 si es undefined */}
            {/* Agregar botones para agregar y restar cantidad */}
            <button className='button_save' onClick={() => agregarCantidad(index)}>Agregar</button>
            <button className='button_save' onClick={() => restarCantidad(index)}>Restar</button>
          </li>
        ))}
      </ul>

      <h4>Informacion Adicional</h4>
          <h6>Tipo de domicilio</h6>
      <select value={tipoDomicilio} onChange={(e) => setTipoDomicilio(e.target.value)}>
        <option value="opcion1">Domicilio</option>
        <option value="opcion2">Recoger en tienda</option>
      </select>


      

      <button className='button_save' onClick={handlePagar}>Pagar</button>
    </div>
  );
}
