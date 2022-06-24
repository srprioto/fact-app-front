export function zeroFill( number:number, width:number = 7 ){

    let nro:number = Number(number);

    width -= nro.toString().length;
    if ( width > 0 )
    {
        return new Array( width + (/\./.test( nro.toString() ) ? 2 : 1) ).join( '0' ) + nro;
    }
    return nro + ""; // siempre devuelve tipo cadena
}

// console.log( zeroFill(324, 5) );