import { BiBarcodeReader, BiPencil, BiShowAlt, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";

import { DropDown } from "../../../components/DropDown"

export const ProdDropdown = ({ id, nombre, producto, handlerDeleted, handlerBarcode }:any) => {
    return (
        <div className="dd-prod-int">
            <span onClick={ () => handlerDeleted(id, nombre) }>
                <BiTrash /> Eliminar
            </span>
            <Link to={`/productos/${id}/edit`} >
                <BiPencil /> Editar producto
            </Link>
            <span onClick={ () => handlerBarcode(producto) }>
                <BiBarcodeReader /> Codigo de barras
            </span>
        </div>
    )
};
