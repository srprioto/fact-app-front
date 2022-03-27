import * as Yup from 'yup';

export const ValidCreateProveedores = Yup.object({

    nombre:Yup.string().required('Requerido'),
    razon_social:Yup.string().required('Requerido'),
    tipo_documento:Yup.string().required('Requerido'),
    documento:Yup.string().required('Requerido'),
    direccion:Yup.string().required('Requerido'),
    telefono:Yup.string().required('Requerido'),
    tel_movil:Yup.string().required('Requerido'),
    email:Yup.string().required('Requerido'),
    nombre_banco:Yup.string().required('Requerido'),
    nro_cuenta_bancaria:Yup.string().required('Requerido'),
    nombre_titular:Yup.string().required('Requerido')

})