export interface ProveedoresDto {
    id:string;
    nombre:string;
    razon_social:string;
    direccion:string;
    telefono:string;
    tel_movil:string;
    tipo_documento:string;
    documento:string;
    email:string;
    nombre_banco:string;
    nro_cuenta_bancaria:string;
    nombre_titular:string;
    created_at:string;
    updated_at:string;
}

export interface CreateProveedoresDto{
    nombre:string;
    razon_social:string;
    tipo_documento:string;
    documento:string;
    direccion:string;
    telefono:string;
    tel_movil:string;
    email:string;
    nombre_banco:string;
    nro_cuenta_bancaria:string;
    nombre_titular:string;
}