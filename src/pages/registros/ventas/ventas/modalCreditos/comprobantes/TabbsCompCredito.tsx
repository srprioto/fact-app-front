import { BiCartAlt, BiSpreadsheet, BiTask } from "react-icons/bi"

export const TabbsCompCredito = ({ tabbs, setTabbs }:any) => {
    return (
        <div className="grid-4 gap mt-20">
            <button 
                className={
                    "btn2 btn2-success " +
                    (tabbs === 1 && "btn2-sub-success")
                }
                
                onClick={() => {setTabbs(1)}}
            ><BiCartAlt/> Venta rapida
            </button>

            {/* <button
                className={
                    "btn2 btn2-info " +
                    (tabbs === 2 && "btn2-sub-info")
                }
                onClick={() => {setTabbs(2)}}
            ><BiSpreadsheet /> Boleta
            </button>

            <button
                className={
                    "btn2 btn2-info " +
                    (tabbs === 3 && "btn2-sub-info")
                }
                onClick={() => {setTabbs(3)}}
            ><BiTask /> Factura
            </button> */}
        </div>
    )
}
