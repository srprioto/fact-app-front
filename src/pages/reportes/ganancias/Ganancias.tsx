import { useEffect, useState } from "react";
import { BiBarChartAlt2, BiListUl } from "react-icons/bi";
import { TitleBox } from "../../../components/TitleBox";
import { get, post } from "../../../resources/fetch";
import { fechaInicioFinMes } from "../../../resources/func/fechas";
import { VENTAS_REPORTES, LOCALES_SOLO } from "../../../resources/routes";
import { GananciasDetalles } from "./gananciasDetalles/GananciasDetalles";
import { ReporteGeneral } from "./reportesGenerales/ReporteGeneral";

export const Ganancias = () => {

    const [ inicioMes, finMes ] = fechaInicioFinMes();

    const [tabbs, setTabbs] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const [fechas, setFechas] = useState<any>({ inicio: inicioMes, fin: finMes });
    const [loadingLocales, setLoadingLocales] = useState<boolean>(false);
    const [locales, setLocales] = useState<Array<any>>([]);

    const [idLocal, setIdLocal] = useState<string>("_");


    useEffect(() => {
        getLocales();
    }, [])

    useEffect(() => {
        getData();
    }, [idLocal])


    const getLocales = async () => { 
        setLoadingLocales(true);
        try {
            const locales = await get(LOCALES_SOLO);
            setLocales(locales);
            setLoadingLocales(false);
        } catch (error) {
            setLoadingLocales(true);
            console.log(error);
        }
    }


    const getData = async () => { 
        setLoading(true);
        const fechasMes:any = { 
            inicioMes: fechas.inicio, 
            finMes: fechas.fin,
            idLocal: idLocal
        }
        try {
            const resto:any = await post(fechasMes, VENTAS_REPORTES + "/reporte_ingresos_ventas");
            setData(resto);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }


    const handlerLocal = (e:any) => { 
        setIdLocal(e.target.value)
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
                    handlerLocal={handlerLocal}
                    loadingLocales={loadingLocales}
                    locales={locales}
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
                    // idLocal={idLocal}
                    handlerLocal={handlerLocal}
                    loadingLocales={loadingLocales}
                    locales={locales}
                />
            }

        </div>
    )
}
