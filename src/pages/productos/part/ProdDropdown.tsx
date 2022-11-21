import { BiBarcodeReader, BiPencil, BiShowAlt, BiTrash } from "react-icons/bi";
import { Link } from "react-router-dom";
import { DropDown } from "../../../components/DropDown";

export const ProdDropdown = ({ id, nombre, producto, handlerDeleted, handlerBarcode, handlerVer }:any) => {
    return (
        <DropDown>
            <span onClick={ () => handlerVer(producto) }>
                <BiShowAlt /> Ver Producto
            </span>
            <Link to={`/productos/${id}/edit`} >
                <BiPencil /> Editar producto
            </Link>
            <span onClick={ () => handlerBarcode(producto) }>
                <BiBarcodeReader /> Codigo de barras
            </span>
            <span onClick={ () => handlerDeleted(id, nombre) }>
                <BiTrash /> Eliminar
            </span>
        </DropDown>
    )
};
