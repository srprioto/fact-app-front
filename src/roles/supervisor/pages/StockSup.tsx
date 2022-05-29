import { useAuth } from "../../../auth/useAuth";
import { Tienda } from "../../../pages/locales/part/Tienda"
import { Supervisor } from "../Supervisor"

export const StockSup = () => {

    const auth = useAuth();

    const idLocal:any = auth.userInfo.local.id
    const nombreLocal:any = auth.userInfo.local.nombre

    return (
        <Supervisor>
            <Tienda
                idLocal={idLocal}
                nombreLocal={nombreLocal}
                user
            />
        </Supervisor>
    )
}
