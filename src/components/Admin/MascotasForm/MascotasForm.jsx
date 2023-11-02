
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useAuth } from '../../../hooks'
import { crearMascotaApi } from '../../../api/user'
import { toast } from 'react-toastify';
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
                if (response.status == 200) {
                    toast.success('Mascota creada con éxito');
                    window.location.reload(); // Recarga la página después de mostrar la notificación
                } else {
                    // Si hay un error en la creación de la mascota, muestra una notificación de error
                    toast.error('Error al crear la mascota');
                }

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
                <h3>Nombre</h3>
                <Form.Input
                    name="nombre"
                    placeholder="Nombre de la mascota"
                    value={formik.values.string}
                    onChange={formik.handleChange}
                    error={formik.errors.string}
                />
                <h3>Fecha de Nacimiento</h3>
                <Form.Input
                    name="fecha_nacim"
                    type='date'
                    placeholder="Fecha de nacimiento"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.errors.date}
                />
                <h3>Especie de la Mascota</h3>
                <Form.Input
                    name="especie"
                    placeholder="Especie de la mascota"
                    value={formik.values.string}
                    onChange={formik.handleChange}
                    error={formik.errors.string}
                />
                <h3>Raza de la Moscota</h3>
                <Form.Input
                    name="raza"
                    placeholder="Raza de la mascota"
                    value={formik.values.string}
                    onChange={formik.handleChange}
                    error={formik.errors.string}
                />
                <h3>Foto de la Mascota</h3>
                <Form.Input
                    name="imagen"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        formik.setFieldValue("imagen", e.currentTarget.files[0]);
                    }}
                    error={formik.errors.imagen}
                />
                <div className="contenedorBtn_mascotas">
                    <Button type='submit' content="Añadir" primary fluid className="btn-crear" />
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
        imagen: null, // Agrega un campo para la imagen de la mascota
    };
}


const validationSchema = () => {
    return {

    }
}