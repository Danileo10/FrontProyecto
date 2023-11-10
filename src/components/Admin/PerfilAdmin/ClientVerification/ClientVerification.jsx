import { useParams } from "react-router"
import { useState } from "react";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

export const ClientVerification = () => {
  const {token} = useParams()
  const navigate = useNavigate('')
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
        Swal.fire({
          position: "center ",
          icon: "success",
          title: "Correo verificado con éxito!",
          showConfirmButton: false,
          timer: 1000
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            navigate('/perfil')
            window.location.reload();
          }
        });
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
        <button className="eliminar-button_pet" onClick={() => verificarEmail(token)}>Verificar Email</button>
        {responseMessage && <div>Mensaje de respuesta: {responseMessage}</div>}
      </div>

    </div>
  )
}


