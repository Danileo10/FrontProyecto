import './LoginForm.scss';
import {Form, Button} from 'semantic-ui-react';

import {useFormik} from 'formik';
import * as Yup from 'yup'
import {useAuth} from '../../../hooks'

import {loginApi} from '../../../api/user'


export const LoginForm = () => {
  //console.log(useAuth())

  const {login} = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      try{
        const response = await loginApi(formValue);
        const {access} = response;
        login(access);
        //console.log(access);
  
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
                name="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.errors.email}
            />
            <Form.Input
                name="password"
                type='password'
                placeholder="Contraseña"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.errors.password}
            />
            <div className='contenedorBtn'>
              <Button type='submit' content="Iniciar Sesión" primary fluid/>
              <Button className='btnRegister' content="Regístrate" fluid/> 
            </div>
            
        </Form>
    </>
  )
}

const initialValues = () => {
  return {
    email: "",
    password: "",
  };
}

const validationSchema = () => {
  return {
    email: Yup.string().email("error en dato").required(true),
    password: Yup.string().required("inserte una contraseña"),
  }
}
