import * as Yup from 'yup';

export const ValidCreateCliente = Yup.object({

    nombre: Yup.string().required('Requerido'),
    documento: Yup.string().required('Requerido'),
    direccion: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido'),
    email: Yup.string().required('Requerido'),

})

export const ValidClienteDni = Yup.object({
    // numero_documento: Yup.string().required('Requerido'),
    nombre: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido')
    // direccion: Yup.string().required('Requerido'),
    // email: Yup.string().required('Requerido'),
})

export const ValidClienteRuc = Yup.object({
    // numero_documento: Yup.string().required('Requerido'),
    razonSocial: Yup.string().required('Requerido'),
    direccion: Yup.string().required('Requerido'),
    telefono: Yup.string().required('Requerido')
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



