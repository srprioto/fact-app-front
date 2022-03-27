export function redondeo (nro:number):number {
    return Math.round((nro + Number.EPSILON) * 100) / 100;
}