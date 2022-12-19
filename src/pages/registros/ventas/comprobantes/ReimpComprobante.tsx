import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef } from "react";
import { tipoVenta } from "../../../../resources/dtos/VentasDto";
import { fechaResumen, fechaResumenGuiones } from "../../../../resources/func/fechas";
import { fixedInput } from "../../../../resources/func/fixedInput";
import { moneda } from "../../../../resources/func/moneda";

interface impComprobante {
    comprobante:any;
    setImprimir:Function;
}

export const ReimpComprobante = ({ comprobante, setImprimir }:impComprobante) => {

    const venta:any = comprobante.venta ? comprobante.venta : {};
    const cliente:any = comprobante.clientes ? comprobante.clientes : {};
    
    const imprimir = useRef<any>(null);

    // info comprobante
    // const correlativos:any = comprobante.locales.correlativos;
    // const correlativo:any = correlativos.find((e:any) => e.descripcion === comprobante.tipo_venta);
    // const serie:string = correlativo ? correlativo.serie : "V001";
    // const nuevoCorrelativo:string = correlativo ? correlativo.correlativo : "";
    // const existCorrelativo:string = comprobante.comprobante.length > 0 ? comprobante.comprobante[0].correlativo : "";
    // const esComprobante:boolean = comprobante.tipo_venta === tipoVenta.boleta || comprobante.tipo_venta === tipoVenta.factura;
    
    // const ventaDetalles:any = comprobante.ventaDetalles ? comprobante.ventaDetalles : {};
    
    // let subtotal:number = 0;
    // let igv:number = 0;
    let tipoComprobante:string = "";
    let tipoDocumento:string = "";
    if (comprobante.tipo_venta === tipoVenta.boleta) {
        tipoComprobante = "03";
    } else if (comprobante.tipo_venta === tipoVenta.factura) {
        tipoComprobante = "01";
    }
    if (cliente.tipoDocumento === "DNI") {
        tipoDocumento = "1"
    } else if (cliente.tipoDocumento === "RUC") {
        tipoDocumento = "6"
    } else if (
        cliente.tipoDocumento === "noDocumento" || 
        (!cliente.tipoDocumento && comprobante.tipo_venta === tipoVenta.boleta)
    ) {
        tipoDocumento = "00"
    }

    const nroDocumento:string = tipoDocumento !== "00" ? cliente.numero_documento + "|" : "";

    // info empresa - requiere automatizar
    const ruc:string = "20602956211";


    // if (!nuevo) {
    //     subtotal = Number(comprobante.subtotal / 1.18);
    //     igv = Number(comprobante.subtotal) - Number(subtotal);    
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


    const titulo = () => {
        if (comprobante.tipo_venta === tipoVenta.venta_rapida) {
            return "Nota de venta";
        } else if (comprobante.tipo_venta === tipoVenta.boleta){
            return "Boleta electronica";
        } else if (comprobante.tipo_venta === tipoVenta.factura){
            return "Factura electronica";
        } else {
            return "Comprobante electronico";
        }
    }


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
    const qrcode = {
        margin: "15px 0"
    }
    const descripcion = {
        ...texto,
        ...mb10,
        ...center
    }

    // info de QR
    const informacionQR:string = `${ruc}|${tipoComprobante}|${comprobante.serie}|${comprobante.correlativo}|${moneda(comprobante.igvGeneral)}|${fixedInput(comprobante.total)}|${fechaResumenGuiones(comprobante.updated_at)}|${tipoDocumento}|${nroDocumento}`;

    // const nroComprobante:string = serie + "-" + (nroCorrelat() ? nroCorrelat() + "-" : "") + venta.id + "-" + venta.codigo_venta;
    // const nroComprobante:string = serie + "-" + nroCorrelat();
    const nroVenta:string = venta.id + "-" + venta.codigo_venta


    return (

        <div className="none imprimir-comprobante">
            <div style={container} ref={imprimir}>
                
                <div style={boxHeaderInfo}>
                    <div>
                        <h3 style={tituloPrinc}>{ titulo() }</h3>
                        <p>{ comprobante.correlativo + "-" + comprobante.serie }</p>
                    </div>
                    <span style={headerInfo}>{ nroVenta }</span>
                    <span style={headerInfo}>{ fechaResumen(comprobante.created_at) }</span>
                </div>
                
                <div style={boxHeaderInfo}>
                    <h3 style={infoEmpresa}>AddidSport</h3> {/*  actualizar por nombre de empresa desde DB */}
                    <h2 style={infoEmpresa}>INVERSIONES PERKINS E.I.R.L</h2> {/*  actualizar */}
                    <p style={infoEmpresa}>INVERSIONES PERKINS EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA</p>
                    <p style={infoEmpresa}>CUSCO - CUSCO - CUSCO</p>
                    <p style={infoTxtM0}>RUC: {ruc}</p>
                    {/* <p style={infoTxtM0}>TELEFONO: 20602956211</p> */}
                    <p style={infoEmpresa}>CAL. TRINITARIAS N. 501 URB. CENTRO HISTORICO CUSCO</p>
                    <p style={infoTxtM0}>CORREO: epc26irvin@gmail.com</p>
                    <p style={infoTxtM0}>WSP: 937604653</p>
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
                    <h3 style={tituloDetalles}>Detalles de venta</h3>
                    <table style={table}>
                        <thead>
                            <tr style={texto}>
                                {/* <th>Cod</th> */}
                                <th>Cant</th>
                                <th>Prod</th>
                                <th>P.U.</th>
                                <th>P.Sv.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                comprobante.comprobanteDetalles.map((e:any) => {

                                    const totalSubventa:number = Number(e.unidad_con_igv) * Number(e.cantidad_venta)

                                    return (
                                        <tr key={e.id} style={texto}>
                                            <td>{ e.cantidad_venta }</td>
                                            <td style={lowercase}>{ e.nombre }</td>
                                            <td>S/.{ moneda(e.unidad_con_igv) }</td>
                                            <td>S/.{ moneda(totalSubventa) }</td>
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

                        <div style={textoResumen}>
                            <span style={left}>Subtotal:</span>
                            <span style={right}>S/. { moneda(comprobante.subtotal) }</span>
                        </div>

                        <div style={textoResumen}>
                            <span style={left}>IGV:</span>
                            <span style={right}>S/. { moneda(comprobante.igvGeneral) }</span>
                        </div>

                        <div style={textoResumen}>
                            <span style={left}>Inafecta:</span>
                            <span style={right}>S/. { moneda(0) }</span>
                        </div>

                        <div style={textoResumen}>
                            <span style={left}>Exonerada:</span>
                            <span style={right}>S/. { moneda(0) }</span>
                        </div>

                        <div style={textoResumen}>
                            <span style={left}>Total:</span>
                            <span style={right}>S/. { moneda(comprobante.total) }</span>
                        </div>

                    </div>
                </div>

                <div style={borderMb} />

                <div style={center}>
                    <div style={qrcode}>
                        <QRCodeSVG value={informacionQR} />
                    </div>
                    
                    <h3 style={descripcion}>Representacion impresa del comprobante electronico</h3>
                </div>

            </div>
        </div>
    );
}
