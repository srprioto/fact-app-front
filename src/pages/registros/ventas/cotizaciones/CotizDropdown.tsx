import { BiLike, BiShowAlt } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"

interface cotizDropdown {
    ventas:any;
    handlerVer:Function; 
    updateData:Function;
}

export const CotizDropdown = ({ ventas, handlerVer, updateData }:cotizDropdown) => {
    return (
        <DropDown width="190">
            
            <span onClick={ () => updateData(ventas.id) } >
                <BiLike />Activar venta
            </span>
            
            <span onClick={ () => handlerVer(ventas.id) } >
                <BiShowAlt />Ver detalles
            </span>
                        
        </DropDown>
    )
}
