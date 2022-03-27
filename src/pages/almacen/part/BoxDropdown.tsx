import { BiPlus, BiShowAlt, BiTrash } from "react-icons/bi";

import { DropDown } from "../../../components/DropDown"

interface boxdropdown {
    id:number;
    nombreProducto:string;
    idLocalStock?:number|null;
    cantLocalStock?:number|null;
    // handlerDeleted:Function;
    // handlerMostrar:Function;
    handlerCantidad:Function;
}

export const BoxDropdown = ({ 
    id, 
    nombreProducto, 
    idLocalStock, 
    cantLocalStock, 
    // handlerDeleted, 
    // handlerMostrar, 
    handlerCantidad 
}:boxdropdown) => {

    return (
        <DropDown width="190">
            {/* <span onClick={ () => { handlerDeleted(id, nombreProducto) } } >
                <BiTrash />Eliminar
            </span> */}

            <span onClick={ () => { handlerCantidad(idLocalStock, cantLocalStock, nombreProducto) } } >
                <BiPlus />Cambiar cantidad
            </span>
            
            {/* <span onClick={ () => { handlerMostrar(id) } } >
                <BiShowAlt />Ver / Editar
            </span> */}
        </DropDown>
    )
};
