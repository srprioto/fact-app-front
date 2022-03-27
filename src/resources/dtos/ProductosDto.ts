export interface ProductosDto {
    id:number;
    codigo:string;
    nombre:string;
    descripcion:string;
    localesStock:any;
    marca:string;
    color:string;
    talla:string;
    // precio_compra:number;
    precio_venta_1:number;
    precio_venta_2:number;
    precio_venta_3:number;
    usuarioId:number;
    created_at:string;
    updated_at:string;

}

export interface CreateProductosDto {
    id?:number|null|undefined;
    codigo?:string;
    nombre?:string;
    descripcion?:string;
    marca?:string;
    color?:string;
    talla?:string;
    // precio_compra?:number;
    precio_venta_1?:number;
    precio_venta_2?:number;
    precio_venta_3?:number;
    usuarioId?:number|null;
    categoriasId?:number|null;

}

export interface EditarProductosDto{
    codigo:string;
    color:string;
    descripcion:string;
    marca:string;
    nombre:string;
    // precio_compra:number;
    precio_venta_1:number;
    precio_venta_2:number;
    precio_venta_3:number;
    talla:string;
    created_at:string;
    updated_at:string;
    localesStock?:any;
    categorias?:any;
    usuarios?:any;
}
