import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Form, Button} from 'semantic-ui-react';
import { codeVerification } from '../../../../api/user';
import Swal from 'sweetalert2'

export const VerificationCodeInputForm = (props) => {
  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try{
        const response = await codeVerification(formValue);
  
       
        console.log(response);
        props.setID(response)
        props.handleCodeVerificationSubmit();
        Swal.fire({
          position: "center ",
          icon: "success",
          title: "Codigo de verificación correcto",
          showConfirmButton: true,
        })
      }catch(e){
        Swal.fire({
          position: "center ",
          icon: "error",
          title: "Código incorrecto",
          showConfirmButton: true,
        })
      }
    }
  });
    
  return (
    <>
      <Form className='login-form-admin_reset paso2' onSubmit={formik.handleSubmit}>
            <Form.Input
                name="codigo"
                placeholder="Codigo"
                value={formik.values.codigo}
                onChange={formik.handleChange}
                error={formik.errors.codigo}
            />
            <div className='contenedorBtn'>
              <Button type="submit" className='btnRegister' content="Verificar Codigo" fluid/> 
            </div>
      
        </Form> 
    </>
  )
}


const initialValues = () => {
  return {
    codigo: "",
  };
}

const validationSchema = () => {
  return {
    codigo: Yup.string().required(true),
  }
}
