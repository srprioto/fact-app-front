import { useEffect, useState } from "react";
import { BiAlarmExclamation, BiAlarmSnooze, BiCheck, BiTransfer } from "react-icons/bi"

import { CardUno } from "../../../../components/cards/CardUno"
// import { Loading } from "../../../../components/loads/Loading"
import { get } from "../../../../resources/fetch";
import { TRANSACCIONES } from "../../../../resources/routes";

export const CardsDatosTransf = () => {

    const [data, setData] = useState<any>([]);
    const [Loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        getData();
    }, [])
    

    const getData = async () => { 
        setLoading(true);
        try {
            const data = await get(TRANSACCIONES + "/resumen-transacciones");
            setData(data);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    return (
        <div className="cards-datos-transf">

            <div className="grid-4 gap">
        
                <CardUno 
                    titulo="TRANSFERENCIAS TOTALES" 
                    label={data === undefined ? "..." : data.total}
                    icon={ <BiTransfer /> } 
                    loading={Loading}
                />
                
                <CardUno
                    titulo="TRANSFERENCIAS EN ESPERA" 
                    label={data === undefined ? "..." : data.enviados}
                    icon={ <BiAlarmSnooze /> }
                    coloricon="warning"
                    loading={Loading}
                />

                <CardUno 
                    titulo="TRANSFERENCIAS OBSERVADAS" 
                    label={data === undefined ? "..." : data.observados}
                    icon={ <BiAlarmExclamation /> } 
                    coloricon="danger"
                    loading={Loading}
                />

                <CardUno 
                    titulo="TRANSFERENCIAS TERMINADAS" 
                    label={data === undefined ? "..." : data.listos}
                    icon={ <BiCheck /> } 
                    coloricon="success"
                    loading={Loading}
                />
                
            </div>
   

        </div>
    )
}
