import { BiShowAlt } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"

export const VentasDropdown = ({ ventas, handlerVer }:any) => {

    return (
        <DropDown width="190">
            <span onClick={ () => handlerVer(ventas.id) } >
                <BiShowAlt />Ver detalles
            </span>
        </DropDown>
    )
}
