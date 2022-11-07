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

    // .startOf('day')
    // .plus({day:1})
    // .minus({second:1})

    return [
        inidioDia,
        finDia
    ];
}
