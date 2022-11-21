import { useState } from "react";
import { BiChevronDown, BiExit, BiUserCircle } from "react-icons/bi"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/useAuth";

export const User = () => {

    const [showUser, setShowUser] = useState<boolean>(false);

    const navigate = useNavigate();
    const auth = useAuth();

    const handlerSalir = () => { 
        auth.logout();
        navigate('/login');
    }

    return (
        <div className="user">

            { 
                showUser 
                && <div 
                    className="div-close" 
                    onClick={() => setShowUser(false)}
                /> 
            }
            <BiUserCircle size="40" className="icon-header m-0" />

            <span className="box-user">
                <div 
                    className="show-dropdown-user pointer"
                    onClick={() => setShowUser(!showUser)}
                >
                    <p>{ auth.userInfo.name }</p>
                    <BiChevronDown className="icon-header m-0" />
                </div>
                {
                    showUser 
                    && (
                        <div className="dropdown-user">
                            <span onClick={handlerSalir}>
                                <BiExit className="rotate-180" /> Salir
                            </span>
                        </div>
                    )
                }
                
            </span>
        </div>
    )
}
