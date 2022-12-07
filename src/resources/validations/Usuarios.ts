import * as Yup from 'yup';

export const ValidCreateUsuario = Yup.object({
    nombre: Yup.string().required('Requerido'),
    documento: Yup.string().required('Requerido'),
    direccion: Yup.string().required('Requerido'),
    // edad: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    email: Yup.string().required('Req. usuario o email'),
    rolesId: Yup.string().required('Requerido'),
    localesId: Yup.string().required('Requerido'),
    password: Yup
        .string()
        .required('Requerido')
        .min(6, `Necesita al menos 6 digitos`)
        .max(18, `No se puede ingresar mas de 18 caracteres`)
})

export const ValidEditUsuario = Yup.object({
    nombre: Yup.string().required('Requerido'),
    documento: Yup.string().required('Requerido'),
    direccion: Yup.string().required('Requerido'),
    // edad: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    email: Yup.string().required('Req. usuario o email'),
    // password: Yup.string().required('Requerido'),
    // rolesId: Yup.string().required('Requerido'),
    // localesId: Yup.string().required('Requerido'),
})
