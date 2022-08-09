import { fecha } from "../../../../resources/func/fechas"
import { moneda } from "../../../../resources/func/moneda"

export const InfoComprobante = ({ comprobante }:any) => {

    const tipoDocm = () => {
        if (comprobante.tipoDocumento === "1") {
            return "DNI"
        } else if (comprobante.tipoDocumento === "6") {
            return "RUC"
        }
    }

    const tipoOperacion = () => { 
        if (comprobante.tipoOperacion === "10") {
            return "Gravado"
        } else if (comprobante.tipoOperacion === "20") {
            return "Exonerado"
        }
    }

    const tipoComprobante = () => { 
        if (comprobante.tipoComprobante === "01") {
            return "Factura"
        } else if (comprobante.tipoComprobante === "03") {
            return "Boleta"
        }

        
    }

    return (
        <div className="grid-2 gap">

            <div className="wrap-descripcion3">
                <h3>Informacion general</h3>
                <div className="box-wrap-descripcion3">

                    <span>
                        <p>Codigo venta: </p>
                        {/* <h4 className="info-i">{ comprobante.serie + "-" + comprobante.correlativo }</h4> */}
                        <h4 className="info-i">{ comprobante.serie + "-" + comprobante.id }</h4>
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
                        <h4>{ tipoComprobante() }</h4>
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
