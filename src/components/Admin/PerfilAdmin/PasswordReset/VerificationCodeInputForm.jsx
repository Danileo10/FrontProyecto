import {useFormik} from 'formik';
import * as Yup from 'yup';
import {Form, Button} from 'semantic-ui-react';
import { codeVerification } from '../../../../api/user';

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
      }catch(e){
        console.log("Error");
        console.log(e);
      }
    }
  });
    
  return (
    <>
      <Form className='login-form-admin' onSubmit={formik.handleSubmit}>
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
