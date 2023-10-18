import { useEffect, useState } from 'react';

export const CitasListado = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api-citas/citas/');
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
            <h1>listado citas</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <p>fecha: {item.Fecha}</p>
                        <p>bloque: {item.Bloque}</p>
                        <p>servicio: {item.Servicio}</p>
                        <p>cliente: {item.Cliente}</p>
                        
                    </li>
                ))}
            </ul>
        </>
    )
}


