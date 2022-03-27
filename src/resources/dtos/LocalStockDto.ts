export interface LocalStockDto{
    cantidad:any;
    localesId?:number;
    productosId?:number;
}


export interface LocalStockModalDto {
    id?:number;
    cantidad:number;
    nombreProducto?:string;
}