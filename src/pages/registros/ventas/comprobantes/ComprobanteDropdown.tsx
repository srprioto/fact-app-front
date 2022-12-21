import { BiBookmarkAltMinus, BiRedo, BiShowAlt, BiX } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"

export const ComprobanteDropdown = ({ 
    comprobante, 
    handlerVer, 
    reenviarComprobante, 
    anularComprobante, 
    imprimirComprobante 
}:any) => {

    const verReenviar = () => { 
        // || comprobante.estado_sunat === "ANULADO"
        if (
            comprobante.estado_sunat === "Error_envio" ||
            comprobante.estado_sunat === "Rechazado" ||
            comprobante.estado_sunat === "No"
            // || comprobante.estado_sunat === "Observado"
        ) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <DropDown width="190">

            <span onClick={ () => handlerVer(comprobante.id) } >
                <BiShowAlt /> Ver detalles
            </span>

            {
                verReenviar()
                && <span onClick={ () => reenviarComprobante(comprobante.id) } >
                    <BiRedo /> Reenviar
                </span>
            }

            <span onClick={ () => imprimirComprobante(comprobante.id) } >
                <BiBookmarkAltMinus /> Imprimir
            </span>

            {
                comprobante.estado_sunat !== "Anulado"
                && <span onClick={ () => anularComprobante(comprobante.ventas.id) } >
                    <BiX /> Anular Comp.
                </span>
            }

        </DropDown>
    )
}
