import { BiRightIndent } from "react-icons/bi"
import { ToolTip } from "../../tooltip/ToolTip"

export const MenuDesplegable = () => {
    return (
        <div 
            id="menu-desplegable"
            className="pointer"
        >
            <BiRightIndent className="icon-header" />
            <ToolTip
                anchor="menu-desplegable"
                descripcion="Permite desplegar y esconder el menú de interacción"
            />
        </div>
    )
}
