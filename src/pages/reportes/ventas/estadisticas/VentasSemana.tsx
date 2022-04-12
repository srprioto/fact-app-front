import { useEffect, useState } from "react";
import { StackedAreaChart } from "../../../../components/charts/StackedAreaChart";
import { Loading } from "../../../../components/loads/Loading";
import { get } from "../../../../resources/fetch";
import { VENTAS } from "../../../../resources/routes";

export const VentasSemana = () => {

    const [data, setData] = useState<any>([]);
    const [LoadingVentas, setLoadingVentas] = useState<boolean>(false);


    useEffect(() => {
        getData();
    }, [])
    

    const getData = async () => { 
        setLoadingVentas(true);
        try {
            const data = await get(VENTAS + "/reporte/ventas-semana");
            setData(data);
            setLoadingVentas(false);
        } catch (error) {
            setLoadingVentas(true);
            console.log(error);
        }
    }

    return (
        
        <div className="grid-1 gap box">

            <h3>Ventas de la semana</h3>
            {
                LoadingVentas
                ? <Loading />
                : (
                    <StackedAreaChart data={data.totalVentasSemana} />
                )
            }

        </div>
        
    )
}
