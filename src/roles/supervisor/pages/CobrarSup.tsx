import { useAuth } from "../../../auth/useAuth";
import { Cobrar } from "../../../pages/cobrar/part/Cobrar"
import { Supervisor } from "../Supervisor"

export const CobrarSup = () => {

    const auth = useAuth();

    const idLocal:any = auth.userInfo.local.id;
    const nombreLocal:any = auth.userInfo.local.nombre;

    return (
        <Supervisor>
            <Cobrar
                idLocal={idLocal}
                nombreLocal={nombreLocal}
                user
            />
        </Supervisor>
    )
}
