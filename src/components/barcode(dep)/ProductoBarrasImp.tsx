var Barcode = require('react-barcode');

interface productoBarrasImp{
    producto?:any;
    totalBarras?:number;
}

export const ProductoBarrasImp = ({ producto, totalBarras }:productoBarrasImp) => {

    // const options = {
    //     background: "transparent",
    //     lineColor: "#000",
    //     marginTop: 0,
    //     marginBottom: 0,
    //     marginLeft: 0,
    //     marginRight: 0,
    //     height: 30,
    //     width: 1.2,
    //     fontSize: 15,
    //     // displayValue: false
    // }

    // const { inputRef } = useBarcode({
    //     value: producto.codigo,
    //     options: options
    // });

    // estilos

    const container = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr"
    }

    const codigoBarras = {
        // maxWidth: "160px",
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
            {/* {
                [...Array(totalBarras)].map(() => { 
                    return (
                        <div style={codigoBarras}>
                            { producto.nombre && <h4 style={titulo}>{ producto.nombre }</h4> }
                            <div style={boxSubTitulo}>
                                { producto.color && <h4 style={subTitulo}>Color: <strong>{ producto.color }</strong></h4> }
                                { producto.talla && <h4 style={subTitulo}>Talla: <strong>{ producto.talla }</strong></h4> }
                            </div>
                            <div style={barras}>
                                <canvas ref={inputRef}/>
                            </div>
                        </div>
                    )
                })
            } */}

            <div style={codigoBarras}>
                { producto.nombre && <h4 style={titulo}>{ producto.nombre }</h4> }
                <div style={boxSubTitulo}>
                    { producto.color && <h4 style={subTitulo}>Color: <strong>{ producto.color }</strong></h4> }
                    { producto.talla && <h4 style={subTitulo}>Talla: <strong>{ producto.talla }</strong></h4> }
                </div>
                <div style={barras}>
                    {/* <svg ref={inputRef}/> */}
                </div>
            </div>
            
        </div>
    )
}

