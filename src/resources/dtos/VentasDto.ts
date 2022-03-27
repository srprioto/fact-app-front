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
    nombre_cliente:string;
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