import { useEffect, useState } from "react";
import { BiDetail, BiDollarCircle, BiTask } from "react-icons/bi";
import { TitleBox } from "../../../components/TitleBox"
import { get } from "../../../resources/fetch";
import { LOCALES_SOLO } from "../../../resources/routes";
import { Comprobantes } from "./Comprobantes";
import { InfoGeneralVentas } from "./InfoVentas";
import { InformacionIngresos } from "./InfoCaja";


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
            
            <TitleBox titulo="Registros de ventas"/>

            <div className="grid-4 box box-par">

                <button 
                    onClick={() => handlerToggle(1)}
                    className={`btn2 btn2-info ${toggleGeneral === 1 && "btn2-sub-info"}`}>
                    <BiDetail />
                    Registro ventas
                </button>
                <button
                    onClick={() => handlerToggle(2)}
                    className={`btn2 btn2-info ${toggleGeneral === 2 && "btn2-sub-info"}`}>
                    <BiTask />
                    Registro comprob.
                </button>
                <button 
                    onClick={() => handlerToggle(3)}
                    className={`btn2 btn2-info ${toggleGeneral === 3 && "btn2-sub-info"}`}>
                    <BiDollarCircle />
                    Registro caja
                </button>
                {/* <button 
                    onClick={() => handlerToggle(5)}
                    className={`btn2 btn2-info ${toggleGeneral === 5 && "btn2-sub-info"}`}>
                    <BiBook />
                    Cotizaciones
                </button> */}

            </div>

            { 
                toggleGeneral === 1 
                && <InfoGeneralVentas 
                    idLocal={selectLocal} 
                    selectLocal={setSelectLocal}
                    loadingLocal={loadingLocal}
                    locales={locales}
                /> 
            }
            {
                toggleGeneral === 2 
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
                toggleGeneral === 3
                && (
                    
                    <InformacionIngresos 
                        idLocal={selectLocal} 
                        selectLocal={setSelectLocal}
                        loadingLocal={loadingLocal}
                        locales={locales}
                    />
                )
            }
            {/* {
                toggleGeneral === 5
                && (
                    
                    <Cotizaciones 
                        idLocal={selectLocal} 
                        selectLocal={setSelectLocal}
                        loadingLocal={loadingLocal}
                        locales={locales}
                    />
                )
            } */}

        </div>
    )
}
