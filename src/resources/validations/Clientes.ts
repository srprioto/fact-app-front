import * as Yup from 'yup';

export const ValidCreateCliente = Yup.object({

    nombre: Yup.string().required('Requerido'),
    documento: Yup.string().required('Requerido'),
    direccion: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    email: Yup.string().required('Requerido'),

})
                
