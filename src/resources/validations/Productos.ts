import * as Yup from 'yup';

export const ValidCreateProduct = Yup.object({

    codigo:Yup.string().required('Requerido'),
    nombre:Yup.string().required('Requerido'),
    descripcion:Yup.string().required('Requerido'),
    marca:Yup.string().required('Requerido'),
    color:Yup.string().required('Requerido'),
    talla:Yup.string().required('Requerido'),
    // precio_compra:Yup.number().required("Requiere un numero").positive().integer(),
    precio_venta_1:Yup.number().required("Requiere un numero").positive().integer(),
    precio_venta_2:Yup.number().required("Requiere un numero").positive().integer(),
    precio_venta_3:Yup.number().required("Requiere un numero").positive().integer()
    
})
