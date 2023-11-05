
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
        <div className='content2'>
            <h2 className="titulo-mascotas">Registra tus mascotas </h2>
            <Form className="login-form-admin_mascotas" onSubmit={formik.handleSubmit}>
                <label htmlFor="" className='label1'>Nombre</label>
                <Form.Input
                    name="nombre"
                    placeholder="Nombre de la mascota"
                    value={formik.values.string}
                    onChange={formik.handleChange}
                    error={formik.errors.string}
                />
                <label htmlFor="" className='label1'>Fecha de nacimiento</label>
                <Form.Input
                    name="fecha_nacim"
                    type='date'
                    placeholder="Fecha de nacimiento"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    error={formik.errors.date}
                />
                <label htmlFor="" className='label1'>Especie</label>
                <Form.Input
                    name="especie"
                    placeholder="Especie de la mascota"
                    value={formik.values.string}
                    onChange={formik.handleChange}
                    error={formik.errors.string}
                />
                <label htmlFor="" className='label1'>Raza</label>
                <Form.Input
                    name="raza"
                    placeholder="Raza de la mascota"
                    value={formik.values.string}
                    onChange={formik.handleChange}
                    error={formik.errors.string}
                />
                <label htmlFor="" className='label1'>Descripción</label>
                <Form.TextArea
                    name="descripcion"
                    placeholder="Descripción de la mascota"
                    value={formik.values.descripcion}
                    onChange={formik.handleChange}
                    error={formik.errors.descripcion}
                />

                <h3>Foto de tu mascota</h3>
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
                    <Button type='submit' content="Crear" className="btn-crear" />
                </div>
            </Form>
        </div>
    );
}


const initialValues = (id) => {
    return {
        id: id,
        nombre: "",
        fecha_nacim: "",
        especie: "",
        raza: "",
        descripcion: "",
        imagen: null, // Agrega un campo para la imagen de la mascota
    };
}


const validationSchema = () => {
    return Yup.object({
        nombre: Yup.string().required("El nombre es requerido"),
        fecha_nacim: Yup.date().required("La fecha de nacimiento es requerida"),
        especie: Yup.string().required("La especie es requerida"),
        raza: Yup.string().required("La raza es requerida"),
        descripcion: Yup.string().max(200, "La descripción debe tener como máximo 200 caracteres"), // Validación para la descripción
        imagen: Yup.mixed().required("La imagen es requerida"),
    })
}