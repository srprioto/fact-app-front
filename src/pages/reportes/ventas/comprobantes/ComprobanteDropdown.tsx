import { BiShowAlt } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"

export const ComprobanteDropdown = ({ comprobante, handlerVer }:any) => {
    return (
        <DropDown width="190">

            <span onClick={ () => handlerVer(comprobante.id) } >
                <BiShowAlt />Ver detalles
            </span>

            {/* <span onClick={ () => updateData() } >
                <BiLike />Habilitar venta
            </span> */}
            
        </DropDown>
    )
}
