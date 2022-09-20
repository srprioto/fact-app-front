import { fecha } from "../../../../resources/func/fechas"
import { moneda } from "../../../../resources/func/moneda"

export const InfoComprobante = ({ comprobante }:any) => {

    const venta:any = comprobante.ventas ? comprobante.ventas : {};
    const correlativo:any = comprobante.correlativos ? comprobante.correlativos : {};
    const idVenta = venta ? venta.id : "";
    const codigoVenta = venta ? venta.codigo_venta : "";
    const codigoComprobante:any = 
        // correlativo.serie + "-" + 
        idVenta + "-" + 
        codigoVenta + "-" + 
        comprobante.correlativo;

    const tipoDocm = () => {
        if (comprobante.tipoDocumento === "1") {
            return "DNI"
        } else if (comprobante.tipoDocumento === "6") {
            return "RUC"
        } else {
            return "Sin documento"
        }
    }

    const tipoOperacion = () => { 
        if (comprobante.tipoOperacion === "10") {
            return "Gravado"
        } else if (comprobante.tipoOperacion === "20") {
            return "Exonerado"
        }
    }


    return (
        <div className="grid-2 gap">

            <div className="wrap-descripcion3">
                <h3>Informacion general</h3>
                <div className="box-wrap-descripcion3">

                    <span>
                        <p>Codigo venta: </p>
                        {/* <h4 className="info-i">{ comprobante.serie + "-" + comprobante.id }</h4> */}
                        <h4 className="info-i">{ codigoComprobante }</h4>
                    </span>

                    <span>
                        <p>Subtotal</p>
                        <h4>S/. { moneda(comprobante.subtotal) }</h4>
                    </span>

                    <span>
                        <p>IGV general</p>
                        <h4>S/. { moneda(comprobante.igvGeneral) }</h4>
                    </span>

                    <span>
                        <p>Total</p>
                        <h4>S/. { moneda(comprobante.total) }</h4>
                    </span>

                    
                </div>
            </div>

            <div className="wrap-descripcion3">
                <h3>Informacion adicional</h3>
                <div className="box-wrap-descripcion3">
                    
                    <span>
                        <p>Tipo comprobante: </p>
                        <h4 className="capitalize">{ correlativo.descripcion }</h4>
                    </span>

                    <span>
                        <p>Tipo documento</p>
                        <h4>{ tipoDocm() }</h4>
                    </span>

                    <span>
                        <p>Tipo operacion: </p>
                        <h4>{ tipoOperacion() }</h4>
                    </span>

                    <span>
                        <p>Local: </p>
                        <h4>{ comprobante.locales && comprobante.locales.nombre }</h4>
                    </span>

                    <span>
                        <p>Fecha de emisión: </p>
                        <h4>{ fecha(comprobante.fecha_emision) }</h4>
                    </span>

                </div>
            </div>
        </div>


    )
}
