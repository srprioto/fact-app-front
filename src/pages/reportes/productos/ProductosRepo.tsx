import { useState } from "react"
import { TitleBox } from "../../../components/TitleBox"
import { BiArchiveIn, BiListOl } from "react-icons/bi";
import { Reabastecimiento } from "./reabastecimiento/Reabastecimiento";
import { Stock } from "./stock/Stock";

export const ProductosRepo = () => {

    const [tabbs, setTabbs] = useState<number>(1);

    return (
        <div className="ganancias">

            <TitleBox titulo="Reporte de productos"/>

            <div className="grid-4 box box-par">
                <button 
                    onClick={() => setTabbs(1)}
                    className={`btn2 btn2-info ${tabbs === 1 && "btn2-sub-info"}`}>
                    <BiListOl />
                    Reabastecimiento
                </button>
                {/* <button 
                    onClick={() => setTabbs(2)}
                    className={`btn2 btn2-info ${tabbs === 2 && "btn2-sub-info"}`}>
                    <BiArchiveIn />
                    Stock
                </button> */}
            </div>

            { tabbs === 1 && <Reabastecimiento /> }
            {/* { tabbs === 2 && <Stock /> } */}

        </div>
    )
}
