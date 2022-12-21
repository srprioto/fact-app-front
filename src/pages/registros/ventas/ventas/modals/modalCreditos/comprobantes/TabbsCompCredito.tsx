import { BiCartAlt, BiSpreadsheet, BiTask } from "react-icons/bi"
import { tipoVenta } from "../../../../../../../resources/dtos/VentasDto";

interface tabbsCompCredito {
    tabbs:number;
    setTabbs:Function;
    setSelectTipoComp:Function;
}

export const TabbsCompCredito = ({ tabbs, setTabbs, setSelectTipoComp }:tabbsCompCredito) => {
    return (
        <div className="grid-4 gap mt-15">
            <button 
                className={
                    "btn2 btn2-success " +
                    (tabbs === 1 && "btn2-sub-success")
                }
                
                onClick={() => {
                    setTabbs(1);
                    setSelectTipoComp(tipoVenta.venta_rapida);
                }}
            ><BiCartAlt/> Venta rapida
            </button>

            <button
                className={
                    "btn2 btn2-info " +
                    (tabbs === 2 && "btn2-sub-info")
                }
                onClick={() => {
                    setTabbs(2);
                    setSelectTipoComp(tipoVenta.boleta);
                }}
            ><BiSpreadsheet /> Boleta
            </button>

            <button
                className={
                    "btn2 btn2-info " +
                    (tabbs === 3 && "btn2-sub-info")
                }
                onClick={() => {
                    setTabbs(3);
                    setSelectTipoComp(tipoVenta.factura);
                }}
            ><BiTask /> Factura
            </button>
        </div>
    )
}
