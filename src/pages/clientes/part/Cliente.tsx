import { CliDropdown } from "./CliDropdown"

export const Cliente = ({ cliente, handlerDeleted, handlerVer }:any) => {
    return (
        <tr className="cliente">
            <td>{ cliente.nombre }</td>
            <td>{ cliente.documento }</td>
            <td>{ cliente.email }</td>
            <td>
                <CliDropdown 
                    id={cliente.id}
                    nombre={cliente.nombre}
                    handlerDeleted={handlerDeleted}
                    handlerVer={handlerVer}
                />
            </td>
        </tr>
    )
}
