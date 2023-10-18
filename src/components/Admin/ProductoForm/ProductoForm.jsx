import { Form, Button } from 'semantic-ui-react';

import { useFormik } from 'formik';
import * as Yup from 'yup'


import { crearProductoApi } from '../../../api/user'

export const ProductoForm = () => {
    //console.log(useAuth())


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            try {
                console.log(formValue)
                const response = await crearProductoApi(formValue);
                console.log(response)

            } catch (e) {
                console.log("Error");
                console.log(e);
            }
        }
    });



    return (
        <>
            <Form className='login-form-admin' onSubmit={formik.handleSubmit}>
                <Form.Input
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={formik.values.string}
                    onChange={(e, { value }) => formik.setFieldValue("nombre", value)}
                    error={formik.errors.string}
                />
                <Form.Input
                    name="precio"
                    placeholder="precio del producto"
                    value={formik.values.string}
                    onChange={(e, { value }) => formik.setFieldValue("precio", value)}
                    error={formik.errors.string}
                />
                <Form.Input
                    name="descripcion"
                    placeholder="descripcion del producto"
                    value={formik.values.string}
                    onChange={(e, { value }) => formik.setFieldValue("descripcion", value)}
                    error={formik.errors.string}
                />
                <Form.Input
                    name="stock"
                    placeholder="stock del producto"
                    value={formik.values.string}
                    onChange={(e, { value }) => formik.setFieldValue("stock", value)}
                    error={formik.errors.string}
                />
                <Form.Input
                    name="imagen"
                    placeholder="imagen del producto"
                    value={formik.values.string}
                    onChange={(e, { value }) => formik.setFieldValue("imagen", value)}
                    error={formik.errors.string}
                />
                <div className='contenedorBtn'>
                    <Button type='submit' content="Crear" primary fluid />

                </div>

            </Form>
        </>
    )
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