import * as Yup from 'yup';

// const valMonto = 

export const ValidCreateIngresoEgreso = Yup.object({
    monto:Yup
        .number()
        .required('Requerido')
        .notOneOf([0], 'Añade un monto'),
    descripcion:Yup.string().required('Requerido'),    
})