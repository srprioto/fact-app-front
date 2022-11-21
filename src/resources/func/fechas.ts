import { DateTime } from "luxon";

// solo lectura
export const fecha = (fecha:any) => {
    const newFecha:any = DateTime
        .fromISO(fecha)
        .setZone('UTC')
        .setLocale('es')
        .toFormat('dd LLL yyyy - HH:mm');
    return newFecha
}

export const fechaResumen = (fecha:any) => {
    const newFecha:any = DateTime
        .fromISO(fecha)
        .setZone('UTC')
        .setLocale('es')
        .toFormat('dd/LL/yy-HH:mm');
    return newFecha
}

export const fechaNoHora = (fecha:any) => {
    const newFecha:any = DateTime
        .fromISO(fecha)
        .setZone('UTC')
        .setLocale('es')
        .toFormat('dd/LL/yyyy');
    return newFecha
}

export const fechaActualJs = (fecha:any) => {
    const newFecha:any = DateTime
        .fromJSDate(fecha)
        .setZone('UTC')
        .setLocale('es')
        .toFormat('dd/LL/yyyy');
    return newFecha
}

// fechas del mes
export const inicioMes = () => { 
    return DateTime
        .now()
        .startOf('month')
        .toISO();
}

export const finMes = () => { 
    return DateTime
        .now()
        .endOf('month')
        .toISO();
}

export const fechaInicioFinMes = () => { 
    const inicio:string = inicioMes();
    const fin:string = finMes();
    return [
        inicio,
        fin
    ];
}


// solo escritura
export const fechaInicioFin = () => { 
    const inidioDia = DateTime
        .now()
        .startOf('day')
        .toISO();

    const finDia = DateTime
        .now()
        .endOf('day')
        .toISO();

    return [
        inidioDia,
        finDia
    ];
}

export const timeAgo = (fecha:any) => {
    return DateTime
        .fromISO(fecha)
        .setLocale('es')
        .toRelative();
};
