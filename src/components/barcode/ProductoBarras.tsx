import { useState } from 'react';
import { useBarcode } from 'react-barcodes';
import { Checkbox2 } from '../forms/Checkbox2';

interface ProductoBarras{
    value:string;
    nombre?:string;
    color?:string
    talla?:string
    marca?:string
    cambiarColor?:boolean;
}

export const ProductoBarras = ({ value, nombre, color, talla, marca, cambiarColor }:ProductoBarras) => {

    const [changeColor, setChangeColor] = useState<boolean>(false)
    const [options, setOptions] = useState<any>({
        background: "transparent",
        lineColor: "#fff",
        marginTop: 5,
        marginBottom: 0,
        marginLeft: 20,
        marginRight: 20,
        height: 65,
        fontSize: 15
    })

    const handlerColor = () => { 
        if (changeColor) {
            setOptions({
                ...options,
                background: "#222736",
                lineColor: "#fff",
            })
        } else {
            setOptions({
                ...options,
                background: "#fff",
                lineColor: "#222736",
            })
        }
        setChangeColor(!changeColor)
    }

    const { inputRef } = useBarcode({
        value: value,
        options: options
    });

    return (
        <div className="producto-barras center">
            
            <div className="wrap-barcode pt-10">
                { nombre && <h4 className="m-0">{ nombre }</h4> }
                <div className="grid-2 gap">
                    { color && <h5 className="m-0">Color: <strong>{ color }</strong></h5> }
                    { talla && <h5 className="m-0">Talla: <strong>{ talla }</strong></h5> }
                    {/* { marca && <h4 className="m-0">Marca: { marca }</h4> } */}
                </div>                
                <svg ref={inputRef} className="mb-5" />
            </div>
            
            { 
                cambiarColor
                && (
                    <Checkbox2
                        label={changeColor ? "Oscurecer" : "Aclarar"}
                        name="changeColor"
                        checked={changeColor}
                        handlerCheck={handlerColor}
                    />
                )
            }

        </div>
    )
}





