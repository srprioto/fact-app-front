var Barcode = require('react-barcode');

interface productoCodBarras {
    producto:any;
    totalBarras:number;
    precio:boolean;
}

export const ProductoCodBarras = ({ producto, totalBarras, precio }:productoCodBarras) => {

    // estilos

    const fontFam:any = {
        fontFamily: "Helvetica"
    }

    const container = {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridGap: "40px 30px",
        margin: "0 20px"
    }

    const tituloEmpresa:any = {
        color: "#000",
        textAlign: "center",
        margin: "0",
        ...fontFam
    }

    const codigoBarras = {
        // maxWidth: "160px",
        margin: "0",
        lineHeight: "1"
    }

    const titulo:any = {
        ...fontFam,
        display: "flex",
        justifyContent: 'center',
        textTransform: "lowercase",
        color: "#000",
        margin: "0 5px",
        fontSize: "15px",
        width: "230px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }

    const boxSubTitulo = {
        display: "flex",
        justifyContent: 'space-around',
        margin: "0 5px",
        // lineHeight: "1"
        fontSize: "14px"
    }

    const subTitulo = {
        color: "#000",
        margin: "0 10px 0 0",
        fontSize: "14px",
        ...fontFam
    }

    // const precio:any = {
    //     color: "#000",
    //     position: "absolute",
    //     right: "0px",
    //     bottom: "0px"
    // }

    const barras:any = {
        // display: "flex",
        // justifyContent: 'center',
        textAlign: "center",
        color: "#000",
        margin: "0",
        position: "relative",
    }

    return (
        <div style={container}>
            {
                [...Array(totalBarras)].map((e:any, index:number) => { 
                    return (
                        <div style={codigoBarras} key={index}>
                            <h3 style={tituloEmpresa}>AddidSport</h3>
                            { producto.nombre && <h4 style={titulo}>{ producto.nombre } { producto.marca }</h4> }
                            <div style={boxSubTitulo}>
                                {
                                    precio
                                    && (
                                        producto.precio_venta_1 && 
                                        <h4 style={subTitulo}>
                                            <strong> S/. { producto.precio_venta_1 }</strong>
                                        </h4> 
                                    )
                                }
                                { 
                                    producto.color && 
                                    <h4 style={subTitulo}>
                                        <strong>{ producto.color }</strong>
                                    </h4> 
                                }
                                { 
                                    producto.talla && 
                                    <h4 style={subTitulo}>
                                        <strong>{ producto.talla }</strong>
                                    </h4> 
                                }
                            </div>
                            <div style={barras}>
                                <Barcode 
                                    value={producto.codigo}
                                    background='transparent'
                                    height={40}
                                    fontSize={13}
                                    textAlign="left"
                                />
                            </div>
                        </div>
                    )
                })
            }

            {/* <div style={codigoBarras}>
                { producto.nombre && <h4 style={titulo}>{ producto.nombre }</h4> }
                <div style={boxSubTitulo}>
                    { producto.color && <h4 style={subTitulo}>Color: <strong>{ producto.color }</strong></h4> }
                    { producto.talla && <h4 style={subTitulo}>Talla: <strong>{ producto.talla }</strong></h4> }
                </div>
                <div style={barras}>
                    <Barcode 
                        value={producto.codigo}
                        background='transparent'
                    />
                </div>
            </div> */}
            
        </div>
    )
}
