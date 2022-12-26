import { useState } from "react";
import { BiBarChartAlt2, BiBox } from "react-icons/bi";
import { TitleBox } from "../../../components/TitleBox"
import { ReporteGeneralVentas } from "./reporteGeneral/ReporteGeneralVentas";
import { ReportesProductos } from "./reportesProductos/ReportesProductos";

export const Ventas = () => {

    const [tabbs, setTabbs] = useState<number>(1);

    return (
        <div className="reporte-ventas">
            <TitleBox titulo="Reporte de ventas"/>
            <div className="grid-4 box box-par">
                <button 
                    onClick={() => setTabbs(1)}
                    className={`btn2 btn2-info ${tabbs === 1 && "btn2-sub-info"}`}>
                    <BiBarChartAlt2 /> Reporte general
                </button>
                <button 
                    onClick={() => setTabbs(2)}
                    className={`btn2 btn2-info ${tabbs === 2 && "btn2-sub-info"}`}>
                    <BiBox /> Reporte productos
                </button>
            </div>

            {
                tabbs === 1
                && <ReporteGeneralVentas />
            }
            {
                tabbs === 2
                && <ReportesProductos />
            }

        </div>
    )
}
