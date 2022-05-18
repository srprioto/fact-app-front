import { useState } from "react";
import { BiCartAlt, BiSpreadsheet, BiTask } from "react-icons/bi"

export const FormasPago = () => {

    const [tabState, setTabState] = useState<number>(1);

    const handlerTab = (index:number) => { 
        setTabState(index);
        // setVenta({
        //     ...venta,
        //     codigo_venta: "",
        //     clienteId: 0
        // })
        
    }

    return (
        <div>
            
            <div className="tabbs grid-3 gap mb-25">

                <button 
                    className={"btn2 btn2-success " + (tabState === 1 && "btn2-sub-success")}
                    onClick={() => handlerTab(1)}
                >
                    <BiCartAlt
                     /> Venta rapida
                </button>

                {/* <button 
                    className={"btn2 btn2-success " + (tabState === 1 && "btn2-sub-success")}
                    onClick={() => handlerTab(1)}
                >
                    <BiNote /> Nota venta
                </button> */}

                <button 
                    className={"btn2 btn2-info " + (tabState === 2 && "btn2-sub-info")}
                    onClick={() => handlerTab(2)}
                >
                    <BiSpreadsheet /> Boleta
                </button>

                <button 
                    className={"btn2 btn2-info " + (tabState === 3 && "btn2-sub-info")}
                    onClick={() => handlerTab(3)}
                >
                    <BiTask /> Factura
                </button>

            </div>

            <div className="tabs-formas-pago">

                { tabState === 1 && <div className="venta-rapida"></div> }
                { tabState === 2 && <div className="boleta"><h2>Boleta</h2></div> }
                { tabState === 3 && <div className="factura"><h2>Factura</h2></div> }
                {/* box m-0 box-par  */}
                
            </div>

        </div>
    )
}
