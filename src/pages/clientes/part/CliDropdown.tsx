import { BiPencil, BiShowAlt, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

import { DropDown } from "../../../components/DropDown"

export const CliDropdown = ({ id, nombre, handlerDeleted, handlerVer }:any) => {
    return (
        <DropDown>
            <span onClick={ () => handlerDeleted(id, nombre) }>
                <BiTrash /> Eliminar
            </span>
            <Link to={`/clientes/${id}/edit`} >
                <BiPencil /> Editar cliente
            </Link>
            <span onClick={ () => handlerVer(id) }>
                <BiShowAlt /> Ver detalles
            </span>
        </DropDown>
    )
};
