// import { useState } from 'react';
// import { useBarcode } from 'react-barcodes';

interface productoBarras{
    value:string;
    nombre?:string;
    color?:string
    talla?:string
    marca?:string
    cambiarColor?:boolean;
}

export const ProductoBarras = ({ value, nombre, color, marca, talla }:productoBarras) => {

    const options = {
        background: "transparent",
        lineColor: "#cecece",
        marginTop: 5,
        marginBottom: 0,
        marginLeft: 20,
        marginRight: 20,
        height: 40,
        fontSize: 15
    }

    // const { inputRef } = useBarcode({
    //     value: value,
    //     options: options
    // });

    return (
        <div className="producto-barras center">
            <div className="wrap-barcode pt-10">
                { nombre && <h4 className="m-0">{ nombre }</h4> }
                <div className="grid-2 gap">
                    { color && <h5 className="m-0">Color: <strong>{ color }</strong></h5> }
                    { talla && <h5 className="m-0">Talla: <strong>{ talla }</strong></h5> }
                    {/* { marca && <h4 className="m-0">Marca: { marca }</h4> } */}
                </div>                
                {/* <svg ref={inputRef} className="mb-5" /> */}
            </div>
        </div>
    )
}





