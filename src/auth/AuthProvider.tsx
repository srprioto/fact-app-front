import { createContext } from "react";
import { decodeToken } from "react-jwt";
// import { Loading } from "../components/loads/Loading";
import { DataLogin } from "../resources/dtos/Login";
import { Roles } from "../resources/dtos/RolesDto";
import { post } from "../resources/fetch";
import { LOGIN } from "../resources/routes";
import { usePlugIn } from "./usePlugIn";

export const AuthContext = createContext<any>({});

export const AuthProvider = ({ children }:any) => {

    const [loggedUserApp, setLoggedUserApp] = usePlugIn();

    // useEffect(() => {
    //     try {
    //         localStorage.setItem("UserApp", JSON.stringify(loggedUserApp));
    //     } catch (error) {
    //         localStorage.removeItem("UserApp");
    //         console.log(error);
    //     }
    // }, [loggedUserApp])


    const login = async (dataAccess:DataLogin) => {
        let loginState:boolean = false;
        try {
            const responseLogin = await post(dataAccess, LOGIN);
            if (responseLogin.statusCode !== 401 && responseLogin.statusCode !== 'Unauthorized') {
                localStorage.setItem("UserApp", JSON.stringify(responseLogin));
                setLoggedUserApp(responseLogin);
                loginState = true;
            } else {
                setLoggedUserApp(null);
                loginState = false;
            }
        } catch (error) {
            localStorage.removeItem("UserApp");
            console.log(error);
        }
        return loginState
    }


    const logout = () => { 
        setLoggedUserApp(null);
        localStorage.removeItem("UserApp");
        localStorage.clear();
    }


    const isLogged = ():boolean => { 
        return !!loggedUserApp
    }


    const userInfo = ():any => { 
        const userApp:any = localStorage.getItem('UserApp');
        const tokenAccess:string = JSON.parse(userApp) ? JSON.parse(userApp).access_token : "";
        const token:string = isLogged() ? loggedUserApp.access_token : tokenAccess;
        return decodeToken(token);
    }


    const rol = ():string => { 
        return isLogged() ? userInfo().role : Roles.OUT;
    }


    const contextValue = {
        // loggedUserApp,
        login,
        logout,
        isLogged: isLogged(),
        userInfo: userInfo(),
        rol: rol()        
        // loadLogin: loading
    }


    return (
        <AuthContext.Provider value={contextValue}>
            { children }
        </AuthContext.Provider>
        // loading
        // ? <Loading />
        // : (
        //     <AuthContext.Provider value={contextValue}>
        //         { children }
        //     </AuthContext.Provider>
        // )
    )
}


// export const asdf = {
//     statusCode: 401,
//     message: "not allow",
//     error: "Unauthorized"
// }