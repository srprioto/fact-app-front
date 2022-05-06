import { useState } from "react";
import { BiDetail, BiRename } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { TitleBox } from "../../../components/TitleBox"
import { InfoGeneralVentas } from "../../reportes/ventas/InfoGeneralVentas"
import { Caja } from "./Caja";

export const CajaChica = () => {

    const params = useParams(); // params.id, params.nombre

    const [toggle, setToggle] = useState<number>(1);

    return (
        <div className="caja-chica">

            <TitleBox titulo={"Caja chica - " + params.nombre} back/>
            
            <div className="box btn-tabs grid-3 gap">
                <button 
                    onClick={() => setToggle(1)}
                    className={`btn2 btn2-info ${toggle === 1 && "btn2-sub-info"}`}>
                    <BiRename />
                    Estado de caja
                </button>
                <button 
                    onClick={() => setToggle(2)}
                    className={`btn2 btn2-info ${toggle === 2 && "btn2-sub-info"}`}>
                    <BiDetail />
                    Registro de ventas
                </button>
            </div>

            { toggle === 1 && <Caja /> }
            { toggle === 2 && <InfoGeneralVentas idLocal={params.id} /> }

        </div>
    )
}
