import { useState } from 'react';
import { useAuth } from '../../../hooks';

export const Carrito = () => {
  const {auth} = useAuth();
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

  const handlePagar = () => {
    // Crear un array de productos seleccionados con sus cantidades
    const productosSeleccionados = carrito.map((item) => ({
      idproducto: item.idproducto,
      cantidad: item.cantidad || 1, // Iniciar en 1 si es undefined
    }));

    const data = {
      "productos": productosSeleccionados,
      "tipo_entrega": tipoDomicilio
    }

    // Aquí puedes enviar los datos de productosSeleccionados a tu servidor o realizar otras acciones necesarias para completar la compra
    console.log(data);

    // Limpiar el carrito después de la compra
    setCarrito([]);
    actualizarLocalStorage([]);
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
            <button onClick={() => agregarCantidad(index)}>Agregar</button>
            <button onClick={() => restarCantidad(index)}>Restar</button>
          </li>
        ))}
      </ul>

      <h4>Informacion Adicional</h4>
          <h6>Tipo de domicilio</h6>
      <select value={tipoDomicilio} onChange={(e) => setTipoDomicilio(e.target.value)}>
        <option value="opcion1">Domicilio</option>
        <option value="opcion2">Recoger en tienda</option>
      </select>


      

      <button onClick={handlePagar}>Pagar</button>
    </div>
  );
}
