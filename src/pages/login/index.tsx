import { useEffect, useState } from "react";
import { BiLock, BiSubdirectoryRight, BiUser } from "react-icons/bi"
// import { useNavigate } from "react-router-dom";

import { useAuth } from "../../auth/useAuth";
import { LoadSwitchBtn2 } from "../../components/btns/LoadSwitchBtn2";
import { DataLogin } from "../../resources/dtos/Login";
// import imgLogin from '../../assets/imgs/img-login.png';


export const IndexLogin = () => {

    // const navigate = useNavigate();
    const auth = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);
    const [dataAccess, setDataAccess] = useState<DataLogin>({
        email: "",
        password: ""
    });

    useEffect(() => {
        setDataAccess({
            email: "",
            password: ""
        })
    }, [])
    

    const handlerOnChange = (e:any) => { 
        setDataAccess({
            ...dataAccess,
            [e.target.name]: e.target.value 
        })
    }

    const handlerLogin = async (event:any) => {
        event.preventDefault();        
        setLoading(true);
        setErrorMessage(false);
        const resto:boolean = await auth.login(dataAccess)
        if (!resto) {
            setErrorMessage(true);
            setLoading(false);
        } 
    }

    return (
        <div className="index-login">
            <form onSubmit={handlerLogin} className="box-login grid-1 gap">

                <h3 className="">Acceder</h3>

                <div className="grid-2 gap">
                    <div className="content-input">
                        <div className="item-input">
                            <label htmlFor="email"><BiUser /></label>
                            <input 
                                id="email"
                                name="email"
                                type="text" 
                                placeholder="E-mail" 
                                onChange={handlerOnChange}
                            />
                        </div>
                    </div>
                    <div className="content-input">
                        <div className="item-input">
                            <label htmlFor="password"><BiLock /></label>
                            <input 
                                id="password" 
                                name="password"
                                type="password"
                                placeholder="Contraseña" 
                                onChange={handlerOnChange}
                            />
                        </div>
                    </div>
                </div>

                <div className="login-acceder grid-2 gap">

                    <LoadSwitchBtn2
                        loading={loading}
                        className="btn btn-success"
                        // handler={handlerLogin}
                    >
                        Acceder 
                        <BiSubdirectoryRight />
                    </LoadSwitchBtn2>

                    {/* <button 
                        className="btn btn-success"
                        onClick={handlerLogin}
                    >
                        
                    </button> */}
                </div>

                <div className="msg-error-login">
                    {
                        errorMessage && <h5 className="warning center">Correo o contraseña incorrecto</h5>
                    }
                </div>

            </form>
        </div>
    )
}
