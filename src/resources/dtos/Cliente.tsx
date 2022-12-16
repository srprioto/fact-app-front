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

export const initialCrearCliente = {
    tipoDocumento: "DNI",
    numero_documento: "",
    razonSocial: "",
    nombreComercial: "",
    codigo_pais: "",
    departamento: "",
    provincia: "",
    distrito: "",
    nombre: "",
    direccion: "",
    telefono: "",
    email: "",
    ubigeo: 0,
    estado_cliente: ""
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

export const clienteInfo = {
    estadoCliente: "",
    tipoDocumento: "",
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