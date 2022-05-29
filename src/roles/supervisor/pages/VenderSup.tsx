import { useAuth } from "../../../auth/useAuth";
import { Vender } from "../../../pages/vender/part/Vender"
import { Supervisor } from "../Supervisor"

export const VenderSup = () => {

    const auth = useAuth();

    const idLocal:any = auth.userInfo.local.id;

    return (
        <Supervisor>
            <Vender
                idLocal={idLocal}
                user
            />
        </Supervisor>
    )
}
