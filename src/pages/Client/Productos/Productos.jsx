import React, { useState, useEffect } from "react";
import '../Productos/Productos.scss';
import 'bootstrap/dist/css/bootstrap.css';

const ProductoCard = ({ product }) => {
  const [showDescription, setShowDescription] = useState(false);

  const handleMostrarMasClick = () => {
    setShowDescription(!showDescription);
  };

  function formatNumber(number) {
    return new Intl.NumberFormat().format(number)
  }

  return (
    <div className="card" key={product.idproducto}>
      <img className="card-img-top" src={product.imagen} alt="" />
      <div className="card-body">
        <h5 className="card-title">{product.nombre}</h5>
        <p className="card-text">{formatNumber(product.precio)}$</p>
        {showDescription && <p className="card-text">{product.descripcion}</p>}
        <div className="botonMore">
          <button
            className=" top-menu-client__item"
            id="hideText_btn"
            onClick={handleMostrarMasClick}
          >
            {showDescription ? 'Ocultar' : 'Mostrar Más'}
          </button>
        </div>
        
      </div>
    </div>
  );
};

export const Productos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api-comercio/mostrar_producto');
        if (!response.ok){
          throw new Error('No hay datos');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error){
        console.error('Error');
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="productos">
        {data.map((product) => (
          <ProductoCard key={product.idproducto} product={product} />
        ))}
      </div>
    </>
  );
};
