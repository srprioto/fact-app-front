import { useEffect, useState } from "react";
import { BiBarChartAlt2, BiDetail, BiDollarCircle, BiTask } from "react-icons/bi";
import { TitleBox } from "../../../components/TitleBox"
import { get } from "../../../resources/fetch";
import { LOCALES_SOLO } from "../../../resources/routes";
import { Comprobantes } from "./Comprobantes";
import { EstadisticasVentas } from "./EstadisticasVentas";
import { InfoGeneralVentas } from "./InfoGeneralVentas";
import { InformacionIngresos } from "./InformacionIngresos";


export const VentasRepo = () => {

    const [toggleGeneral, setToggleGeneral] = useState<number>(1); // tabs para los filtros general

    const [selectLocal, setSelectLocal] = useState<string>("_");
    const [loadingLocal, setLoadingLocal] = useState<boolean>(false);
    const [locales, setLocales] = useState([]);


    useEffect(() => {
        getData()
    }, [])


    const handlerToggle = (id:number) => { 
        setSelectLocal("_");
        // setLoadingLocal(false);
        // setLocales([]);
        setToggleGeneral(id);
    }
    

    const getData = async () => {
        setLoadingLocal(true);
        try {
            const data = await get(LOCALES_SOLO);
            setLocales(data);
            setLoadingLocal(false);
        } catch (error) {
            setLoadingLocal(true);
            console.log(error);
        }
    }
    

    return (
        <div className="ventas-repo">
            
            <TitleBox titulo="Reporte de ventas"/>

            <div className="grid-4 gap box box-par">
                <button 
                    onClick={() => handlerToggle(1)}
                    className={`btn2 btn2-info ${toggleGeneral === 1 && "btn2-sub-info"}`}>
                    <BiBarChartAlt2 />
                    Estadisticas
                </button>
                <button 
                    onClick={() => handlerToggle(2)}
                    className={`btn2 btn2-info ${toggleGeneral === 2 && "btn2-sub-info"}`}>
                    <BiDetail />
                    Registro de ventas
                </button>
                <button
                    onClick={() => handlerToggle(3)}
                    className={`btn2 btn2-info ${toggleGeneral === 3 && "btn2-sub-info"}`}>
                    <BiTask />
                    Registro de comprobantes
                </button>
                <button 
                    onClick={() => handlerToggle(4)}
                    className={`btn2 btn2-info ${toggleGeneral === 4 && "btn2-sub-info"}`}>
                    <BiDollarCircle />
                    Registro de caja
                </button>
                

            </div>

            { toggleGeneral === 1 && <EstadisticasVentas /> }
            { 
                toggleGeneral === 2 
                && <InfoGeneralVentas 
                    idLocal={selectLocal} 
                    selectLocal={setSelectLocal}
                    loadingLocal={loadingLocal}
                    locales={locales}
                /> 
            }
            {
                toggleGeneral === 3 
                && (
                    <Comprobantes 
                        idLocal={selectLocal} 
                        selectLocal={setSelectLocal}
                        loadingLocal={loadingLocal}
                        locales={locales}
                    />
                )
            }
            {
                toggleGeneral === 4
                && (
                    
                    <InformacionIngresos 
                        idLocal={selectLocal} 
                        selectLocal={setSelectLocal}
                        loadingLocal={loadingLocal}
                        locales={locales}
                    />
                )
            }

        </div>
    )
}
