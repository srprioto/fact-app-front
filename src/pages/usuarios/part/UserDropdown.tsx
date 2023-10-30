import { BiListOl, BiShowAlt, BiTrash } from "react-icons/bi";

import { DropDown } from "../../../components/DropDown"

export const UserDropdown = ({ id, nombre, handlerDeleted, handlerVer, handerVerVentas }:any) => {
    return (
        <DropDown>
            <span onClick={ () => handlerDeleted(id, nombre) }>
                <BiTrash />Eliminar
            </span>
            {/* <Link to={`/usuarios/${id}/edit`} >
                <BiPencil />Editar usuario
            </Link> */}
            <span onClick={ () => handerVerVentas(id, nombre) }>
                <BiListOl />Reg. Ventas
            </span>
            <span onClick={ () => handlerVer(id) }>
                <BiShowAlt />Ver detalles
            </span>
        </DropDown>
    )
};
