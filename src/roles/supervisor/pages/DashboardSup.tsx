import { useAuth } from "../../../auth/useAuth";
import { CajaChica } from "../../../pages/cajaChica/part/CajaChica";
import { Supervisor } from "../Supervisor";

export const DashboardSup = () => {

    const auth = useAuth();

    const idLocal:string = auth.userInfo.local.id;
    const nombreLocal:any = auth.userInfo.local.nombre;

    return (
        <Supervisor>
            <CajaChica
                idLocal={idLocal}
                nombreLocal={nombreLocal}
                user
            />
        </Supervisor>
    )
}
