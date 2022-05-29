import { BiChevronDown, BiExit, BiUserCircle } from "react-icons/bi"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/useAuth";

export const User = () => {

    const navigate = useNavigate();
    const auth = useAuth();

    const handlerSalir = () => { 
        auth.logout();
        navigate('/login');
    }

    return (
        <div className="user">

            <div className="box-user">
                <BiUserCircle size="40" />
                <span className="wrap-dropdown2">
                    <p>{ auth.userInfo.name }</p>
                    <BiChevronDown />
                    <div className="dropdown2">
                        <span onClick={handlerSalir}>
                            <BiExit className="rotate-180" /> Salir
                        </span>
                    </div>
                </span>
            </div>

        </div>
    )
}
