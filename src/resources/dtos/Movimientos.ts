export interface MovimientosDto {
    subtotal:number;
    costo_transporte:number;
    costo_otros:number;
    total:number;
    observaciones:string;
    local_destino:number;
    usuarioId:number;
    movimiento_detalles:any;
}

// export const movProd = {
//     subtotal: 0,
//     costo_transporte: 0,
//     costo_otros: 0,
//     total: 0,
//     observaciones: "",
//     local_destino: 0,
//     usuarioId: 1,
//     movimiento_detalles: []
// }

export const movProductos = (usuarioId:any) => { 
    return {
        subtotal: 0,
        costo_transporte: 0,
        costo_otros: 0,
        total: 0,
        observaciones: "",
        local_destino: 0,
        usuarioId: usuarioId,
        movimiento_detalles: []
    }
}