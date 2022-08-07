import { BiLike, BiShowAlt, BiX } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"

interface ventasDropdown {
    ventas:any;
    handlerVer:Function; 
    updateData:Function;
    handlerAnular:Function;
}

export const VentasDropdown = ({ ventas, handlerVer, updateData, handlerAnular }:ventasDropdown) => {

    const anulado = () => { 
        if (ventas.estado_venta === "anulado" || ventas.estado_venta === "rechazado") {
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
            
            <span onClick={ () => handlerVer(ventas.id) } >
                <BiShowAlt />Ver detalles
            </span>
            
            {
                ventas.estado_venta === "rechazado"
                && (
                    <span onClick={ () => updateData(ventas.id) } >
                        <BiLike />Habilitar venta
                    </span>
                )
            }
            
        </DropDown>
    )
}
