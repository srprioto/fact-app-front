import { BiPencil, BiShowAlt, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

import { DropDown } from "../../../components/DropDown"

export const UserDropdown = ({ id, nombre, handlerDeleted, handlerVer }:any) => {
    return (
        <DropDown>
            <span onClick={ () => handlerDeleted(id, nombre) }>
                <BiTrash />Eliminar
            </span>
            <Link to={`/usuarios/${id}/edit`} >
                <BiPencil />Editar usuario
            </Link>
            <span onClick={ () => handlerVer(id) }>
                <BiShowAlt />Ver detalles
            </span>
        </DropDown>
    )
};
