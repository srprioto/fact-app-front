import * as Yup from 'yup';

export const ValidCreateCliente = Yup.object({

    nombre: Yup.string().required('Requerido'),
    documento: Yup.string().required('Requerido'),
    direccion: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    email: Yup.string().required('Requerido'),

})

// validacion desde vender o cobrar
export const ValidClienteDni = Yup.object({
    // numero_documento: Yup.string().required('Requerido'),
    nombre: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido').matches(/^[0-9]+$/, "Requiere solo numeros")
    // direccion: Yup.string().required('Requerido'),
    // email: Yup.string().required('Requerido'),
})

export const ValidClienteRuc = Yup.object({
    // numero_documento: Yup.string().required('Requerido'),
    razonSocial: Yup.string().required('Requerido'),
    direccion: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido').matches(/^[0-9]+$/, "Requiere solo numeros")
})

export const ValidDocumento = (tipoDoc:string) => { 
    let totalDigitos:number = 0;
    if (tipoDoc === "DNI") {
        totalDigitos = 8;
    } else if (tipoDoc === "RUC") {
        totalDigitos = 11;
    }
    return Yup.object({
        documento: Yup
            .string()
            .required('Requerido')
            .matches(/^[0-9]+$/, "Requiere solo numeros")
            .min(totalDigitos, `Necesita ${totalDigitos} digitos exactamente`)
            .max(totalDigitos, `Necesita ${totalDigitos} digitos exactamente`)
    })
}


// validacion desde registro
export const ValidRegistroClienteDni = Yup.object({
    numero_documento: Yup
        .string()
        .required('Requerido')
        .matches(/^[0-9]+$/, "Requiere solo numeros")
        .min(8, `Necesita 8 digitos exactamente`)
        .max(8, `Necesita 8 digitos exactamente`),
    nombre: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido').matches(/^[0-9]+$/, "Requiere solo numeros"),
    direccion: Yup.string().required('Requerido'),
    email: Yup.string().email('Formato de Email invaido').required('Requerido'),
    ubigeo: Yup.string().matches(/^[0-9]+$/, "Requiere solo numeros")
})

export const ValidRegistroClienteRuc = Yup.object({
    numero_documento: Yup
        .string()
        .required('Requerido')
        .matches(/^[0-9]+$/, "Requiere solo numeros")
        .min(11, `Necesita 11 digitos exactamente`)
        .max(11, `Necesita 11 digitos exactamente`),
    razonSocial: Yup.string().required('Requerido'),
    direccion: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido').matches(/^[0-9]+$/, "Requiere solo numeros"),
    email: Yup.string().email('Formato de Email invaido').required('Requerido'),
    ubigeo: Yup.number(),
})





