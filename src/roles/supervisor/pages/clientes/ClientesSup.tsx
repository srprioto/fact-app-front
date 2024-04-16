// import { useAuth } from "../../../../auth/useAuth";
import { Clientes } from "../../../../pages/clientes/part/Clientes";
import { Supervisor } from "../../Supervisor"

export const ClientesSup = () => {

    // const auth = useAuth();

    // const idLocal:any = auth.userInfo.local.id
    // const nombreLocal:any = auth.userInfo.local.nombre

    return (
        <Supervisor>
            <Clientes />
        </Supervisor>
    )
}





