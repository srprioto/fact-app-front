import { useEffect, useState } from "react";
import { Select } from "../../../components/forms/Select";
import { Loading } from "../../../components/loads/Loading";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { NoRegistros } from "../../../components/NoRegistros";
import { Pagination } from "../../../components/paginacion/Pagination";
import { SearchWrap } from "../../../components/search/SearchWrap";
import { paginate } from "../../../resources/fetch";
import { COTIZACION_PAGINATE, COTIZACION_SEARCH } from "../../../resources/routes";
import { CotizacionItem } from "./cotizaciones/CotizacionItem";
import { ModalCotizDetalles } from "./cotizaciones/ModalCotizDetalles";
import { ModalHabilitarCotiz } from "./cotizaciones/ModalHabilitarCotiz";

interface cotizaciones {
    idLocal?:string; // el id local es obligatorio
    selectLocal?:Function;
    loadingLocal?:boolean;
    locales?:any;
}

export const Cotizaciones = ({ idLocal, selectLocal, loadingLocal, locales }:cotizaciones) => {

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);
    const [modalHabilitarVenta, setModalHabilitarVenta] = useState<boolean>(false);
    // const [modalAnular, setModalAnular] = useState<boolean>(false);
    const [idVenta, setIdVenta] = useState<number>(0);
    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });
    const [data, setData] = useState<any>([]);
    // const [toggle, setToggle] = useState<number>(1); // tabs para los filtros
    
    // *** search
    const [searchState, setSearchState] = useState<boolean>(false); // estado de busqueda
    // *** end search

    
    useEffect(() => {
        getData();
    }, [idLocal]);
    

    const handlerVer = (id:number) => { 
        setIdVenta(id);
        setModalVer(!modalVer);        
    }

    const handlerHabilitarVenta = (idVenta:number) => {
        setIdVenta(idVenta);
        setModalHabilitarVenta(true);
    }

    // const handlerAnular = (idVenta:number) => { 
    //     setIdVenta(idVenta);
    //     setModalAnular(true);
    // }


    const getData = async (
        urlPage?:string, 
        // value?:string, idToggle?:number
    ) => {

        // const idLocal:any = "_"; // añadir un select solo de tiendas
        // const toggle = idToggle ? idToggle : 1

        // setToggle(toggle);
        setLoadingData(true);

        try {
            let data:any;
            if (urlPage && urlPage !== "") {
                data = await paginate(urlPage);
            } else {
                data = await paginate(COTIZACION_PAGINATE + `/${idLocal}`);
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
        setIdVenta(0);
    }


    const handlerLocal = (e:any) => { 
        selectLocal && selectLocal(
            e.target.value
        )
    }
   

    return (
        <>
            <div className="box">

                <div className="grid-2 gap">
                    <SearchWrap 
                        setLoadingData={setLoadingData}
                        setData={setData}
                        getData={getData}
                        searchState={searchState}
                        setSearchState={setSearchState}
                        url={COTIZACION_SEARCH} // coregir busquedas
                        placeholder="Codigo de cotizacion"
                        localId={idLocal}
                    />
                    <div className="grid-2 gap">
                        
                        <div className="grid-3">
                            {/* <ExportarExcel /> */}
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
            </div>

            <div className="box">

                {/* <TabbsFiltroDatos 
                    getData={getData}
                    toggle={toggle}
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
                                        <th>Codigo cotizacion</th>
                                        {/* <th>Costo total</th> */}
                                        <th>Local</th>
                                        <th className="transparent inlineblock">...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((e:any) => {
                                            return (
                                                <CotizacionItem
                                                    key={e.id}
                                                    ventas={e}
                                                    updateData={handlerHabilitarVenta}
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
                    searchState={searchState}
                />

            </div>

            {/* modals aqui */}
            <ModalWrap modal={modalVer}>
                <ModalCotizDetalles
                    modal={modalVer}
                    setModal={setModalVer}
                    idVenta={idVenta}
                />
            </ModalWrap>
            
            <ModalHabilitarCotiz 
                modal={modalHabilitarVenta}
                setModal={setModalHabilitarVenta}
                idVenta={idVenta}
                getData={getData}
            />
            
            {/* <ModalWrap modal={modalAnular}>
                <ModalAnularVenta
                    modal={modalAnular}
                    setModal={setModalAnular}
                    idVenta={idVenta}
                    getData={getData}
                />
            </ModalWrap> */}

        </>
    )
}
