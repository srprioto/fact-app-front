import { useEffect, useRef } from "react";
import { fecha } from "../../../../resources/func/fechas";
import { moneda } from "../../../../resources/func/moneda";

interface impComprobante {
    venta:any;
}

export const ImpComprobante = ({ venta }:impComprobante) => {

    const imprimir = useRef<any>(null);

    useEffect(() => {
        handlerPrint();
    }, [])
    

    const handlerPrint = () => { 
        let ventimp:any = window.open(' ', 'popimpr');
        ventimp.document.write( imprimir.current.innerHTML );
        ventimp.document.close();
        ventimp.print( );
        ventimp.close();
    }

    const titulo = () => { 
        if (venta.serie === "V001") {
            return "Nota de venta";
        } else if (venta.serie === "B001"){
            return "Boleta electronica";
        } else if (venta.serie === "F001"){
            return "Factura electronica";
        } else {
            return "Comprobante electronico";
        }
    }

    const cliente:any = venta.clientes ? venta.clientes : "";
    const ventaDetalles:any = venta.ventaDetalles;


    // estilos
    // generales
    const container:any = {
        // maxWidth: "400px"
    };
    const center:any = {
        textAlign: "center"
    }
    const m0:any = {
        margin: "0"
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
    const border:any = {
        borderBottom: "1px solid #000",
        margin: "4px 0"
    }

    // header
    const headerInfo:any = {
        padding: "0 10px"
    }

    // empresa


    // cliente


    // body
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

    return (
        <div className="none">
            <div style={container} ref={imprimir}>
                
                <div style={center}>
                    <h3 style={m0}>{ titulo() }</h3>
                    <span style={headerInfo}>{ venta.serie + "-" + venta.id + "-" + venta.codigo_venta }</span>
                    <span style={headerInfo}>{ fecha(venta.updated_at) }</span>
                </div>
                <div style={center}>
                    <h2 style={m0}>AddidSport</h2> {/*  actualizar por nombre de empresa desde DB */}
                    <p style={m0}>DIREC: CAL. TRINITARIAS N. 501 URB.</p>
                    <p style={m0}>RUC: 20602956211</p>
                </div>
                <div style={border} />
                {
                    !!cliente.numero_documento
                    && (
                        <div>
                            { !!cliente.nombre && <p style={m0}>Cliente: { cliente.nombre }</p> }
                            { !!cliente.razonSocial && <p style={m0}>Razon Social: { cliente.razonSocial }</p> }

                            <p style={m0}>{ cliente.tipoDocumento }: { cliente.numero_documento }</p>

                            { !!cliente.direccion && <p style={m0}>Direc: { cliente.direccion }</p> }
                            { !!cliente.telefono && <p style={m0}>Tel: { cliente.telefono }</p> }
                            
                        </div>
                    )
                }

                <div style={border} />
                <div>

                    <table style={table}>
                        <thead>
                            <tr>
                                <th>Cod</th>
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
                                        <tr key={e.id}>
                                            <td>{ e.productos.codigo }</td>
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
                <div style={detalles}>
                    <div style={blockLeft}></div>
                    <div style={blockRight}>
                        <div style={w100}>
                            <span style={left}>Subtotal:</span>
                            <span style={right}>S/. { moneda(venta.subtotal) }</span>
                        </div>
                        <div style={w100}>
                            <span style={left}>IGV:</span>
                            <span style={right}>S/. { moneda(venta.igvGeneral) }</span>
                        </div>
                        <div style={w100}>
                            <span style={left}>Inafecta:</span>
                            <span style={right}>S/. { moneda(0) }</span>
                        </div>
                        <div style={w100}>
                            <span style={left}>Total:</span>
                            <span style={right}>S/. { moneda(venta.total) }</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

