import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Form, Button} from 'semantic-ui-react';
import { correoReset } from '../../../../api/user';
export const EmailInputForm = (props) => {
  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try{
        const response = await correoReset(formValue);
  
       
        console.log(response);
        props.handleEmailSubmit();
      }catch(e){
        console.log("Error");
        console.log(e);
      }
    }
  });
    
  return (
    <>
      <Form className='login-form-admin_reset' onSubmit={formik.handleSubmit}>
            <Form.Input
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <div className='contenedorBtn'>
              <Button type="submit" className='btnRegister' content="Enviar Codigo" fluid/> 
            </div>
      
        </Form> 
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
    email: Yup.string().email("error en dato").required(true),
  }
}
