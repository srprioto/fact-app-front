import * as Yup from 'yup';

export const validSearchProd = (totalDigitos:number) => { 
    return Yup.object({
        value: Yup
        .string()
        .required('Requerido')
        .min(totalDigitos, `Necesita ${totalDigitos} digitos exactamente`)  
    })
}
