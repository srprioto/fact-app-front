import { useEffect, useState } from "react";
import { BiBarChartAlt, BiDollar } from "react-icons/bi"
import { CardUno } from "../../../../components/cards/CardUno"
import { get } from "../../../../resources/fetch";
import { moneda } from "../../../../resources/func/moneda";
import { GANANCIAS } from "../../../../resources/routes";

export const CardsIngresosGenerales = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>({});

    useEffect(() => {
        getData();
    }, [])


    const getData = async () => { 
        setLoading(true);
        try {
            const resto = await get(GANANCIAS + "/ingresos_ventas_general");
            setData(resto);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    return (
        <div className="grid-4 gap">
            <CardUno
                titulo="Ganancias del dia"
                label={"S/. " + moneda(data.gananciasHoy)}
                icon={<BiDollar />}
                coloricon="success"
                loading={loading}
            />
            <CardUno
                titulo="Total de ingresos del mes"
                label={"S/. " + moneda(data.ingresos)}
                icon={<BiDollar />}
                coloricon="info"
                loading={loading}
            />
            <CardUno
                titulo="Total costos de productos del mes"
                label={"S/. " + moneda(data.costos)}
                icon={<BiDollar />}
                coloricon="danger"
                loading={loading}
            />
            <CardUno
                titulo="Ganancias del mes"
                label={"S/. " + moneda(data.ganancias)}
                icon={<BiBarChartAlt />}
                coloricon="success"
                loading={loading}
            />
        </div>
    )
}
