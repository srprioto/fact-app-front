import { BiShieldAlt2, BiSubdirectoryRight, BiUser } from "react-icons/bi"
import { useNavigate } from "react-router-dom";
// import imgLogin from '../../assets/imgs/img-login.png';

export const IndexLogin = () => {

    const navigate = useNavigate();

    const handlerLogin = () => { 
        navigate('/dashboard')
    }

    return (
        <div className="index-login">
            <div className="box-login grid-1 gap">

                <h3 className="">Acceder</h3>

                <div className="grid-2 gap">
                    <div className="content-input">
                        <div className="item-input">
                            <label htmlFor="user"><BiUser /></label>
                            <input id="user" type="text" placeholder="Usuario"/>
                        </div>
                    </div>
                    <div className="content-input">
                        <div className="item-input">
                            <label htmlFor="password"><BiShieldAlt2 /></label>
                            <input id="password" type="password" placeholder="Contraseña"/>
                        </div>
                    </div>
                </div>

                <div className="login-acceder grid-2 gap">
                    <button 
                        className="btn btn-success"
                        onClick={handlerLogin}
                    >
                        Acceder 
                        <BiSubdirectoryRight />
                    </button>
                </div>

            </div>
        </div>
    )
}
