import * as Yup from 'yup';

export const ValidVentaEmail = Yup.object({
    email: Yup.string().email('Formato de Email invaido').required('Requerido')
})