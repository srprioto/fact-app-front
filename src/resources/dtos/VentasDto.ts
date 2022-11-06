export interface ventaDetalles {
    productosId:number;
    codigo_producto:string;
    nombre_producto:string;
    precio_venta:number;
    precio_parcial:number;
    cantidad_venta:number;
    descuento:number;
    estado_venta_detalle:string;
    forzar_venta:boolean;
    venta_negativa:number;
}

export interface Venta {
    descuento_total:number;
    subtotal:number;
    total:number;
    codigo_venta:string;
    observaciones:string;
    estado_venta:string;
    ventaDetalles:Array<any>;
    localId:number; // id
    clienteId:number; // id
    usuarioId:number; // id
}

export const ventaDet = {
    productosId:0,
    codigo_producto: "",
    nombre_producto: "",
    talla: "",
    marca: "",
    cantidad_venta: 1,
    descuento: 0,
    precio_venta: 0,
    precio_parcial: 0,
    estado_venta_detalle:"enviado",
    forzar_venta:false,
    venta_negativa:0
}


// old

export interface ProductoDetalles {
    productosId:number;
    codigo_producto:string;
    nombre_producto:string;
    precio_venta:number;
    precio_parcial:number;
    cantidad_venta:number;
    descuento:number;
    estado_venta_detalle:string;
    forzar_venta:boolean;
    venta_negativa:number;
}

export interface Venta {
    descuento_total:number;
    subtotal:number;
    total:number;
    codigo_venta:string;
    observaciones:string;
    ventaDetalles:Array<any>;
    estado_venta:string;
    localId:number;
    clienteId:number;
    usuarioId:number;
}


export const productDetail = {
    productosId:0,
    codigo_producto: "",
    nombre_producto: "",
    cantidad_venta: 1,
    descuento: 0,
    estado_venta_detalle:"enviado",
    precio_venta: 0,
    precio_parcial: 0,
    forzar_venta:false,
    venta_negativa:0
}

export const tipoVenta = {
    factura: "factura",
    boleta: "boleta",
    venta_rapida: "venta rapida",
    credito: "credito",
    adelanto: "adelanto",
}

// export const forma_pago = {
//     efectivo: "efectivo"
//     tarjeta: "tarjeta"
//     pago_electronico: "pago_electronico"
//     deposito: "deposito"
// }