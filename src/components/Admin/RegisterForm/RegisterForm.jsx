import './RegisterForm.scss';
import {Form, Button} from 'semantic-ui-react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerApi } from '../../../api/user';
import { useNavigate } from 'react-router-dom';


export const RegisterForm = () => {
    const navigate = useNavigate();
  
    const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit:async (formValue) => {
        try{
            const response = await registerApi(formValue);
            const { access } = response; 
            registerApi(access);
            console.log(access);
            navigate('/');
            
        }catch(e){
            console.log("Error");
            console.log(e);
        }
    }
  });
  
  
    return (
    <>
      <Form className='register-form-admin' onSubmit={formik.handleSubmit}>
        <Form.Input
            name="nombre"
            placeholder="Nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            error={formik.errors.nombre}
        />
        <Form.Input
            name="apellido"
            placeholder="Apellido"
            value={formik.values.apellido}
            onChange={formik.handleChange}
            error={formik.errors.apellido}
        />
        <Form.Input
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
        />
        <Form.Input
            name="telefono"
            placeholder="Telefono"
            keyboardType="numeric"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            error={formik.errors.telefono}
        />
        <Form.Input
            name="password"
            type='password'
            placeholder="Contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
        />
         <Form.Input
            name="confirmPassword"
            type='password'
            placeholder="Confirme Contraseña"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.errors.confirmPassword}
        />
        <Form.Input
            name="direccion"
            placeholder="Direccion"
            value={formik.values.direccion}
            onChange={formik.handleChange}
            error={formik.errors.direccion}
        />
        <Button type='submit' content="Registrarse" primary fluid/>
      </Form>
    </>
  )
}

const initialValues = () => {
    return {
        nombre:"",
        apellido:"",
        email: "",
        telefono:"",
        password: "",
        confirmPassword: "",
        direccion:"",
    };
  }

  const validationSchema = () => {
    return {
      email: Yup.string().email("error en dato").required(true),
      password: Yup.string().required("inserte una contraseña"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las Contraseñas deben coincidir')};
    }


