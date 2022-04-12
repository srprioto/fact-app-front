import { createContext, useEffect } from "react";
import { DataLogin } from "../resources/dtos/Login";
import { post } from "../resources/fetch";
import { LOGIN } from "../resources/routes";
import { usePlugIn } from "./usePlugIn";

export const AuthContext = createContext<any>({});

// const userStorage:any = localStorage.getItem('UserApp');

export const AuthProvider = ({ children }:any) => {

    // const [loggedUserApp, setLoggedUserApp] = useState<any>(JSON.parse(userStorage) || null);

    const [loggedUserApp, setLoggedUserApp] = usePlugIn();


    useEffect(() => {
        try {
            localStorage.setItem("UserApp", JSON.stringify(loggedUserApp));
        } catch (error) {
            localStorage.removeItem("UserApp");
            console.log(error);
        }
    }, [loggedUserApp])
    

    const login = async (dataAccess:DataLogin) => {

        let loginState:boolean = false;

        try {
            const responseLogin = await post(dataAccess, LOGIN);
            // console.log(responseLogin);
            if (responseLogin.statusCode !== 401 && responseLogin.statusCode !== 'Unauthorized') {
                setLoggedUserApp(responseLogin);
                loginState = true;
            } else {
                setLoggedUserApp(null);
                loginState = false;
            }
            
        } catch (error) {
            console.log(error);
            
        }

        return loginState
        
    }

    const logout = () => { 
        setLoggedUserApp(null);
        localStorage.removeItem("UserApp");
        localStorage.clear();
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
