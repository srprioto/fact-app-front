export interface MovimientoDetallesDto {
    producto:infoProducto;
    proveedor:infoProveedor;
    cantidad:number;
    precio_unidad:number;
    precio_parcial:number;
    descripcion:string;
}

export interface infoProducto {
    id:number;
    nombre:string;
    
}

export interface infoProveedor {
    id:number;
    nombre:string;
}


// estructura
export const detalles:MovimientoDetallesDto = {
    producto:{
        id: 0,
        nombre: "",
    },
    proveedor:{
        id: 0,
        nombre: ""
    },
    cantidad: 0,
    precio_unidad: 0,
    precio_parcial: 0,
    descripcion:""
}