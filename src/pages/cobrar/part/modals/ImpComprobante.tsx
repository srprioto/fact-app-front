import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef } from "react";
import { tipoVenta } from "../../../../resources/dtos/VentasDto";
import { fecha } from "../../../../resources/func/fechas";
import { moneda } from "../../../../resources/func/moneda";

interface impComprobante {
    venta:any;
    setImprimir:Function;
}

export const ImpComprobante = ({ venta, setImprimir }:impComprobante) => {

    const imprimir = useRef<any>(null);

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
        if (venta.tipo_venta === tipoVenta.venta_rapida) {
            return "Nota de venta";
        } else if (venta.tipo_venta === tipoVenta.boleta){
            return "Boleta electronica";
        } else if (venta.tipo_venta === tipoVenta.factura){
            return "Factura electronica";
        } else {
            return "Comprobante electronico";
        }
    }

    // const titulo = () => { 
    //     if (venta.serie === "V001") {
    //         return "Nota de venta";
    //     } else if (venta.serie === "B003"){
    //         return "Boleta electronica";
    //     } else if (venta.serie === "F003"){
    //         return "Factura electronica";
    //     } else {
    //         return "Comprobante electronico";
    //     }
    // }    


    const cliente:any = venta.clientes ? venta.clientes : "";
    const ventaDetalles:any = venta.ventaDetalles;


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
    }

    // header
    const tituloPrinc = {
        ...mb10,
        ...texto,
        fontSize: "23px",
    }

    const headerInfo:any = {
        ...mb10,
        padding: "0 10px",
        fontWeight: "100",
        fontFamily: "arial",
        fontSize: "16px",
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


    return (

        <div className="none imprimir-comprobante">
            <div style={container} ref={imprimir}>
                
                <div style={boxHeaderInfo}>
                    <h3 style={tituloPrinc}>{ titulo() }</h3>
                    <span style={headerInfo}>{ venta.serie + "-" + venta.id + "-" + venta.codigo_venta }</span>
                    <span style={headerInfo}>{ fecha(venta.updated_at) }</span>
                </div>
                
                <div style={boxHeaderInfo}>
                    <h1 style={infoEmpresa}>AddidSport</h1> {/*  actualizar por nombre de empresa desde DB */}
                    <h2 style={infoEmpresa}>INVERSIONES PERKINS E.I.R.L</h2> {/*  actualizar */}
                    {
                        venta.tipo_venta !== tipoVenta.venta_rapida
                        && (
                            <>
                                <p style={infoEmpresa}>INVERSIONES PERKINS EMPRESA INDIVIDUAL DE RESPONSABILIDAD LIMITADA</p>
                                <p style={infoEmpresa}>CAL. TRINITARIAS N. 501 URB. CENTRO HISTORICO CUSCO</p>
                                <p style={infoEmpresa}>CUSCO - CUSCO - CUSCO</p>
                                <p style={infoTxtM0}>RUC: 20602956211</p>
                                <p style={infoTxtM0}>CORREO: epc26irvin@gmail.com</p>
                                <p style={infoTxtM0}>TELEFONOS: 20602956211</p>
                            </>
                        )
                    }
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
                                            <td>{ e.productos.nombre }</td>
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

                <div style={borderMb} />

                <div style={detalles}>
                    <div style={blockLeft}></div>
                    <div style={blockRight}>
                        <div style={textoResumen}>
                            <span style={left}>Subtotal:</span>
                            <span style={right}>S/. { moneda(venta.subtotal) }</span>
                        </div>
                        <div style={textoResumen}>
                            <span style={left}>IGV:</span>
                            <span style={right}>S/. { moneda(venta.igvGeneral) }</span>
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
                            <span style={left}>Gratuita:</span>
                            <span style={right}>S/. { moneda(0) }</span>
                        </div>
                        <div style={textoResumen}>
                            <span style={left}>Total:</span>
                            <span style={right}>S/. { moneda(venta.total) }</span>
                        </div>
                    </div>
                </div>

                <div style={borderMb} />

                <div style={center}>
                    {
                        venta.tipo_venta !== tipoVenta.venta_rapida
                        && (
                            <div style={qrcode}>
                                <QRCodeSVG value={`${venta.serie}|${venta.codigo_venta}|${moneda(venta.subtotal)}|${moneda(venta.igvGeneral)}|${moneda(venta.total)}|${fecha(venta.updated_at)}|${ventaDetalles.length}`} />
                            </div>
                        )
                    }
                    
                    <h3 style={descripcion}>Representacion impresa del comprobante electronico</h3>
                </div>

            </div>
        </div>
    );
}

