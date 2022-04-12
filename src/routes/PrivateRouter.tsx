import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../auth/useAuth";

export const PrivateRouter = () => {
    
    const auth = useAuth();
    
    return (
        auth.isLogged()
        ? <Outlet />
        : <Navigate to="/" />
    )
}
