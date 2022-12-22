import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../auth/useAuth";
import { Roles } from "../resources/dtos/RolesDto";

export const PublicRouter = () => {
    
    const auth = useAuth();
    
    return (
        !auth.isLogged
        ? <Outlet />
        : <RolesRedirect /> 
    )
}

const RolesRedirect = () => { 

    const auth = useAuth();

    if (auth.userInfo.role === Roles.ADMIN) {
        return <Navigate to="/dashboard" /> 
    } else if (auth.userInfo.role === Roles.SUPERVISOR){
        return <Navigate to="/local" />
    } else if (auth.userInfo.role === Roles.SALLER) {
        return <Navigate to="/punto-venta" />
    } else if (auth.userInfo.role === Roles.CONTABLE) {
        return <Navigate to="/contabilidad" />
    }

    return null
    
}

// else if (auth.userInfo().role === Role.SUPERVISOR){
//     return <Navigate to="/punto-venta" />
// }