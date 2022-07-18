import { ComprobanteDropdown } from "./ComprobanteDropdown"

export const ComprobanteItem = ({ comprobante, handlerVer }:any) => {

    const classEstado = () => { 
        if (comprobante.estado_sunat === "ACEPTADO") {
            return "success-i"
        } else if (comprobante.estado_sunat === "OBSERVACION") {
            return "primary-i"
        } else if (comprobante.estado_sunat === "RECHAZADO") {
            return "warning-i"
        } else if (comprobante.estado_sunat === "Excepción") {
            return "secundary-i"
        } else if (comprobante.estado_sunat === "ERROR") {
            return "danger-i"
        }
    }

    const estado = () => { 
        if (comprobante.estado_sunat === "ACEPTADO") {
            return "Aceptado"
        } else if (comprobante.estado_sunat === "OBSERVACION") {
            return "Observado"
        } else if (comprobante.estado_sunat === "RECHAZADO") {
            return "Rechazado"
        } else if (comprobante.estado_sunat === "Excepción") {
            return "Excepción"
        } else if (comprobante.estado_sunat === "ERROR") {
            return "Error"
        }
    }

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
    
    return (
        <tr className="venta-items">
            <td className="secundary">{ comprobante.serie + "-" + comprobante.correlativo }</td>
            <td>{ tipoOperacion() }</td>
            <td className="strong info">{ tipoDocm() }</td>
            <td>{ comprobante.locales ? comprobante.locales.nombre : "" }</td>
            <td>{ comprobante.fecha_emision }</td>
            <td className={classEstado() + " strong"}>{ estado() }</td>

            <td>
                <ComprobanteDropdown
                    comprobante={comprobante}
                    handlerVer={handlerVer}
                />
            </td>
        </tr>
    )
}
