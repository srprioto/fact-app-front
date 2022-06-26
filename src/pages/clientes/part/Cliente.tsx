import { CliDropdown } from "./CliDropdown"

export const Cliente = ({ cliente, handlerDeleted, handlerVer }:any) => {
    return (
        <tr className="cliente">
            <td className="box-resume-350">
                <p>
                    { cliente.tipoDocumento === "DNI"
                    ? cliente.nombre
                    : cliente.razonSocial }
                </p>
            </td>
            <td className="strong">{ cliente.tipoDocumento }</td>
            <td>{ cliente.numero_documento }</td>
            <td>{ cliente.telefono }</td>
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
