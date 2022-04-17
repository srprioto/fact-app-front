import { zeroFill } from "../../../../resources/func/ceroFill";
import { TransDropdown } from "./TransDropdown"

interface transaccion {
    elemento:any;
    handlerVer:Function;
}

export const Transaccion = ({ elemento, handlerVer }:transaccion) => {

    const handlerClassEstado = (estado:string) => { 
        if (estado === "enviado") {
            return "warning"
        } else if (estado === "listo") {
            return "success"
        } else if (estado === "observado") {
            return "danger"
        } else if (estado === "corregido") {
            return "primary"
        }
    }

    return (

        <tr className="transaccion">
            <td>{ zeroFill(elemento.id, 6) }</td>
            <td>{ elemento.descripcion }</td>
            <td>{ elemento.localDestino.nombre }</td>
            <td
               className={ handlerClassEstado(elemento.estado_general) } 
            >{ elemento.estado_general }</td>
            <td>{ elemento.created_at }</td>
            <td>
                <TransDropdown 
                    elemento={elemento}
                    handlerVer={handlerVer}
                    // handlerDeleted={handlerDeleted}
                />
            </td>
        </tr>

    )
}
