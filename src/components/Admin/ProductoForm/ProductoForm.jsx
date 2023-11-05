import { Form, Button } from 'semantic-ui-react';
import './ProductoForm.scss'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useAuth } from '../../../hooks';
import { useNavigate } from 'react-router-dom';


import { crearProductoApi } from '../../../api/user'

export const ProductoForm = () => {
    //console.log(useAuth())
    const { auth } = useAuth();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            try {
                console.log(formValue.imagen)
                const response = await crearProductoApi(formValue, auth.me.idcliente);
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
                <label htmlFor="nombre">Nombre</label>
                <Form.Input
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    error={formik.errors.nombre}
                />

                <label htmlFor="precio">Precio</label>
                <Form.Input
                    name="precio"
                    placeholder="Precio del producto"
                    value={formik.values.precio}
                    onChange={formik.handleChange}
                    error={formik.errors.precio}
                />

                <label htmlFor="descripcion">Descripción</label>
                <Form.Input
                    name="descripcion"
                    placeholder="Descripción del producto"
                    value={formik.values.descripcion}
                    onChange={formik.handleChange}
                    error={formik.errors.descripcion}
                />

                <label htmlFor="stock">Stock</label>
                <Form.Input
                    name="stock"
                    placeholder="Stock del producto"
                    value={formik.values.stock}
                    onChange={formik.handleChange}
                    error={formik.errors.stock}
                />

                <Form.Field>
                    <label>Imagen del producto</label>
                    <input
                        type="file"
                        name="imagen"
                        onChange={(e) => {
                            formik.setFieldValue("imagen", e.target.files[0]);
                        }}
                    />
                </Form.Field>

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
        imagen: null,
    };
}

const validationSchema = () => {
    return Yup.object().shape({
        nombre: Yup.string().required("El nombre del producto es obligatorio"),
        precio: Yup.number().required("El precio del producto es obligatorio").positive("El precio debe ser un número positivo"),
        descripcion: Yup.string().required("La descripción del producto es obligatoria"),
        stock: Yup.number().required("El stock del producto es obligatorio").integer("El stock debe ser un número entero").positive("El stock debe ser un número positivo"),
        imagen: Yup.mixed().required("La imagen del producto es obligatoria"),
    });
};