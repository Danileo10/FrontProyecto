import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Form, Button} from 'semantic-ui-react';
import { correoReset } from '../../../../api/user';
import Swal from 'sweetalert2'
import {useState} from 'react'
import './EmailInputForm.scss';

export const EmailInputForm = (props) => {
  const [enviar, setEnviar] = useState(false)
  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try{
        setEnviar(true);
        const response = await correoReset(formValue);
  
       
        console.log(response);
        props.handleEmailSubmit();
        setEnviar(false);
        Swal.fire({
          position: "center ",
          icon: "success",
          title: "Codigo de verificación enviado al correo",
          showConfirmButton: true,
        })


      }catch(e){
        setEnviar(false);
        Swal.fire({
        position: "center ",
        icon: "error",
        title: "Email incorrecto",
        showConfirmButton: true,
      })
      }
    }
  });
    
  return (
    <>
    <div className="reset-password-container">
      <h2>Restablece tu contraseña</h2>
      <Form className='login-form-admin_reset' onSubmit={formik.handleSubmit}>
            <Form.Input
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <div className='contenedorBtn'>
              <Button type="submit" className='btnRegister' content="Enviar Codigo" fluid disabled={enviar}/> 
            </div>
      
        </Form> 
        </div>
    </>
  )
}


const initialValues = () => {
  return {
    email: "",
  };
}

const validationSchema = () => {
  return {
    email: Yup.string().email("error en dato").required("El correo electrónico es obligatorio"),
  }
}
