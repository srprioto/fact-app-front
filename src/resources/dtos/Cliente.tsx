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

export const clienteGet = {
    estadoCliente: "",
    documento: "",
    tipoDocumento: "",
    ruc: 0,
    nombre: "",
    razonSocial: "",
    estado: "",
    condom: "",
    ubigeo: 0,
    tvia: "",
    nvia: "",
    czona: "",
    tzona: "",
    numero: 0,
    interior: "",
    lote: "",
    dpto: "",
    mz: "",
    km: "",
    direccion: "",
    departamento: "",
    provincia: "",
    distrito: "",
    telefono: "",
    email: "",
}