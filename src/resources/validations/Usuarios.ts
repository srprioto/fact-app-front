import * as Yup from 'yup';

export const ValidCreateUsuario = Yup.object({

    nombre: Yup.string().required('Requerido'),
    documento: Yup.string().required('Requerido'),
    direccion: Yup.string().required('Requerido'),
    edad: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    email: Yup.string().required('Requerido'),
    password: Yup.string().required('Requerido'),
    rolesId: Yup.string().required('Requerido'),

})

export const ValidEditUsuario = Yup.object({

    nombre: Yup.string().required('Requerido'),
    documento: Yup.string().required('Requerido'),
    direccion: Yup.string().required('Requerido'),
    edad: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    email: Yup.string().required('Requerido'),
    // password: Yup.string().required('Requerido'),
    // rolesId: Yup.string().required('Requerido'),

})
