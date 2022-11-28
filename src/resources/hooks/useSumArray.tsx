import { useState } from "react";

export const useSumArray = () => {

    const [subTotal, setSubTotal] = useState<number>(0);

    // let miCarrito = [
    //     {palabra: 'interdum.', cantidad: 1},
    //     {palabra: 'ipsum', cantidad: 1},
    //     {palabra: 'ipsum', cantidad: 1},
    //     {palabra: 'ipsum', cantidad: 1},
    //     {palabra: 'ipsum', cantidad: 1},
    //     {palabra: 'ipsum', cantidad: 1},
    //     {palabra: 'ipsum', cantidad: 1},
    //     {palabra: 'ipsum', cantidad: 1},
    //     {palabra: 'ipsum', cantidad: 1},
    //     {palabra: 'ipsum,', cantidad: 1},
    //     {palabra: 'ipsum.', cantidad: 1},
    //     {palabra: 'justo', cantidad: 1},
    //     {palabra: 'justo', cantidad: 1},
    // ]

    // const miCarritoSinDuplicados = miCarrito.reduce((acumulador:any, valorActual:any) => {
    //     const elementoYaExiste = acumulador.find((elemento:any) => elemento.palabra === valorActual.palabra);
    //     if (elementoYaExiste) {
    //         return acumulador.map((elemento:any) => {
    //             if (elemento.palabra === valorActual.palabra) {
    //                 return {
    //                     ...elemento,
    //                     cantidad: elemento.cantidad + valorActual.cantidad
    //                 }
    //             }

    //             return elemento;
    //         });
    //     }

    //     return [...acumulador, valorActual];
    // }, []);

    return subTotal;
}
