
import React, { createContext, useContext, useState } from 'react';

// Crear el contexto del carrito
const CarritoContext = createContext();

// Crear el proveedor del carrito
export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  return (
    <CarritoContext.Provider value={{ carrito, setCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Función personalizada para acceder al contexto del carrito
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe utilizarse dentro de un CarritoProvider');
  }
  return context;
};
