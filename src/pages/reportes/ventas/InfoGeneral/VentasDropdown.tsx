import { BiBookmarkAltMinus, BiLike, BiShowAlt, BiX } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"

interface ventasDropdown {
    ventas:any;
    handlerVer:Function; 
    updateData:Function;
    handlerAnular:Function;
    handlerReimprimir:Function;
}

export const VentasDropdown = ({ ventas, handlerVer, updateData, handlerAnular, handlerReimprimir }:ventasDropdown) => {

    const anulado = () => { 
        if (
            ventas.estado_venta === "anulado" || 
            ventas.estado_venta === "rechazado" || 
            ventas.estado_venta === "enviado" ||
            ventas.estado_venta === "cotizacion"
        ) {
            return true;
        } else {
            return false;
        }
    }

    
    return (
        <DropDown width="190">
            {
                !anulado()
                && <span onClick={ () => handlerAnular(ventas.id, ventas.locales.id) } >
                    <BiX />Anular Venta
                </span>
            }

            {
                (ventas.estado_venta === "rechazado" ||
                ventas.estado_venta === "rechazado")
                && (
                    <span onClick={ () => updateData(ventas.id) } >
                        <BiLike /> Habilitar venta
                    </span>
                )
            }
            
            {
                ventas.estado_venta === "listo"
                && (
                    <span onClick={ () => handlerReimprimir(ventas.id) } >
                        <BiBookmarkAltMinus /> Reimprimir
                    </span>
                )
            }

            <span onClick={ () => handlerVer(ventas.id) } >
                <BiShowAlt /> Ver detalles
            </span>

                        
        </DropDown>
    )
}
