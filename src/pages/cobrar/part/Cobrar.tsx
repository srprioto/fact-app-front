import { useEffect, useState } from "react";
import { Loading } from "../../../components/loads/Loading";
import { TitleBox } from "../../../components/TitleBox"
import { SearchWrap } from "../../../components/SearchWrap";
import { TablaVentas } from "./TablaVentas";
import { DescripcionVenta } from "./DescripcionVenta";
import { get, getOne } from "../../../resources/fetch";
import { VENTAS, VENTAS_PEDIDOS, VENTAS_SEARCH_LOCAL } from "../../../resources/routes";
import { BiRefresh } from "react-icons/bi";
import { TextoRelleno } from "../../../components/TextoRelleno";

interface cobrar{
    idLocal:string;
    nombreLocal?:string;
    user?:boolean;
}

export const Cobrar = ({ idLocal, nombreLocal, user }:cobrar) => {
    
    const [searchState, setSearchState] = useState<boolean>(false); // estado de busqueda

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [loadingOne, setLoadingOne] = useState<boolean>(false);

    const [data, setData] = useState<any>([]);
    const [getVenta, setGetVenta] = useState<any>({});

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoadingData(true);
        try {
            const data = await get(VENTAS_PEDIDOS + "/" + idLocal);
            setData(data);
            setLoadingData(false);
        } catch (error) {
            setLoadingData(true);
            console.log(error);
        }
    }

    const handlerGetFacturaVenta = async (idVenta:number) => { 

        setLoadingOne(true);
        try {
            const response = await getOne(idVenta, VENTAS);
            setGetVenta(response);
            setLoadingOne(false);
        } catch (error) {
            setLoadingOne(true);
            console.log(error);
        }
    }

    const handlerRefresh = () => { 
        getData();
        setSearchState(false);
        setGetVenta({});
    }

    return (
        <div className="cobrar">

            {
                user
                ? <TitleBox titulo={`Cobrar`}/>
                : <TitleBox titulo={`Cobrar - ${nombreLocal}`} link="/tiendas"/>
            }
            
            
            <div className="grid-13 gap">
                <div className="box scroll-box-no-margin">

                    <div className="grid-1 gap mb-25">
                        <div className="grid-all-btn">
                            <SearchWrap 
                                setLoadingData={setLoadingData}
                                setData={setData}
                                getData={getData}
                                searchState={searchState}
                                setSearchState={setSearchState}
                                url={VENTAS_SEARCH_LOCAL}
                                placeholder="Codigo venta"
                                localId={idLocal}
                            />
                            <button
                                className="btn2 btn2-success pr-0"
                                onClick={() => handlerRefresh()}
                            >
                                <BiRefresh />
                            </button>
                        </div>
                    </div>
                    {
                        loadingData
                        ? <div style={{height: 'calc(100% - 122px)', margin: "0 0 58px 0"}}><Loading /></div>
                        : (
                            data.length <= 0
                            ? <div className="no-venta">
                                <TextoRelleno texto="Aun no hay ventas" />
                            </div>
                            : (
                                <TablaVentas
                                    data={data}
                                    handlerGetFacturaVenta={handlerGetFacturaVenta}
                                />
                                
                            )
                        )
                    }

                </div>

                <div className="box scroll-box-no-margin">

                    {
                        loadingOne
                        ? <Loading />
                        : (
                            !(Object.keys(getVenta).length <= 0 )
                            ? (
                                <DescripcionVenta
                                    data={getVenta}
                                    handlerRefresh={handlerRefresh}
                                    loadingOne={loadingOne}
                                />
                            ) : <TextoRelleno texto="Selecciona un pedido" />
                        )
                    }

                    {/* {
                        !(Object.keys(getVenta).length <= 0 )
                        ? (
                            loadingOne
                            ? <Loading />
                            : (
                                <DescripcionVenta
                                    data={getVenta}
                                    handlerRefresh={handlerRefresh}
                                />
                            )
                        ) : (
                            <TextoRelleno texto="Selecciona un pedido" />
                        )
                    } */}

                </div>
            </div>
        </div>
    )
}

