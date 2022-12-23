import { useEffect, useRef } from "react";
import { fechaResumen } from "../../resources/func/fechas";
import { moneda } from "../../resources/func/moneda";

interface reimpVenta {
    venta:any;
    setImprimir:Function;
    nuevo?:boolean;
}

export const ReimpVenta = ({ venta, setImprimir, nuevo }:reimpVenta) => {

    const imprimir = useRef<any>(null);

    // info comprobante
    // const correlativos:any = venta.locales.correlativos;
    // const correlativo:any = correlativos.find((e:any) => e.descripcion === venta.tipo_venta);
    // const serie:string = correlativo ? correlativo.serie : "V001";
    // const nuevoCorrelativo:string = correlativo ? correlativo.correlativo : "";
    // const existCorrelativo:string = venta.comprobante.length > 0 ? venta.comprobante[0].correlativo : "";
    // const esComprobante:boolean = venta.tipo_venta === tipoVenta.boleta || venta.tipo_venta === tipoVenta.factura;
    // const cliente:any = venta.clientes ? venta.clientes : {};
    const ventaDetalles:any = venta.ventaDetalles ? venta.ventaDetalles : {};
    
    // let subtotal:number = 0;
    // let igv:number = 0;
    // let tipoComprobante:string = "";
    // let tipoDocumento:string = "";
    // if (venta.tipo_venta === tipoVenta.boleta) {
    //     tipoComprobante = "03";
    // } else if (venta.tipo_venta === tipoVenta.factura) {
    //     tipoComprobante = "01";
    // }
    // if (cliente.tipoDocumento === "DNI") {
    //     tipoDocumento = "1"
    // } else if (cliente.tipoDocumento === "RUC") {
    //     tipoDocumento = "6"
    // } else if (
    //     cliente.tipoDocumento === "noDocumento" || 
    //     (!cliente.tipoDocumento && venta.tipo_venta === tipoVenta.boleta)
    // ) {
    //     tipoDocumento = "00"
    // }

    // const nroDocumento:string = tipoDocumento !== "00" ? cliente.numero_documento + "|" : "";

    // info empresa - requiere automatizar
    // const ruc:string = "20602956211";


    // if (!nuevo) {
    //     subtotal = Number(venta.subtotal / 1.18);
    //     igv = Number(venta.subtotal) - Number(subtotal);    
    // }

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


    const totalUnidades = ():number => { 
        let totalUnd:number = 0;
        ventaDetalles.forEach((e:any) => { 
            totalUnd += e.cantidad_venta;       
        })
        return totalUnd;
    }

    // const titulo = () => {
    //     if (venta.tipo_venta === tipoVenta.venta_rapida) {
    //         return "Nota de venta";
    //     } else if (venta.tipo_venta === tipoVenta.boleta){
    //         return "Boleta electronica";
    //     } else if (venta.tipo_venta === tipoVenta.factura){
    //         return "Factura electronica";
    //     } else {
    //         return "Comprobante electronico";
    //     }
    // }


    // const nroCorrelat = () => {
    //     if (nuevo) {
    //         // nueva impresion
    //         if (esComprobante) {
    //             return Number(nuevoCorrelativo) + 1;    
    //         } else {
    //             return ""
    //         }
    //     } else {
    //         // impresion existente
    //         if (esComprobante) {
    //             return existCorrelativo;
    //         } else {
    //             return "";
    //         }
            
    //     }
    // }  

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
    const w100:any = {
        width: "100%"
    }
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
        fontSize: "12px",
    }
    const lowercase:any = {
        textTransform: "lowercase"
    }    

    // header
    const tituloPrinc = {
        ...mb10,
        ...texto,
        fontSize: "16px",
    }

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
    const textoResumen = {
        ...texto,
        ...mb10,
        ...w100
    }

    // codigo qr
    // const qrcode = {
    //     margin: "15px 0"
    // }
    const descripcion = {
        ...texto,
        ...mb10,
        ...center
    }

    // info de QR
    // const informacionQR:string = `${ruc}|${tipoComprobante}|${serie}|${nroCorrelat()}|${fixedInput(nuevo ? moneda(venta.igvGeneral) : moneda(igv))}|${fixedInput(venta.total)}|${fechaResumenGuiones(venta.updated_at)}|${tipoDocumento}|${nroDocumento}`;

    // const nroComprobante:string = serie + "-" + (nroCorrelat() ? nroCorrelat() + "-" : "") + venta.id + "-" + venta.codigo_venta;
    // const nroComprobante:string = serie + "-" + nroCorrelat();
    const nroVenta:string = venta.id + "-" + venta.codigo_venta


    return (

        <div className="none imprimir-comprobante">
            <div style={container} ref={imprimir}>
                
                <div style={boxHeaderInfo}>
                    <div>
                        <h3 style={tituloPrinc}>Nota de venta</h3>
                    </div>
                    <span style={headerInfo}>{"V001-" + nroVenta}</span>
                    <span style={headerInfo}>{ fechaResumen(venta.updated_at) }</span>
                </div>
                
                <div style={boxHeaderInfo}>
                    <h3 style={infoEmpresa}>AddidSport</h3> {/*  actualizar por nombre de empresa desde DB */}
                    <h2 style={infoEmpresa}>INVERSIONES PERKINS E.I.R.L</h2> {/*  actualizar */}
                    {/* {
                        esComprobante
                        && (
                            <>
                                <p style={infoEmpresa}>INVERSIONES PERKINS EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA</p>
                                <p style={infoEmpresa}>CUSCO - CUSCO - CUSCO</p>
                                <p style={infoTxtM0}>RUC: {ruc}</p>
                            </>
                        )
                    } */}
                    <p style={infoEmpresa}>CAL. TRINITARIAS N. 501 URB. CENTRO HISTORICO CUSCO</p>
                    <p style={infoTxtM0}>CORREO: epc26irvin@gmail.com</p>
                    <p style={infoTxtM0}>WSP: 937604653</p>
                </div>
                <div style={borderMb} />
                {/* {
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
                } */}

                <div style={borderMb} />
                <div style={mb10}>
                    <h3 style={tituloDetalles}>Detalles de venta</h3>
                    <table style={table}>
                        <thead>
                            <tr style={texto}>
                                <th>Cant</th>
                                <th>Prod</th>
                                <th>P.U.</th>
                                <th>P.Sv.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ventaDetalles.map((e:any) => {

                                    let precio_venta:number = 0;

                                    if (nuevo) {
                                        precio_venta = e.precio_venta
                                    } else {
                                        precio_venta = 
                                        Number(e.precio_venta) + 
                                        (Number(e.descuento) / 
                                        Number(e.cantidad_venta));
                                    }

                                    return (
                                        <tr key={e.id} style={texto}>
                                            {/* <td>{ e.productos.codigo }</td> */}
                                            <td>{ e.cantidad_venta }</td>
                                            <td style={lowercase}>{ 
                                                e.productos.nombre + " - " +
                                                e.productos.marca + " - " +
                                                e.productos.talla + " - " +
                                                e.productos.color
                                            }</td>
                                            <td>S/.{ moneda(precio_venta) }</td>
                                            <td>S/.{ moneda(e.precio_parcial) }</td>
                                        </tr>            
                                    );                                
                                })
                            }
                            
                        </tbody>
                    </table>
                </div>

                <div style={borderMb} />

                <div style={detalles}>
                    <div style={blockLeft}></div>
                    <div style={blockRight}>

                        {/* {
                            esComprobante
                            && (
                                <div style={textoResumen}>
                                    <span style={left}>Subtotal:</span>
                                    <span style={right}>S/. { 
                                        nuevo
                                        ? moneda(venta.subtotal)
                                        : moneda(subtotal)
                                    }</span>
                                </div>
                            )
                        }

                        {
                            esComprobante
                            && (
                                <div style={textoResumen}>
                                    <span style={left}>IGV:</span>
                                    <span style={right}>S/. { 
                                        nuevo
                                        ? moneda(venta.igvGeneral)
                                        : moneda(igv)
                                    }</span>
                                </div>
                            )
                        }

                        {
                            esComprobante
                            && (
                                <>
                                    <div style={textoResumen}>
                                        <span style={left}>Inafecta:</span>
                                        <span style={right}>S/. { moneda(0) }</span>
                                    </div>

                                    <div style={textoResumen}>
                                        <span style={left}>Exonerada:</span>
                                        <span style={right}>S/. { moneda(0) }</span>
                                    </div>
                                </>
                            )
                        } */}

                        <div style={textoResumen}>
                            <span style={left}>Cont Unid:</span>
                            <span style={right}>{ totalUnidades() }</span>
                        </div>
                        <div style={textoResumen}>
                            <span style={left}>Total:</span>
                            <span style={right}>S/. { moneda(venta.total) }</span>
                        </div>
                    </div>
                </div>

                <div style={borderMb} />

                <div style={center}>
                    {/* {
                        esComprobante
                        && (
                            <div style={qrcode}>
                                <QRCodeSVG value={informacionQR} />
                            </div>
                        )
                    } */}
                    
                    <h3 style={descripcion}>Representacion impresa del comprobante electronico</h3>
                </div>

            </div>
        </div>
    );
}

/* <div style={textoResumen}>
    <span style={left}>Gratuita:</span>
    <span style={right}>S/. { moneda(0) }</span>
</div> */