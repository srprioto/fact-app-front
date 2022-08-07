// import { useState } from "react";
import { useBarcode } from "react-barcodes";

interface productoBarrasImp{
    value:string;
    nombre?:string;
    color?:string
    talla?:string
    cambiarColor?:boolean;
}

export const ProductoBarrasImp = ({ value, nombre, color, talla }:productoBarrasImp) => {

    const options = {
        background: "transparent",
        lineColor: "#000",
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        height: 30,
        width: 1.2,
        fontSize: 15,
        // displayValue: false
    }

    const { inputRef } = useBarcode({
        value: value,
        options: options
    });

    // estilos
    const container = {
        maxWidth: "160px",
        margin: "0",
        lineHeight: "1"
    }

    const titulo = {
        display: "flex",
        justifyContent: 'center',
        color: "#000",
        margin: "0"
    }

    const boxSubTitulo = {
        display: "flex",
        justifyContent: 'space-around',
        margin: "0",
        // lineHeight: "1"
    }

    const subTitulo = {
        color: "#000",
        margin: "0"
    }

    const barras:any = {
        // display: "flex",
        // justifyContent: 'center',
        textAlign: "center",
        color: "#000",
        margin: "0"
    }


    return (
        <div style={container}>
            { nombre && <h4 style={titulo}>{ nombre }</h4> }
            <div style={boxSubTitulo}>
                { color && <h4 style={subTitulo}>Color: <strong>{ color }</strong></h4> }
                { talla && <h4 style={subTitulo}>Talla: <strong>{ talla }</strong></h4> }
            </div>
            <div style={barras}>
                <svg ref={inputRef}/>
            </div>
        </div>
    )
}
