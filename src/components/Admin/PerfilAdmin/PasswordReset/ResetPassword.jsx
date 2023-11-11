import { passwordChange } from "../../../../api/user";
import {Form, Button} from 'semantic-ui-react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2'

export const ResetPassword = (props) => {
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit:async (formValue) => {
            try{
                const data = {...formValue, "idusuario" : props.id}
                console.log(formValue)
                console.log(data)
                const response = await passwordChange(data);
                
                console.log(response);
                props.handlePasswordChangeSubmit()
                Swal.fire({
                  position: "center ",
                  icon: "success",
                  title: "Contraseña cambiada",
                  showConfirmButton: false,
                  timer: 1000
                }).then((result) => {
                  /* Read more about handling dismissals below */
                  if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                    
                  }
                });
            }catch(e){
              Swal.fire({
                position: "center ",
                icon: "error",
                title: "Error en las contraseñas, recuerda que deben ser iguales",
                showConfirmButton: true,
              })
            }
        }
      });
      
  return (
    <>
      <Form className='login-form-admin_reset' onSubmit={formik.handleSubmit}>
        <Form.Input
            name="new_password"
            type='password'
            placeholder="Nueva Contraseña"
            value={formik.values.new_password}
            onChange={formik.handleChange}
            error={formik.errors.new_password}
        />
         <Form.Input
            name="new_confirmPassword"
            type='password'
            placeholder="Confirma la Contraseña"
            value={formik.values.new_confirmPassword}
            onChange={formik.handleChange}
            error={formik.errors.new_confirmPassword}
        />
        <Button type='submit' content="Cambiar Contraseña" primary fluid/>
      </Form>
    </>
  )
}

const initialValues = () => {
    return {
        new_password: "",
        new_confirmPassword: "",
    };
  }

  const validationSchema = () => {
    return {
      new_password: Yup.string().required("inserte una contraseña"),
      new_confirmPassword: Yup.string().oneOf([Yup.ref('new_password'), null], 'Las Contraseñas deben coincidir')};
    }
