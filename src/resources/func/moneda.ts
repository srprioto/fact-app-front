export const moneda = (nro:number|string) => { 

    const valor:number = Number(nro)

    const value = new Intl.NumberFormat('es', {
        style: 'currency',
        currency: 'PEN',
    }).formatToParts(valor).map(
        p => p.type !== 'literal' && p.type !== 'currency' ? p.value : ''
    ).join('');

    return value;
}