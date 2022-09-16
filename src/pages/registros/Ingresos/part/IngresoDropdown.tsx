import { BiShowAlt } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"

export const IngresoDropdown = ({ ingreso, handlerVer }:any) => {
    return (
        <DropDown width="190">
            <span onClick={ () => handlerVer(ingreso.id) } >
                <BiShowAlt />Ver detalles
            </span>
        </DropDown>
    )
}
