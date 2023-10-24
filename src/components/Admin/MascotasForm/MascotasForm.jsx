
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useAuth } from '../../../hooks'
import { crearMascotaApi } from '../../../api/user'
import './MascotasForm.scss'

export const MascotasForm = () => {
    //console.log(useAuth())

    const { auth } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(auth.me.idusuario),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            try {
                console.log(formValue)
                const response = await crearMascotaApi(formValue, auth.me.idcliente);
                console.log(response)

            } catch (e) {
                console.log("Error");
                console.log(e);
            }
        }
    });

    return (
        <>
            <h2 className="titulo-mascotas">Añade Mascotas</h2>
            <Form className="login-form-admin_mascotas" onSubmit={formik.handleSubmit}>
                <Form.Input
                    name="nombre"
                    placeholder="Nombre de la mascota"
                    value={formik.values.string}
                    onChange={formik.handleChange}
                    error={formik.errors.string}
                />
                <Form.Input
                    name="fecha_nacim"
                    type='date'
                    placeholder="Fecha de nacimiento"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.errors.date}
                />
                <Form.Input
                    name="especie"
                    placeholder="Especie de la mascota"
                    value={formik.values.string}
                    onChange={formik.handleChange}
                    error={formik.errors.string}
                />
                <Form.Input
                    name="raza"
                    placeholder="Raza de la mascota"
                    value={formik.values.string}
                    onChange={formik.handleChange}
                    error={formik.errors.string}
                />
                <div className="contenedorBtn_mascotas">
                    <Button type='submit' content="Crear" primary fluid className="btn-crear" />
                </div>
            </Form>
        </>
    );
}


const initialValues = (id) => {
    return {
        id: id,
        nombre: "",
        fecha_nacim: "",
        especie: "",
        raza: "",
    };
}

const validationSchema = () => {
    return {

    }
}