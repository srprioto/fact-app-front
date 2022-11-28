import { useEffect, useRef } from "react";
import { fechaActualJs, fechaResumen } from "../../../../../resources/func/fechas";
import { moneda } from "../../../../../resources/func/moneda";

interface impCreditoAdel {
    ventaUpdate:any;
    setImprimir:Function;
}

export const ImpCreditoAdel = ({ ventaUpdate, setImprimir }:impCreditoAdel) => {

    const imprimir = useRef<any>(null);

    const cliente = ventaUpdate.clientes;
    const ventaDetalles = ventaUpdate.ventaDetalles;
    const creditoDetalles = ventaUpdate.creditoDetalles;

    useEffect(() => {
        handlerPrint();
    }, [])


    const handlerPrint = () => { 
        let ventimp:any = window.open(' ', 'popimpr');
        ventimp.document.write( imprimir.current.innerHTML );
        ventimp.document.close();
        ventimp.print();
        ventimp.close();
        setImprimir(false);
    }

    const cancelado = () => { 
        if (
            Number(ventaUpdate.total) === Number(ventaUpdate.totalPagado) &&
            ventaUpdate.estado_producto
        ) {
            return true;
        } else {
            return false;
        }
    }

    // estilos
    // generales
    const container:any = {
        // maxWidth: "400px"
        fontFamily: "Helvetica"
    };
    const center:any = {
        textAlign: "center",
    }
    const m0:any = {
        margin: "0"
    }
    const mb10 = {
        margin: "0 0 8px 0",
    }
    const left:any = {
        textAlign: "left",
        display: "inline-block",
        width: "35%"
    }
    const right:any = {
        textAlign: "right",
        display: "inline-block",
        width: "64%"
    }
    // const w100:any = {
    //     width: "100%"
    // }
    // const border:any = {
    //     borderBottom: "1px solid #000",
    //     margin: "4px 0"
    // }
    const borderMb:any = {
        borderBottom: "1px solid #000",
        marginBottom: "8px"
    }
    const texto = {
        fontFamily: "arial",
        fontWeight: "100",
        fontSize: "11px",
    }
    const lowercase:any = {
        textTransform: "lowercase"
    }    

    // header
    // const tituloPrinc = {
    //     ...mb10,
    //     ...texto,
    //     fontSize: "16px",
    // }

    const headerInfo:any = {
        ...mb10,
        padding: "0 10px",
        fontWeight: "100",
        fontFamily: "arial",
        fontSize: "13px",
    }

    const boxHeaderInfo:any = {
        ...center,
        ...mb10
    }

    // empresa
    const infoEmpresa = {
        ...texto,
        ...mb10
    }

    const infoTxtM0 = {
        ...texto,
        ...m0
    }

    // cliente


    // body
    const tituloDetalles:any = {
        ...texto,
        textAlign: "center",
        margin: "0 0 5px 0"
    }
    const table:any = {
        borderCollapse: "separate",
        borderSpacing: "10px 0"
    }
    const detalles:any = {
        width: "100%"
    }
    const blockLeft:any = {
        display: "inline-block",
        width: "35%"
    }
    const blockRight:any = {
        display: "inline-block",
        width: "64%"
    }

    // detalles
    // const textoResumen = {
    //     ...texto,
    //     ...mb10,
    //     ...w100
    // }

    // codigo qr    
    // const qrcode = {
    //     margin: "15px 0"
    // }
    // const descripcion = {
    //     ...texto,
    //     ...mb10,
    //     ...center
    // }


    return (

        <div className="none imprimir-comprobante">
            <div style={container} ref={imprimir}>
                
                <div style={boxHeaderInfo}>
                    <h3 style={{...center, ...texto}}>Comprobante de {ventaUpdate.estado_producto ? "credito" : "adelanto"}</h3>
                    <span style={headerInfo}>
                    {ventaUpdate.id + "-" + ventaUpdate.codigo_venta}
                    </span>
                    <span style={headerInfo}>{ fechaResumen(ventaUpdate.updated_at) }</span>
                </div>
                
                <div style={boxHeaderInfo}>
                    <h3 style={infoEmpresa}>AddidSport</h3> {/*  actualizar por nombre de empresa desde DB */}
                    <h2 style={infoEmpresa}>INVERSIONES PERKINS E.I.R.L</h2> {/*  actualizar */}
                </div>
                <div style={borderMb} />
                {
                    !!cliente.numero_documento
                    && (
                        <div style={mb10}>
                            { !!cliente.nombre && <p style={infoTxtM0}>Cliente: { cliente.nombre }</p> }
                            { !!cliente.razonSocial && <p style={infoTxtM0}>Razon Social: { cliente.razonSocial }</p> }

                            <p style={infoTxtM0}>{ cliente.tipoDocumento }: { cliente.numero_documento }</p>

                            { !!cliente.direccion && <p style={infoTxtM0}>Direc: { cliente.direccion }</p> }
                            { !!cliente.telefono && <p style={infoTxtM0}>Tel: { cliente.telefono }</p> }
                            
                        </div>
                    )
                }

                <div style={borderMb} />

                <div style={mb10}>
                    <h3 style={tituloDetalles}>Detalles de {ventaUpdate.estado_producto ? "credito" : "adelanto"}</h3>
                    <table style={table}>
                        <thead>
                            <tr style={texto}>
                                <th>Cant. pagada</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                creditoDetalles.map((e:any, index:number) => {
                                    return (
                                        <tr key={index} style={texto}>
                                            <td>S/.{ moneda(e.cantidad_pagada) }</td>
                                            <td>{ fechaActualJs(new Date()) }</td>
                                            {/* <td>{ e.fecha_estimada }</td> */}
                                        </tr>            
                                    );                                
                                })
                            }
                        </tbody>
                    </table>
                </div>

                <div style={detalles}>
                    <div style={blockLeft}></div>
                    <div style={blockRight}>
                        <div>
                            <span style={{...left, ...texto}}>PAGADO:</span>
                            <span style={{...right, ...texto}}>S/. { moneda(ventaUpdate.totalPagado) }</span>
                        </div>
                    </div>
                </div>

                <div style={borderMb} />

                <div style={mb10}>
                    <h3 style={tituloDetalles}>Detalles de venta</h3>
                    <table style={table}>
                        <thead>
                            <tr style={texto}>
                                {/* <th>Cod</th> */}
                                <th>Prod</th>
                                <th>Cant</th>
                                <th>P.U.</th>
                                <th>P.Sv.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ventaDetalles.map((e:any) => {
                                    return (
                                        <tr key={e.id} style={texto}>
                                            {/* <td>{ e.productos.codigo }</td> */}
                                            <td style={lowercase}>{ 
                                                e.productos.nombre + " - " +
                                                e.productos.marca + " - " +
                                                e.productos.talla + " - " +
                                                e.productos.color
                                            }</td>
                                            <td>{ e.cantidad_venta }</td>
                                            <td>S/.{ moneda(e.precio_venta) }</td>
                                            <td>S/.{ moneda(e.precio_parcial) }</td>
                                        </tr>            
                                    );                                
                                })
                            }
                            
                        </tbody>
                    </table>
                </div>

                <div style={detalles}>
                    <div style={blockLeft}></div>
                    <div style={blockRight}>
                        <div>
                            <span style={left}>Total:</span>
                            <span style={right}>S/. { moneda(ventaUpdate.total) }</span>
                        </div>
                    </div>
                    <div>
                        <p style={{...texto, ...center}}>
                            Estado del producto: {ventaUpdate.estado_producto ? "ENTREGADO" : "SIN ENTREGAR"}
                        </p>

                        {
                            cancelado()
                            && <h1 style={{...texto, ...center}}>¡CANCELADO!</h1>
                        }

                    </div>
                </div>

                <p style={center}>Representacion impresa del comprobante electronico</p>

            </div>
        </div>
    )
}

// {
//     "id": 469,
//     "codigo_venta": "00031",
//     "created_at": "2022-10-21T06:47:37.843Z",
//     "estado_producto": true,
//     "subtotal": "65.00",
//     "total": "65.00",
//     "totalPagado": 18,
//     "clientes": { ... },
//     "ventaDetalles": [ ... ],
//     "creditoDetalles": [ ... ]
// }