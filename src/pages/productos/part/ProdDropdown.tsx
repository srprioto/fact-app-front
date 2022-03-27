import { BiPencil, BiShowAlt, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

import { DropDown } from "../../../components/DropDown"

export const ProdDropdown = ({ id, nombre, handlerDeleted, handlerVer }:any) => {
    return (
        <div className="dd-prod-int">
            <span onClick={ () => handlerDeleted(id, nombre) }>
                <BiTrash />Eliminar
            </span>
            <Link to={`/productos/${id}/edit`} >
                <BiPencil />Editar producto
            </Link>
            {/* <span onClick={ () => handlerVer(id) }>
                <BiShowAlt />Ver detalles
            </span> */}
        </div>
    )
};
