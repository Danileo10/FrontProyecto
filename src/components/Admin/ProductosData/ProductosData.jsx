import { useState, useEffect } from 'react';
import { CarritoProvider } from '../../../context';
import '../ProductosData/ProductosData.scss';

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
          const nuevoCarrito = [... carritoActual, { ...producto, cantidad: 1 }];
          localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
          console.log(nuevoCarrito);
          return nuevoCarrito;
      });
  }
};


    return (
        <div className='content5'>
            <h1 className="titulo-mascotas">Tienda</h1>
            <CarritoProvider>
                <ul className="productos">
                    {productos.map((producto) => (
                        <li key={producto.idproducto} className='producto'>
                            <div className="product-info">
                                <h2 className="product-title">{producto.nombre}</h2>
                                <p className="product-price">{producto.precio}</p>
                                <p className="product-description">{producto.descripcion}</p>
                            </div>
                            <img className="product-image" src={`http://127.0.0.1:8000${producto.imagen}`} alt="producto" />
                            <button className='product-button' onClick={() => agregarAlCarrito(producto)}>Agregar al carrito</button>
                        </li>
                    ))}
                </ul>
            </CarritoProvider>
        </div>
    );
};
