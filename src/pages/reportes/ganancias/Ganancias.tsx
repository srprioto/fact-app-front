import { useEffect, useState } from "react";
import { BiBarChartAlt2, BiListUl } from "react-icons/bi";
import { TitleBox } from "../../../components/TitleBox"
import { post } from "../../../resources/fetch";
import { fechaInicioFinMes } from "../../../resources/func/fechas";
import { GANANCIAS } from "../../../resources/routes";
import { GananciasDetalles } from "./gananciasDetalles/GananciasDetalles";
import { ReporteGeneral } from "./reportesGenerales/ReporteGeneral";

export const Ganancias = () => {

    const [ inicioMes, finMes ] = fechaInicioFinMes();

    const [tabbs, setTabbs] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const [fechas, setFechas] = useState<any>({ inicio: inicioMes, fin: finMes });


    useEffect(() => {
        getData();
    }, [])


    const getData = async () => { 
        setLoading(true);

        const fechasMes:any = { 
            inicioMes: fechas.inicio, 
            finMes: fechas.fin 
        }

        try {
            const resto:any = await post(fechasMes, GANANCIAS + "/reporte_ingresos_ventas");
            setData(resto);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }
  

    return (
        <div className="ganancias">
            <TitleBox titulo="Reporte de ganancias"/>
            <div className="grid-4 box box-par">
                <button 
                    onClick={() => setTabbs(1)}
                    className={`btn2 btn2-info ${tabbs === 1 && "btn2-sub-info"}`}>
                    <BiBarChartAlt2 />
                    Reporte general
                </button>
                <button 
                    onClick={() => setTabbs(2)}
                    className={`btn2 btn2-info ${tabbs === 2 && "btn2-sub-info"}`}>
                    <BiListUl />
                    Ganancias detalles
                </button>
            </div>

            {
                tabbs === 1
                && <ReporteGeneral 
                    data={data.query} 
                    loading={loading} 
                    getData={getData}
                    fechas={fechas}
                    setFechas={setFechas}
                />
            }

            {
                tabbs === 2
                && <GananciasDetalles 
                    data={data} 
                    loading={loading} 
                    getData={getData}
                    fechas={fechas}
                    setFechas={setFechas} 
                    // totalGanancias={totalGanancias}
                />
            }

        </div>
    )
}
