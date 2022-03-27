import { BiNote, BiSpreadsheet, BiTask } from "react-icons/bi"

export const FormasPagoBotones = ({ tabbs, setTabbs }:any) => {
    return (
        <div className="formas-pago-btns grid-4 gap">
            <button 
                className={"btn2 btn2-success " + (tabbs === 1 && "btn2-sub-success")}
                onClick={() => setTabbs(1)}
            ><BiNote /> Nota de venta
            </button>

            <button 
                className={"btn2 btn2-info " + (tabbs === 2 && "btn2-sub-info")}
                onClick={() => setTabbs(2)}
            ><BiSpreadsheet /> Boleta
            </button>

            <button 
                className={"btn2 btn2-warning " + (tabbs === 3 && "btn2-sub-warning")}
                onClick={() => setTabbs(3)}
            ><BiTask /> Factura
            </button>
        </div>
    )
}
