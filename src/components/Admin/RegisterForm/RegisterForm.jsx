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
        <label htmlFor="nombre" className='label'>Nombre</label>
        <Form.Input
            name="nombre"
            placeholder="Nombre"
            value={formik.values.nombre}
            onChange={formik.handleChange}
            error={formik.errors.nombre}
        />
        <label htmlFor="nombre" className='label'>Apellido</label>
        <Form.Input
            name="apellido"
            placeholder="Apellido"
            value={formik.values.apellido}
            onChange={formik.handleChange}
            error={formik.errors.apellido}
        />
        <label htmlFor="nombre" className='label'>Email</label>
        <Form.Input
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
        />
        <label htmlFor="nombre" className='label'>Telefono</label>
        <Form.Input
            name="telefono"
            placeholder="Telefono"
            keyboardType="numeric"
            value={formik.values.telefono}
            onChange={formik.handleChange}
            error={formik.errors.telefono}
        />
        <label htmlFor="nombre" className='label'>Contraseña</label>
        <Form.Input
            name="password"
            type='password'
            placeholder="Contraseña"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
        />
        <label htmlFor="nombre" className='label'>Confirme Contraseña</label>
         <Form.Input
            name="confirmPassword"
            type='password'
            placeholder="Confirme Contraseña"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.errors.confirmPassword}
        />
        <label htmlFor="nombre" className='label'>Direccion</label>
        <Form.Input
            name="direccion"
            placeholder="Direccion"
            value={formik.values.direccion}
            onChange={formik.handleChange}
            error={formik.errors.direccion}
        />
        <Button className='registrarse_button' type='submit' content="Registrarse"/>
        
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
      nombre: Yup.string().required("campo obligatorio"),
      apellido: Yup.string().required("campo obligatorio"),
      telefono: Yup.string().required("campo obligatorio"),
      direccion: Yup.string().required("campo obligatorio"),
      email: Yup.string().email("error en dato").required(true),
      password: Yup.string().required("inserte una contraseña"),
      confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las Contraseñas deben coincidir')};
    }


