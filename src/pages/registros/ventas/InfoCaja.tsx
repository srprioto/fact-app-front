import { useEffect, useState } from "react";
import { Select } from "../../../components/forms/Select"
import { Loading } from "../../../components/loads/Loading"
import { ModalWrap } from "../../../components/modals/ModalWrap"
import { NoRegistros } from "../../../components/NoRegistros"
import { Pagination } from "../../../components/paginacion/Pagination"
// import { SearchWrap } from "../../../components/SearchWrap"
import { paginate } from "../../../resources/fetch"
import { CAJA } from "../../../resources/routes"
import { ItemCaja } from "./caja/ItemCaja"
import { ModalCajaDetalles } from "./caja/ModalCajaDetalles"

interface informacionIngresos {
    idLocal?:string // este es obligatorio
    selectLocal?:Function;
    loadingLocal?:boolean;
    locales?:any;
}

export const InformacionIngresos = ({ idLocal, selectLocal, loadingLocal, locales }:informacionIngresos) => {

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);
    // const [modalHabilitarVenta, setModalHabilitarVenta] = useState<boolean>(false);
    // const [itemCaja, setItemCaja] = useState<any>({});
    const [cajaId, setCajaId] = useState<number>(0);
    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });
    const [data, setData] = useState<any>([]);

    // const [fechas, setFechas] = useState<any>({ inicio: "_", fin: "_" });
    // const [toggle, setToggle] = useState<number>(1); // tabs para los filtros
    
    // *** search
    // const [searchState, setSearchState] = useState<boolean>(false); // estado de busqueda
    // *** end search

    useEffect(() => {
        getData();
    }, [idLocal]);
    

    const handlerVer = (id:number) => { 
        setCajaId(id);
        setModalVer(!modalVer);
    }


    const getData = async (urlPage?:string) => {

        // const dates = payloadFechas ? payloadFechas : fechas;

        // const idLocal:any = "_"; // añadir un select solo de tiendas
        // const toggle = idToggle ? idToggle : 1
        // const value_filtro = value ? value : "_";

        // setToggle(toggle);
        setLoadingData(true);

        // const restoURL = `/${idLocal}/${dates.inicio}/${dates.fin}/filtro`;
        const restoURL = `/${idLocal}/filtro`;

        try {
            let data:any;
            if (urlPage && urlPage !== "") {
                data = await paginate(urlPage);
            } else {
                data = await paginate(CAJA + restoURL);
            }

            setData(data.items);
            setPagination({
                meta: data.meta,
                links: data.links
            });

            setLoadingData(false);
        } catch (error) {
            setLoadingData(true);
            console.log(error);
        }
        setCajaId(0);
    }


    const handlerLocal = (e:any) => { 
        selectLocal && selectLocal(
            e.target.value
        )
    }


    return (
        <div className="informacion-ingresos">

            {/* <div className="box">
                <div className="grid-2 gap">
                    <SearchWrap 
                        setLoadingData={setLoadingData}
                        setData={setData}
                        getData={getData}
                        searchState={searchState}
                        setSearchState={setSearchState}
                        url={VENTAS_SEARCH}
                        placeholder="Nombre del cliente ..."
                    />
                </div>
            </div> */}

            <div className="box">

                <div className="grid-2 gap">
                    <div className="grid-4"></div>
                    <div className="grid-2 gap">
                        <div className="grid-4">
                        </div>
                        <div className="grid-1 middle">
                            {
                                selectLocal
                                && (
                                    <Select
                                        loading={loadingLocal}
                                        name={"id_local"}
                                        onChange={handlerLocal}
                                        textDefault="Selecciona un local"
                                        defaultValue={false}
                                    >
                                        <option key={"_"} value={"_"}>Todas las tiendas</option>
                                        {
                                            locales.map((e:any) => { 
                                                return (
                                                    <option key={e.id} value={Number(e.id)}>{ e.nombre }</option>
                                                )
                                            })
                                        }
                                    </Select>
                                )
                            }
                            
                        </div>
                    </div>
                </div>        

                {/* <TabbsFiltroDatos
                    getData={getData}
                /> */}

                {
                    loadingData 
                    ? <Loading />
                    : (
                        data.length <= 0
                        ? <NoRegistros />
                        : (
                            <table className="table">
                                
                                <thead>
                                    <tr>
                                        <th>Codigo caja</th>
                                        <th>Estado caja</th>
                                        <th>Monto apertura</th>
                                        <th>Monto cierre</th>
                                        <th>Monto recaudado</th>
                                        <th>Fecha</th>
                                        <th className="transparent inlineblock">...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((e:any) => {
                                            return (
                                                <ItemCaja 
                                                    key={e.id} 
                                                    item={e} 
                                                    handlerVer={handlerVer}
                                                />
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                    )
                }

                <Pagination 
                    getData={getData}
                    previous={pagination.links.previous} 
                    currentPage={pagination.meta.currentPage} 
                    next={pagination.links.next} 
                    // searchState={searchState}
                />

            </div>

            <ModalWrap modal={modalVer}>
                <ModalCajaDetalles
                    modal={modalVer}
                    setModal={setModalVer}
                    cajaId={cajaId}
                />
            </ModalWrap>

        </div>
    )
}
