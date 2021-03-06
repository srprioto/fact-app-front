import { BiCartAlt, BiSpreadsheet, BiTask } from "react-icons/bi"

interface tabsVenta {
    switchChangeFact:boolean;
    tipoSerie:Function;
    tabbs:number;
    setTabbs:Function;
}

export const TabsVenta = ({ switchChangeFact, tipoSerie, tabbs, setTabbs }:tabsVenta) => {
    return (
        <div className="tabbs-buttons tabbs grid-4 gap mb-25">
            <button 
                className={
                    "btn2 btn2-success " + 
                    (!switchChangeFact ? ( tipoSerie() === 1 ? "" : "btn2-disable " ) : "") +
                    (tabbs === 1 && "btn2-sub-success")
                }
                
                onClick={() => {switchChangeFact && setTabbs(1)}}
            ><BiCartAlt/> Venta rapida
            </button>

            <button
                className={
                    "btn2 btn2-info " + 
                    (!switchChangeFact ? ( tipoSerie() === 2 ? "" : "btn2-disable " ) : "") +
                    (tabbs === 2 && "btn2-sub-info")
                }
                onClick={() => {switchChangeFact && setTabbs(2)}}
            ><BiSpreadsheet /> Boleta
            </button>

            <button 
                className={
                    "btn2 btn2-info " + 
                    (!switchChangeFact ? ( tipoSerie() === 3 ? "" : "btn2-disable " ) : "") +
                    (tabbs === 3 && "btn2-sub-info")
                }
                onClick={() => {switchChangeFact && setTabbs(3)}}
            ><BiTask /> Factura
            </button>
        </div>
    )
}
