import { EditarCliente } from "../../../../pages/clientes/part/EditarCliente"
import { Supervisor } from "../../Supervisor"

export const ClienteEditarSub = () => {
    return (
        <Supervisor>
            <EditarCliente />
        </Supervisor>
    )
}
