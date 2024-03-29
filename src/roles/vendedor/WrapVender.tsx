import { useEffect } from "react";
import { BiCoffee } from "react-icons/bi";
import { useAuth } from "../../auth/useAuth";
import { useCaja } from "../../hooks/useContext/caja.ts/useCaja";
import { Vender } from "../../pages/vender/part/Vender";

export const WrapVender = () => {

    const caja = useCaja();
    const auth = useAuth();
    const cajaState = caja.cajaState;
    const idLocal:string = auth.userInfo.local.id;

    useEffect(() => {
        document.title = "Hola. " + auth.userInfo.name + "!";
    }, [])


    return (
        <div className="box-seller">

            {
                cajaState
                ? (
                    <Vender
                        idLocal={idLocal}
                        user
                    />
                ) : (
                    <div className="box middle no-caja">
                        <div className="center">
                            <h1 className="danger">Caja cerrada</h1>

                            <div className="mb-15 mt-15"><BiCoffee size="100" /></div>

                            <h3 className="">El supervisor tiene que abrir caja</h3>

                            <div className="grid-3 gap mt-25">
                                <div></div>
                                <button 
                                    className="btn btn-warning" 
                                    onClick={() => { caja.handlerEstadoCaja() }}
                                >
                                    Verificar estado de caja
                                </button>
                                <div></div>
                            </div>

                        </div>
                    </div>
                )
            }


        </div>
    )
}


