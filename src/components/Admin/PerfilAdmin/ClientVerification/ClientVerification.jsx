import { useParams } from "react-router"
import { useState } from "react";


export const ClientVerification = () => {
  const {token} = useParams()
  const [responseMessage, setResponseMessage] = useState('');


  const verificarEmail = async (token) => {
    try {
      console.log(token)
      const response = await fetch(`http://127.0.0.1:8000/api/verificar_email/${token}/`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          // Puedes incluir otros encabezados si es necesario
        },
        // Puedes enviar datos en el cuerpo de la solicitud si es necesario
        // body: JSON.stringify({ key: 'value' }),
      });

      const data = await response.json();

      // Verificar si la solicitud fue exitosa o si hubo errores
      if (response.ok) {
        // Mostrar mensaje de éxito
        alert(data.message);
      } else {
        // Mostrar mensaje de error
        alert(data.error);
      }
      
      // Guardar el mensaje de respuesta en el estado para mostrarlo en la interfaz
      setResponseMessage(data.message || data.error);
    } catch (error) {
      // Capturar errores de red u otros errores
      console.error('Error:', error);
      // Mostrar mensaje de error
      alert('Ocurrió un error al procesar la solicitud.');
      setResponseMessage('Ocurrió un error al procesar la solicitud.');
    }
  };

  return (
    <div>
      <div>
        {/* Elimina las llaves alrededor de "token" para pasar el valor directamente */}
        <button onClick={() => verificarEmail(token)}>Verificar Email</button>
        {responseMessage && <div>Mensaje de respuesta: {responseMessage}</div>}
      </div>

    </div>
  )
}


