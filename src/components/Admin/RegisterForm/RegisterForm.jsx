import './RegisterForm.scss';
import { Form, Button } from 'semantic-ui-react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerApi } from '../../../api/user';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const RegisterForm = () => {
  const navigate = useNavigate();

  const handleTelefonoChange = (e) => {
    const { name, value } = e.target;

    // Verificar si el valor es una cadena vacía y actualizar el campo de teléfono
    if (name === 'telefono' && value !== '') {
        // Validación para el campo de teléfono: acepta solo números
        if (!/^\d+$/.test(value)) {
            // Muestra un mensaje de error si el valor no es un número
            // Puedes manejar esto de diferentes maneras, por ejemplo, mostrando un mensaje de error en la interfaz de usuario.
            console.log("El teléfono debe contener solo números.");
            return;
        }
    }

    // Actualiza el valor del campo de teléfono usando setFieldValue de Formik
    formik.setFieldValue(name, value);
};

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      if (!formValue.nombre || !formValue.apellido || !formValue.email || !formValue.telefono || !formValue.password || !formValue.confirmPassword || !formValue.direccion) {
        alert("Todos los campos son obligatorios.");
        return;
      }
      try {
        const response = await registerApi(formValue);
        const { access } = response;
        console.log(access)
        registerApi(access);

        console.log(response.data);
        Swal.fire({
          position: "center ",
          icon: "success",
          title: "Te has registrado exitosamente!",
          showConfirmButton: false,
          timer: 3000
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            navigate('/')
          }
        });
        

      } catch (e) {
        Swal.fire({
          position: "center ",
          icon: "error",
          title: "Correo ya existe",
          showConfirmButton: false,
          timer: 3000
        })
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
        <label htmlFor="telefono" className='label'>Telefono</label>
        <Form.Input
          name="telefono"
          type="text"  // Cambiado a tipo de texto para aceptar entrada alfanumérica
          placeholder="Telefono"
          value={formik.values.telefono}
          onChange={handleTelefonoChange}  // Cambiado a handleTelefonoChange
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
        <Button className='registrarse_button' type='submit' content="Registrarse" />

      </Form>
    </>
  )
}

const initialValues = () => {
  return {
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    direccion: "",
  };
}

const validationSchema = () => {
  return {
    nombre: Yup.string().matches(/^[A-Za-z]+$/, 'Solo se permiten letras en el nombre').required('Campo obligatorio'),
    apellido: Yup.string().matches(/^[A-Za-z]+$/, 'Solo se permiten letras en el apellido').required('Campo obligatorio'),
    password: Yup.string().required("inserte una contraseña"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Las Contraseñas deben coincidir')
  };
}


