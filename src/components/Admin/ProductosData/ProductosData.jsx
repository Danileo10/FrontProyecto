import { useState, useEffect } from 'react';
import { CarritoProvider } from '../../../context';
import caradd from '../../../../public/car_add.svg'
import '../ProductosData/ProductosData.scss';

export const ProductosData = () => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productosPorPagina = 6;

    const indiceInicial = (currentPage - 1) * productosPorPagina;
    const indiceFinal = currentPage * productosPorPagina;
    const productosPaginaActual = productos.slice(indiceInicial, indiceFinal);

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

    const handlePaginaAnterior = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            console.log(`Página actual: ${currentPage - 1}`);
        }
    };
    

    const handlePaginaSiguiente = () => {
        const totalPages = Math.ceil(productos.length / productosPorPagina);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            console.log(`Página actual: ${currentPage + 1}`);
        }
    };
    


    return (
        <div className='content3'>
            <h1 className="titulo-mascotas">Tienda</h1>
            <CarritoProvider>
                <ul className="productos">
                    {productosPaginaActual.map((producto) => (
                        <li key={producto.idproducto} className='li-mascotas c'>
                            <img className="foto_mascota" src={`http://127.0.0.1:8000${producto.imagen}`} alt="producto" />
                            <div className="product-info">
                                <h2 className="product-title">{producto.nombre}</h2>
                                <p className="product-price">
                                    {new Intl.NumberFormat("es-CL", {
                                        style: "currency",
                                        currency: "CLP",
                                        minimumFractionDigits: 0, // Esto eliminará los decimales
                                    }).format(producto.precio)}
                                </p>
                                <p className="product-description">{producto.descripcion}</p>
                            </div>
                            <button className='add_car' onClick={() => agregarAlCarrito(producto)}>
                                <img src={caradd} alt="Agregar al carrito" />
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="paginacion">
                    <span>Página {currentPage} de {Math.ceil(productos.length / productosPorPagina)}</span>
                    <button className="btn-16" onClick={handlePaginaAnterior} disabled={currentPage === 1}>Anterior</button>
                    <button className="btn-16" onClick={handlePaginaSiguiente} disabled={currentPage === Math.ceil(productos.length / productos)}>Siguiente</button>
                </div>
            </CarritoProvider>
        </div>


    );
};
