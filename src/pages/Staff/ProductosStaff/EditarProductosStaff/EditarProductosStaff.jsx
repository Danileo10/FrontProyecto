import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export const EditarProductosStaff = () => {
    const { idproducto } = useParams();
    const [producto, setProducto] = useState({});

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api-comercio/obtener_producto/${idproducto}`);
                if (!response.ok) {
                    throw new Error('No se pudo obtener el producto');
                }
                const jsonData = await response.json();
                setProducto(jsonData);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
            }
        };

        fetchProducto();
    }, [idproducto]);

    // Resto de la lógica para la edición del producto

    return (
        <>
            <h1>Editar Producto</h1>
            {/* Renderizar el formulario de edición y usar el estado 'producto' */}
        </>
    );
};