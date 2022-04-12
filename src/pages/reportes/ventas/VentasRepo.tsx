import { useState } from "react";
import { BiBarChartAlt2, BiDetail } from "react-icons/bi";
import { TitleBox } from "../../../components/TitleBox"
import { EstadisticasVentas } from "./EstadisticasVentas";
import { InfoGeneralVentas } from "./InfoGeneralVentas";


export const VentasRepo = () => {

    const [toggleGeneral, setToggleGeneral] = useState<number>(1); // tabs para los filtros general

    return (
        <div className="ventas-repo">
            
            <TitleBox titulo="Reporte de ventas"/>

            <div className="grid-3 gap box box-par">
                <button 
                    onClick={() => setToggleGeneral(1)}
                    className={`btn2 btn2-info ${toggleGeneral === 1 && "btn2-sub-info"}`}>
                    <BiBarChartAlt2 />
                    Estadisticas
                </button>
                <button 
                    onClick={() => setToggleGeneral(2)}
                    className={`btn2 btn2-info ${toggleGeneral === 2 && "btn2-sub-info"}`}>
                    <BiDetail />
                    Informacion general
                </button>
                <div></div>

            </div>

            { toggleGeneral === 1 && <EstadisticasVentas /> }
            { toggleGeneral === 2 && <InfoGeneralVentas /> }
            

        </div>
    )
}
