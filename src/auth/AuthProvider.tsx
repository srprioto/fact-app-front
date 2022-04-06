import { createContext, useEffect, useState } from "react";
import { DataLogin } from "../resources/dtos/Login";
import { post } from "../resources/fetch";
import { LOGIN } from "../resources/routes";

export const AuthContext = createContext<any>({});

const userStorage:any = localStorage.getItem('UserApp');

export const AuthProvider = ({ children }:any) => {

    const [loggedUserApp, setLoggedUserApp] = useState<any>(JSON.parse(userStorage) || null);

    useEffect(() => {
        try {
            localStorage.setItem("UserApp", JSON.stringify(loggedUserApp));
        } catch (error) {
            localStorage.removeItem("UserApp");
            console.log(error);
        }
    }, [loggedUserApp])
    
    const login = async (dataAccess:DataLogin) => {

        // let loginState:boolean = false;

        try {
            const responseLogin = await post(dataAccess, LOGIN);
            console.log(responseLogin);
            if (responseLogin.statusCode !== 401 && responseLogin.statusCode !== 'Unauthorized') {
                setLoggedUserApp(responseLogin);
            } else {
                setLoggedUserApp(null);
            }
            
            // loginState = true;
        } catch (error) {
            // console.log(error);
            // loginState = false;
            
        }

        // return loginState
        
    }

    const logout = () => { 
        setLoggedUserApp(null);
        localStorage.removeItem("UserApp");
    }

    const isLogged = () => { 
        return !!loggedUserApp
    }

    const contextValue = {
        loggedUserApp,
        login,
        logout,
        isLogged
    }


    return (
        <AuthContext.Provider value={contextValue}>
            { children }
        </AuthContext.Provider>
    )
}
