import { useAuth } from "../../auth/useAuth";
import { Roles } from "../../resources/dtos/RolesDto";
import { Header } from "./Header";
import { Menu } from "./Menu";

export const Layout = ({ children }:any) => {

    const auth = useAuth();

    const admin = () => { 
        if (auth.rol === Roles.ADMIN) {
            return true
        } else {
            return false
        }
    }

    return (
        <div className={admin() ? "layout" : "w100"}>
            { admin() && <Menu /> }
            <div className="wrap-main">
                <Header/>
                <div className="main">
                    { children }
                </div>
            </div>
        </div>
    ) 
};
