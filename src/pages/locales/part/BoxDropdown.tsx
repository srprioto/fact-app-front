import { BiPlus, BiShowAlt, BiTrash } from "react-icons/bi";

import { DropDown } from "../../../components/DropDown"

interface boxdropdown {
    nombreProducto:string;
    idLocalStock?:number|null;
    cantLocalStock?:number|null;
    handlerCantidad:Function;
}

export const BoxDropdown = ({ 
    nombreProducto, 
    idLocalStock, 
    cantLocalStock, 
    handlerCantidad 
}:boxdropdown) => {

    return (
        <DropDown width="190">
            <span onClick={ () => { handlerCantidad(idLocalStock, cantLocalStock, nombreProducto) } } >
                <BiPlus />Cambiar cantidad
            </span>
        </DropDown>
    )
};
