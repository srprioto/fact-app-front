import { ProveedoresDto } from "../../../resources/dtos/ProveedoresDto";
import { UserDropdown } from "./UserDropdown";

interface Usuario{ 
    usuario:ProveedoresDto;
    handlerDeleted:Function;
    handlerVer:Function;
}

export const Usuario = ({ usuario, handlerDeleted, handlerVer }:Usuario) => {
    return (
        <tr className="proveedor">
            <td>{ usuario.nombre }</td>
            <td>{ usuario.documento }</td>
            <td>{ usuario.telefono }</td>
            <td>{ usuario.email }</td>
            <td>
                <UserDropdown 
                    id={usuario.id}
                    nombre={usuario.nombre}
                    handlerDeleted={handlerDeleted}
                    handlerVer={handlerVer}
                />
            </td>
        </tr>        
    )
};

// id, nombre, documento, direccion, telefono, edad, email, created_at, updated_at, ,roles.id, roles.rol
