import { zeroFill } from "../../../../resources/func/ceroFill";
import { TransDropdown } from "./TransDropdown"

interface transaccion {
    elemento:any;
    handlerVer:Function;
}

export const Transaccion = ({ elemento, handlerVer }:transaccion) => {

    return (

        <tr className="transaccion">
            <td>{ zeroFill(elemento.id, 6) }</td>
            <td>{ elemento.descripcion }</td>
            <td>{ elemento.localDestino.nombre }</td>
            <td
               className={
                    elemento.estado_general === "enviado"
                    ? "warning" 
                    : elemento.estado_general === "listo" 
                    ? "success"
                    : elemento.estado_general === "observado" 
                    ? "danger"
                    : ""
               } 
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
