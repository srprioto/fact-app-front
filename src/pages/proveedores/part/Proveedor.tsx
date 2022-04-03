import { ProveedoresDto } from "../../../resources/dtos/ProveedoresDto";
import { ProvDropdown } from "./ProvDropdown";

interface proveedor{ 
    proveedor:ProveedoresDto;
    handlerDeleted:Function;
    handlerVer:Function;
}

export const Proveedor = ({ proveedor, handlerDeleted, handlerVer }:proveedor) => {
    return (
        <tr className="proveedor">
            <td>{ proveedor.nombre }</td>
            <td>{ proveedor.razon_social }</td>
            <td>{ proveedor.documento }</td>
            <td>{ proveedor.tipo_producto }</td>
            <td>
                <ProvDropdown 
                    id={proveedor.id}
                    nombre={proveedor.nombre}
                    handlerDeleted={handlerDeleted}
                    handlerVer={handlerVer}
                />
            </td>
        </tr>        
    )
};
