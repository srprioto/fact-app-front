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

export const fechaResumenGuiones = (fecha:any) => {
    const newFecha:any = DateTime
        .fromISO(fecha)
        .setZone('UTC')
        .setLocale('es')
        .toFormat('dd-LL-yy');
    return newFecha
}

export const fechaNoHora = (fecha:any) => {
    const newFecha:any = DateTime
        .fromISO(fecha)
        .setZone('UTC')
        .setLocale('es')
        .toFormat('dd LLL yyyy');
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
export const ahora = () => { 
    return DateTime.now().setZone('America/Lima').toISO();
}

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


export const formatoConSlashJson = (fecha:string) => { 
    return {
        day: fecha.split('/')[0],
        month: fecha.split('/')[1],
        year: fecha.split('/')[2]
    }
}


export const formatoConSlash = (fecha:string) => {
    const resto:any = formatoConSlashJson(fecha);
    return DateTime
        .fromObject(resto)
        .setZone('UTC')
        .setLocale('es')
        .toFormat('dd LLL yyyy')
}
