export interface infoCredito {
    cantidad_pagada:number;
    nota:string;
    fecha_estimada:Date;
    estado:boolean;
    ventas:number;

    forma_pago:string;
    estado_producto:boolean;
    mod_estado_prod:boolean;
    localId:number|string;
}

export const infoCreditoDto = {
    cantidad_pagada: 0,
    nota: "",
    fecha_estimada: new Date(),
    forma_pago: "efectivo",
    estado: true
}
