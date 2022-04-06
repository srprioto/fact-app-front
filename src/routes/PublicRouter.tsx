import { useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../auth/useAuth";

export const PublicRouter = () => {
    
    const auth = useAuth();
    
    return (
        !auth.isLogged()
        ? <Outlet />
        : <Navigate to="/dashboard" />
    )
}
