import { useState } from "react";
import { BiDetail, BiDollarCircle, BiRename, BiTask } from "react-icons/bi";
import { TitleBox } from "../../../components/TitleBox"
import { useCaja } from "../../../hooks/useContext/caja.ts/useCaja";
import { Comprobantes } from "../../registros/ventas/Comprobantes";
import { Cotizaciones } from "../../registros/ventas/Cotizaciones";
import { InfoGeneralVentas } from "../../registros/ventas/InfoVentas"
import { InformacionIngresos } from "../../registros/ventas/InfoCaja";
import { Caja } from "./Caja";

interface cajaChica {
    idLocal:string;
    nombreLocal:string;
    user?:boolean
}

export const CajaChica = ({ idLocal, nombreLocal, user }:cajaChica) => {

    const cajaCtx = useCaja();

    const [toggle, setToggle] = useState<number>(1);

    const handlerToggle = (i:number) => { 
        user && cajaCtx.handlerEstadoCaja();
        setToggle(i);
    }

    return (
        <div className="caja-chica">

            {
                user
                ? <TitleBox titulo={"Caja chica"}/>
                : <TitleBox titulo={"Caja chica - " + nombreLocal} back/>
            }

            <div className="box btn-tabs grid-4">
                <button 
                    onClick={() => handlerToggle(1)}
                    className={`btn2 btn2-info ${toggle === 1 && "btn2-sub-info"}`}>
                    <BiRename />
                    Estado de caja
                </button>
                <button 
                    onClick={() => setToggle(2)}
                    className={`btn2 btn2-info ${toggle === 2 && "btn2-sub-info"}`}>
                    <BiDetail />
                    Registro ventas
                </button>

                <button 
                    onClick={() => setToggle(3)}
                    className={`btn2 btn2-info ${toggle === 3 && "btn2-sub-info"}`}>
                    <BiTask />
                    Registro comprob.
                </button>

                <button 
                    onClick={() => setToggle(4)}
                    className={`btn2 btn2-info ${toggle === 4 && "btn2-sub-info"}`}>
                    <BiDollarCircle />
                    Registro caja
                </button>
                
                {/* <button 
                    onClick={() => setToggle(5)}
                    className={`btn2 btn2-info ${toggle === 5 && "btn2-sub-info"}`}>
                    <BiDollarCircle />
                    Cotizaciones
                </button> */}
            </div>

            { toggle === 1 && <Caja idLocal={idLocal} nombreLocal={nombreLocal} user={user} /> }
            { toggle === 2 && <InfoGeneralVentas idLocal={idLocal} /> }
            { toggle === 3 && <Comprobantes idLocal={idLocal} /> }
            { toggle === 4 && <InformacionIngresos idLocal={idLocal} /> }            
            { toggle === 5 && <Cotizaciones idLocal={idLocal} /> }            

        </div>
    )
}
