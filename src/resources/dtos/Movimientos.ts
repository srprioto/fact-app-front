export interface MovimientosDto {
    subtotal:number;
    costo_transporte:number;
    costo_otros:number;
    total:number;
    observaciones:string;
    movimiento_detalles:any;
}

export const movProd = {
    subtotal: 0,
    costo_transporte: 0,
    costo_otros: 0,
    total: 0,
    observaciones: "",
    movimiento_detalles: []
}