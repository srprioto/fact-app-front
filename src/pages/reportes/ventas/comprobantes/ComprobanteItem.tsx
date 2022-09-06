import { classEstado } from "../../../../resources/dtos/ComprobantesDto"
import { fecha } from "../../../../resources/func/fechas"
import { ComprobanteDropdown } from "./ComprobanteDropdown"

export const ComprobanteItem = ({ comprobante, handlerVer, reenviarComprobante, anularComprobante }:any) => {

    const venta:any = comprobante.ventas ? comprobante.ventas : {id: "000", codigo_venta: "000"};
    // const correlativo:any = comprobante.correlativos ? comprobante.correlativos : {};
    const codigoVenta:any = 
        // correlativo.serie + "-" + 
        venta.id + "-" + 
        venta.codigo_venta + "-" + 
        comprobante.id;

    const tipoDocm = () => {
        if (comprobante.tipoDocumento === "1") {
            return "DNI"
        } else if (comprobante.tipoDocumento === "6") {
            return "RUC"
        }
    }

    
    return (
        <tr className="venta-items">
            {/* <td className="secundary">{ comprobante.serie + "-" + comprobante.correlativo }</td> */}
            <td className="secundary">{ codigoVenta }</td>
            <td className="capitalize">{ venta.tipo_venta }</td>
            <td className="strong info">{ tipoDocm() }</td>
            <td>{ comprobante.locales ? comprobante.locales.nombre : "" }</td>
            <td>{ fecha(comprobante.fecha_emision) }</td>
            <td className={classEstado(comprobante.estado_sunat) + " strong"}>{ comprobante.estado_sunat }</td>

            <td>
                <ComprobanteDropdown
                    comprobante={comprobante}
                    handlerVer={handlerVer}
                    reenviarComprobante={reenviarComprobante}
                    anularComprobante={anularComprobante}
                />
            </td>
        </tr>
    )
}



// const classEstado = () => {
//     if (comprobante.estado_sunat === "Aceptado") {
//         return "success-i"
//     } else if (comprobante.estado_sunat === "Observado") {
//         return "primary-i"
//     } else if (comprobante.estado_sunat === "Rechazado") {
//         return "warning-i"
//     } else if (comprobante.estado_sunat === "Excepcion") {
//         return "secundary-i"
//     } else if (comprobante.estado_sunat === "Error_anulacion" || comprobante.estado_sunat === "Error_envio") {
//         return "danger-i"
//     } else if (comprobante.estado_sunat === "No") {
//         return "danger-i"
//     } else if (comprobante.estado_sunat === "Anulado") {
//         return "secundary-i opacity"
//     }
// }

// const estado = () => { 
//     if (comprobante.estado_sunat === "ACEPTADO") {
//         return "Aceptado"
//     } else if (comprobante.estado_sunat === "OBSERVACION") {
//         return "Observado"
//     } else if (comprobante.estado_sunat === "RECHAZADO") {
//         return "Rechazado"
//     } else if (comprobante.estado_sunat === "Excepción") {
//         return "Excepción"
//     } else if (comprobante.estado_sunat === "ERROR") {
//         return "Error"
//     } else if (comprobante.estado_sunat === "NO") {
//         return "EER !!"
//     } else if (comprobante.estado_sunat === "ANULADO") {
//         return "Anulado"
//     } else {
//         return "Otros"
//     }
// }