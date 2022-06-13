export interface ClienteDto {
    id?:number;
    nombre:string;
    direccion:string;
    telefono:string;
    documento:string;
    email:string;
    created_at:string;
    updated_at:string;
}


// export const clienteInfo = {
//     estadoCliente: "",
//     tipoDocumento: "",
//     tipoComprobante: "",
//     numero_documento: "",
//     nombre: "",
//     razonSocial: "",
//     nombreComercial: "",
//     ubigeo: 0,
//     direccion: "",
//     email: "",
//     telefono: "",
//     codigo_pais: "",
//     departamento: "",
//     provincia: "",
//     distrito: "",
//     estado: "",
//     condom: "",
// }

export const clienteInfo = (serie:string) => { 
    return {
        estadoCliente: "",
        tipoDocumento: "",
        serie_documento: serie,
        numero_documento: "",
        nombre: "",
        razonSocial: "",
        nombreComercial: "",
        ubigeo: 0,
        direccion: "",
        email: "",
        telefono: "",
        codigo_pais: "",
        departamento: "",
        provincia: "",
        distrito: "",
        estado: "",
        condom: "",
    }
}