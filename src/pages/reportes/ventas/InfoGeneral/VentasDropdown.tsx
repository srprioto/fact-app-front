import { BiLike, BiShowAlt } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"

export const VentasDropdown = ({ ventas, handlerVer, updateData }:any) => {

    return (
        <DropDown width="190">
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
