import { useEffect, useState } from "react";
import { BiCalendarWeek, BiCartAlt, BiDollarCircle, BiSend } from "react-icons/bi";

import { CardUno } from "../../../../components/cards/CardUno"
// import { Loading } from "../../../../components/loads/Loading";
import { get } from "../../../../resources/fetch";
import { moneda } from "../../../../resources/func/moneda";
import { VENTAS } from "../../../../resources/routes";

export const CardsEstadisticas = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [dataEstadisticas, setDataEstadisticas] = useState<any>({});

    useEffect(() => {
        getData();
    }, [])


    const getData = async () => { 
        setLoading(true);
        try {
            const data = await get(VENTAS + "/reporte/estadisticas");
            setDataEstadisticas(data);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    
    return (

        <div className="grid-4 gap">
            <CardUno
                titulo="Total de pedidos vendido hoy"
                label={dataEstadisticas.totalVendidosDia}
                icon={<BiCartAlt />}
                coloricon="success"
                loading={loading}
            />

            <CardUno
                titulo="Total de pedidos realizados hoy"
                label={dataEstadisticas.totalPedidosDia}
                icon={<BiSend />}
                coloricon="warning"
                loading={loading}
            />

            <CardUno
                titulo="Total recaudado hoy"
                label={dataEstadisticas.totalDineroDia ? "S/. " + moneda(dataEstadisticas.totalDineroDia) : "S/. 0"}
                icon={<BiDollarCircle />}
                coloricon="success"
                loading={loading}
            />

            <CardUno
                titulo="Total recaudado en la semana"
                label={
                    dataEstadisticas.totalDineroSemana 
                    ? "S/. " + moneda(dataEstadisticas.totalDineroSemana) 
                    : "S/. 0"
                }
                icon={<BiCalendarWeek />}
                coloricon="success"
                loading={loading}
            />

        </div>

    )
}
