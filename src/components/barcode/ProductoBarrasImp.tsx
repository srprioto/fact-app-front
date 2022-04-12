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
        marginTop: 5,
        marginBottom: 0,
        marginLeft: 20,
        marginRight: 20,
        height: 40,
        fontSize: 15
    }

    const { inputRef } = useBarcode({
        value: value,
        options: options
    });

    // estilos
    const container = {
        width: "320px",
        margin: "0"   
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
        margin: "0"
    }

    const subTitulo = {
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
            <div style={titulo}>
                <svg ref={inputRef}/>
            </div>
        </div>
    )
}
