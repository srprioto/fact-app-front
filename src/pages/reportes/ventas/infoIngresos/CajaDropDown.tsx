import { BiShowAlt } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"

export const CajaDropDown = ({ item, handlerVer }:any) => {
    return (    
        <DropDown width="190">
            <span onClick={ () => handlerVer(item) } >
                <BiShowAlt />Ver detalles
            </span>

            
        </DropDown>
    )
}
