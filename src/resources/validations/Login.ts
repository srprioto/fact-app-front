import * as Yup from 'yup';

export const ValidLogin = Yup.object({
    email:Yup.string().required('Requerido'),
    password:Yup
        .string()
        .required('Requerido')
        .min(6, `Necesita al menos 6 digitos`)
        .max(18, `No se puede ingresar mas de 18 caracteres`)
})