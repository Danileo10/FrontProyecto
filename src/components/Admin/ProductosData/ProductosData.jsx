import { useState, useEffect } from 'react';
import { CarritoProvider } from '../../../context';

export const ProductosData = () => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api-comercio/mostrar_producto');
                if (!response.ok) {
                    throw new Error('No hay datos');
                }
                const jsonData = await response.json();
                setProductos(jsonData);
            } catch (error) {
                console.error('Error');
            }
        };
        fetchData();
    }, []);

    // Función para agregar un producto al carrito
    // Función para agregar un producto al carrito
const agregarAlCarrito = (producto) => {
  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find((item) => item.idproducto === producto.idproducto);

  if (!productoExistente) {
      // Si el producto no está en el carrito, agrégalo
      setCarrito((carritoActual) => {
          const nuevoCarrito = [...carritoActual, { ...producto, cantidad: 1 }];
          localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
          console.log(nuevoCarrito);
          return nuevoCarrito;
      });
  }
};


    return (
        <>

            <CarritoProvider>
                <h1>Tienda</h1>
                <ul>
                    {productos.map((producto) => (
                        <li key={producto.idproducto}>
                            <p>{producto.nombre}</p>
                            <p>{producto.precio}</p>
                            <p>{producto.descripcion}</p>
                            <p>{producto.imagen}</p>
                            <button onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
                        </li>
                    ))}
                </ul>

            </CarritoProvider>


        </>
    );
};
