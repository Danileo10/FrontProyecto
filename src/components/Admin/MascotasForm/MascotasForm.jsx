
import { Form, Button } from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useAuth } from '../../../hooks'
import { crearMascotaApi } from '../../../api/user'
import { toast } from 'react-toastify';
import './MascotasForm.scss'
import Swal from 'sweetalert2'

export const MascotasForm = () => {
    //console.log(useAuth())

    const { auth } = useAuth();
    const especiesOptions = [
        { key: 'perro', text: 'Perro', value: 'Perro' },
        { key: 'gato', text: 'Gato', value: 'Gato' },
        { key: 'ave', text: 'Ave', value: 'Ave' },
    ];


    const formik = useFormik({
        initialValues: initialValues(auth.me.idusuario),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formValue) => {
            if (
                !formValue.nombre ||
                !formValue.fecha_nacim ||
                !formValue.especie ||
                !formValue.raza ||
                !formValue.descripcion ||
                !formValue.imagen
              ) {
                Swal.fire({
                    position: "center ",
                    icon: "error",
                    title: "Todos los campos son obligatorios",
                    showConfirmButton: false,
                    timer: 1000
                  })
              }
            try {
                console.log(formValue)
                const response = await crearMascotaApi(formValue, auth.me.idcliente);
                console.log(response)
                if (response.status == 200) {
                    Swal.fire({
                        position: "center ",
                        icon: "success",
                        title: "Mascota creada con éxito!",
                        showConfirmButton: false,
                        timer: 1000
                      }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                          console.log("I was closed by the timer");
                          
                        }
                      });
    
                     // Recarga la página después de mostrar la notificación
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
                    error={formik.errors.fecha_nacim}
                />
                <label htmlFor="" className='label1'>Especie</label>
                <Form.Select
                    name="especie"
                    options={especiesOptions}
                    placeholder="Selecciona la especie"
                    value={formik.values.especie}
                    onChange={(e, { value }) => formik.setFieldValue("especie", value)}
                    error={formik.errors.especie}
                />

                <label htmlFor="" className='label1'>Raza</label>
                <Form.Input
                    name="raza"
                    placeholder="Raza de la mascota"
                    value={formik.values.string}
                    onChange={formik.handleChange}
                    error={formik.errors.raza}
                />
                <label htmlFor="" className='label1'>Descripción</label>
                <Form.TextArea
                    name="descripcion"
                    placeholder="Descripción de la mascota"
                    value={formik.values.string}
                    onChange={formik.handleChange}
                    error={formik.errors.string}
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
    return {
      fecha_nacim: Yup.date()
      .max(new Date(), 'La fecha de nacimiento no puede ser posterior a hoy')
      .required('La fecha de nacimiento es obligatoria'),
      imagen: Yup.mixed().required('Imagen obligatoria')
      .test('fileFormat', 'Formato de imagen no válido', (value) => {
        if (value) {
          const supportedFormats = ['image/jpeg', 'image/png', 'image/gif']; // Lista de formatos de imagen admitidos
          return supportedFormats.includes(value.type);
        }
        return true; // Si no se proporciona ninguna imagen, la validación pasa
      }),
      raza: Yup.string()
      .matches(/^[a-zA-Z]+$/, 'La raza solo puede contener letras')
      .required('La raza es obligatoria'),
      
    };
  }