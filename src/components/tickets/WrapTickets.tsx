import { useAuth } from "../../auth/useAuth";
import { Roles } from "../../resources/dtos/RolesDto";
import { Tickets } from "./Tickets";

export const WrapTickets = () => {
    
    const auth = useAuth();
    const idLocal:string = !!auth.userInfo.local.id ? auth.userInfo.local.id : "_";

    if (auth.rol === Roles.ADMIN || auth.rol === Roles.SUPERVISOR) {
        return <Tickets idLocal={idLocal} idUser={auth.userInfo.sub} />
    } else {
        return null;
    }
}
