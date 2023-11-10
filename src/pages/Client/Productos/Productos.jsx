import React, { useState, useEffect } from "react";
import '../Productos/Productos.scss';
import 'bootstrap/dist/css/bootstrap.css';

const ProductoCard = ({ product }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 8;

  const indiceInicial = (currentPage - 1) * productosPorPagina;
  const indiceFinal = currentPage * productosPorPagina;
  const productosPaginaActual = data.slice(indiceInicial, indiceFinal);

  const handlePaginaAnterior = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log(`Página actual: ${currentPage - 1}`);
    }
  };


  const handlePaginaSiguiente = () => {
    const totalPages = Math.ceil(data.length / productosPorPagina);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log(`Página actual: ${currentPage + 1}`);
    }
  };

  const [showDescription, setShowDescription] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api-comercio/mostrar_producto');
        if (!response.ok) {
          throw new Error('No hay datos');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error');
      }
    };
    fetchData();
  }, []);


  const handleMostrarMasClick = () => {
    setShowDescription(!showDescription);
  };

  function formatNumber(number) {
    return new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" }).format(number);
  }

  // Modificación: Obtén el precio formateado
  const formattedPrecio = formatNumber(product.precio);


  return (
    <div className="card" key={product.idproducto}>
      <img className="card-img-top" src={`http://127.0.0.1:8000${product.imagen}`} alt="producto" />
      <div className="card-body">
        <h5 className="card-title">{product.nombre}</h5>
        <p className="card-text">{formattedPrecio}</p>
        {showDescription && <p className="card-text">{product.descripcion}</p>}
        <div className="botonMore">
          <button
            className="top-menu-client__item_pro"
            id="hideText_btn"
            onClick={handleMostrarMasClick}
          >
            {showDescription ? 'Ocultar' : 'Ver más'}
          </button>
        </div>

      </div>
    </div>
  );
};

export const Productos = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productosPorPagina = 8;

  const indiceInicial = (currentPage - 1) * productosPorPagina;
  const indiceFinal = currentPage * productosPorPagina;
  const productosPaginaActual = data.slice(indiceInicial, indiceFinal);

  const handlePaginaAnterior = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      console.log(`Página actual: ${currentPage - 1}`);
    }
  };


  const handlePaginaSiguiente = () => {
    const totalPages = Math.ceil(data.length / productosPorPagina);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      console.log(`Página actual: ${currentPage + 1}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api-comercio/mostrar_producto');
        if (!response.ok) {
          throw new Error('No hay datos');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error');
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="productos">
        {productosPaginaActual.map((product) => (
          <ProductoCard key={product.idproducto} product={product} />
        ))}
      </div>
      <div className="paginacion">
        <span>Página {currentPage} de {Math.ceil(data.length / productosPorPagina)}</span>
        <button className="btn-16" onClick={handlePaginaAnterior} disabled={currentPage === 1}>Anterior</button>
        <button className="btn-16" onClick={handlePaginaSiguiente} disabled={currentPage === Math.ceil(data.length / data)}>Siguiente</button>
      </div>
    </>
  );
};
