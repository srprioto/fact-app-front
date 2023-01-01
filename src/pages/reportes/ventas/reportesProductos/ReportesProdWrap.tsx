import { useState } from "react";
import { BiTrendingDown, BiTrendingUp } from "react-icons/bi";
import { ReportesNoVentProds } from "./ReportesNoVentProds";
import { ReportesTopProductos } from "./ReportesTopProductos";


export const ReportesProdWrap = () => {

    const [toggle, setToggle] = useState<number>(1);

    return (
        <div className="reportes-prod-tabbs">

            <div className="box box-no-button m-0 grid-121">
                <div></div>
                <div className="grid-2">

                    <button 
                        onClick={() => setToggle(1)}
                        className={`btn2 btn2-success ${toggle === 1 && "btn2-sub-success"}`}>
                        <BiTrendingUp /> Productos vendidos
                    </button>

                    <button 
                        onClick={() => setToggle(2)}
                        className={`btn2 btn2-warning ${toggle === 2 && "btn2-sub-warning"}`}>
                        <BiTrendingDown /> Productos sin ventas
                    </button>

                </div>
    
            </div>

            {
                toggle === 1
                && <ReportesTopProductos />
            }
            {
                toggle === 2
                && <ReportesNoVentProds />
            }
            

        </div>
    )
}
