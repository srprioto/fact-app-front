export const negative = (nro:number|string) => { 
    if (Number(nro) > 0) {
        return Number("-" + nro)
    } else if (Number(nro) < 0) {
        return Number(nro)
    } else {
        return 0;
    }
}