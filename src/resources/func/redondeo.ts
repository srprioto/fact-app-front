export function redondeo (nro:number):number {
    return Number(Math.round((nro + Number.EPSILON) * 100) / 100);
}

export const fixRedondeo = (nro:number) => { // revisar formula
    const fixNro = Number(nro.toFixed());
    if (fixNro > nro) {
        const diferencia = fixNro - nro;
        if (diferencia < 0.09) {
            return fixNro
        } else {
            return nro
        }
    } else {
        const diferencia = nro - fixNro;
        if (diferencia < 0.09) {
            return fixNro
        } else {
            return nro 
        }
    }
}
