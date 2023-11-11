import './LoginForm.scss';
import {Form, Button} from 'semantic-ui-react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {useAuth} from '../../../hooks'
import logoHome from '../../../../public/house.svg'
import {loginApi} from '../../../api/user'


export const LoginForm = () => {
  //console.log(useAuth())
  const navigate = useNavigate();
  const {login} = useAuth();
  
  const handleRegister = () => {
    navigate('/register')
  }

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
        Swal.fire({
          position: "center ",
          icon: "error",
          title: "Correo o contraseña incorrecta",
          showConfirmButton: false,
          timer: 1000
        })
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
              <Button className='btnRegister' content="Regístrate" fluid onClick={handleRegister}/> 
            </div>
            <Link className='rescatar' to={"/client/resetpassword/correo"}>¿Olvidaste la contraseña?</Link>
        </Form>

        <Link to="/" className='link'>
            <button className='volver'><img src={logoHome} alt="" className="src" /></button>
        </Link>
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
    email: Yup.string().email('Ingresa un correo electrónico válido').required('El correo electrónico es obligatorio'),
    password: Yup.string().required("inserte una contraseña"),
  }
}
