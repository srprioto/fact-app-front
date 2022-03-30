import { BiAlarmExclamation, BiAlarmSnooze, BiCheck, BiTransfer } from "react-icons/bi"

import { CardUno } from "../../../../components/cards/CardUno"
import { Loading } from "../../../../components/loads/Loading"

export const CardsDatosTransf = ({ resumen, loading }:any) => {

    return (
        <div className="cards-datos-transf">

            <div className="grid-4 gap">
        
                <CardUno 
                    titulo="TRANSFERENCIAS TOTALES" 
                    label={resumen === undefined ? "..." : resumen.total}
                    icon={ <BiTransfer /> } 
                />
                
                <CardUno
                    titulo="TRANSFERENCIAS EN ESPERA" 
                    label={resumen === undefined ? "..." : resumen.enviados}
                    icon={ <BiAlarmSnooze /> }
                    coloricon="warning"
                />

                <CardUno 
                    titulo="TRANSFERENCIAS OBSERVADAS" 
                    label={resumen === undefined ? "..." : resumen.observados}
                    icon={ <BiAlarmExclamation /> } 
                    coloricon="danger"
                />

                <CardUno 
                    titulo="TRANSFERENCIAS TERMINADAS" 
                    label={resumen === undefined ? "..." : resumen.listos}
                    icon={ <BiCheck /> } 
                    coloricon="success"
                />
                
            </div>
   

        </div>
    )
}
