import { NuevoCliente } from "../../../../pages/clientes/part/NuevoCliente"
import { Supervisor } from "../../Supervisor"

export const ClienteNuevoSub = () => {
    return (
        <Supervisor>
            <NuevoCliente />
        </Supervisor>
    )
}
