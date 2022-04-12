import { TransDropdown } from "./TransDropdown"

interface transaccion {
    elemento:any;
}

export const Transaccion = ({ elemento }:transaccion) => {

    return (

        <tr className="transaccion">
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
                    id={elemento.id}
                    nombre={elemento.nombre}
                    // handlerDeleted={handlerDeleted}
                    // handlerVer={handlerVer}
                />
            </td>
        </tr>

    )
}
