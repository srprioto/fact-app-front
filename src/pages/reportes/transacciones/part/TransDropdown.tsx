import { BiShowAlt } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"

export const TransDropdown = ({ elemento, handlerVer }:any) => {
    return (
        <DropDown>
            {/* <span onClick={ () => handlerDeleted(id, nombre) }>
                <BiTrash />Eliminar
            </span> */}
            {/* <Link to={`/clientes/${id}/edit`} >
                <BiPencil />Editar cliente
            </Link> */}
            <span onClick={ () => handlerVer(elemento.id) }>
                <BiShowAlt />Ver detalles
            </span>
        </DropDown>
    )
}
