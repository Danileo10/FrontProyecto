import { Form, Button } from 'semantic-ui-react';
import './ProductoForm.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useAuth } from '../../../hooks';
import { useNavigate } from 'react-router-dom';


import { crearProductoApi } from '../../../api/user'

export const ProductoForm = () => {
    //console.log(useAuth())
    const {auth} = useAuth();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            try {
                console.log(formValue)
                const response = await crearProductoApi(formValue, auth.me.idcliente);
                console.log(response)
                navigate('/admin/productos');

            } catch (e) {
                console.log("Error");
                console.log(e);
            }
        }
    });



    return (
        <div className='contentFrom'>
            
            <Form className='productosFrom' onSubmit={formik.handleSubmit}>
                <label htmlFor="">Nombre</label>
                <Form.Input
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={formik.values.string}
                    onChange={(e, { value }) => formik.setFieldValue("nombre", value)}
                    error={formik.errors.string}
                />
                <label htmlFor="">Precio</label>
                <Form.Input
                    name="precio"
                    placeholder="precio del producto"
                    value={formik.values.string}
                    onChange={(e, { value }) => formik.setFieldValue("precio", value)}
                    error={formik.errors.string}
                />
                <label htmlFor="">Descripcion </label>
                <Form.Input
                    name="descripcion"
                    placeholder="descripcion del producto"
                    value={formik.values.string}
                    onChange={(e, { value }) => formik.setFieldValue("descripcion", value)}
                    error={formik.errors.string}
                />
                <label htmlFor="">Stock</label>
                <Form.Input
                    name="stock"
                    placeholder="stock del producto"
                    value={formik.values.string}
                    onChange={(e, { value }) => formik.setFieldValue("stock", value)}
                    error={formik.errors.string}
                />
                <label htmlFor="">Imagen</label>
                <Form.Input
                    name="imagen"
                    placeholder="imagen del producto"
                    value={formik.values.string}
                    onChange={(e, { value }) => formik.setFieldValue("imagen", value)}
                    error={formik.errors.string}
                />
                <div className='contenedorBtn'>
                    <Button type='submit' content="Crear" className='btn-crear' />

                </div>

            </Form>
        </div>
    )
}


const initialValues = (id) => {
    return {
        id: id,
        nombre: "",
        precio: "",
        descripcion: "",
        stock: "",
        imagen: "",
    };
}

const validationSchema = () => {
    return {

    }
}