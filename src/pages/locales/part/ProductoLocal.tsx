import { BiCaretDown } from "react-icons/bi";
import { useAuth } from "../../../auth/useAuth";
import { Roles } from "../../../resources/dtos/RolesDto";
import { BoxDropdown } from "./BoxDropdown";

import { DetallesProd } from "./DetallesProd";


interface Producto { 
    elemento:any;
    handlerCantidad:Function;
}

export const ProductoLocal = ({ 
    elemento, 
    handlerCantidad 
}:Producto) => {

    const auth = useAuth();

    return (
        <tr>
            <td>{ elemento.productos.codigo }</td>
            <td>{ elemento.productos.nombre }</td>
            <td className={
                    elemento.cantidad <= 10
                    ? elemento.cantidad === 0 || elemento.cantidad === null
                    ? "danger" 
                    : "warning"
                    : "success"
                }
            >
                {elemento.cantidad === null ? "---" : elemento.cantidad}
            </td>
            <td>
                <div className="wrap-detalles-prod">
                    <BiCaretDown />
                    <div className="detalles-prod">
                        <DetallesProd producto={elemento.productos} />
                    </div>
                </div>
            </td>
            <td>
                {
                    auth.rol === Roles.ADMIN
                    && (
                        <BoxDropdown 
                            nombreProducto={elemento.nombre}
                            idLocalStock={elemento.id}
                            cantLocalStock={elemento.cantidad}
                            handlerCantidad={handlerCantidad}
                        />
                    )
                    
                }
                
            </td>
        </tr>
    )
};
