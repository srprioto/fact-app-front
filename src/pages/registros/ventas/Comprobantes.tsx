import { useEffect, useState } from "react";
import { GestionFechas } from "../../../components/fechas/GestionFechas";
import { Select } from "../../../components/forms/Select";
import { Loading } from "../../../components/loads/Loading";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { NoRegistros } from "../../../components/NoRegistros";
import { Pagination } from "../../../components/Pagination";
import { SearchWrap } from "../../../components/SearchWrap";
import { paginate } from "../../../resources/fetch";
import { COMPROBANTE_PAGINATE, COMPROBANTE_SEARCH } from "../../../resources/routes";
import { ComprobanteItem } from "./comprobantes/ComprobanteItem";
// import { ModalAnularComp } from "./comprobantes/ModalAnularComp";
import { ModalReenviarComp } from "./comprobantes/ModalReenviarComp";
import { ModalVerComprobante } from "./comprobantes/ModalVerComprobante";
import { TablaFiltro } from "./comprobantes/TablaFiltro";

interface infoComprobante {
    idLocal?:string; // el id local es obligatorio
    selectLocal?:Function;
    loadingLocal?:boolean;
    locales?:any;
}

export const Comprobantes = ({ idLocal, selectLocal, loadingLocal, locales }:infoComprobante) => {
    
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);
    const [modalReenviar, setModalReenviar] = useState<boolean>(false);
    const [modalAnular, setModalAnular] = useState<boolean>(false);
    // const [modalHabilitarVenta, setModalHabilitarVenta] = useState<boolean>(false);
    // const [idComprobante, setIdComprobante] = useState<number>(0);
    const [comprobante, setComprobante] = useState<any>({});
    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });
    const [data, setData] = useState<any>([]);
    const [toggle, setToggle] = useState<number>(1); // tabs para los filtros

    const [fechas, setFechas] = useState<any>({ inicio: "_", fin: "_" });
    
    // *** search
    const [searchState, setSearchState] = useState<boolean>(false); // estado de busqueda
    // *** end search

    // verifica si estamos en tiendas o en registros
    const tiendas = !locales ? 1 : 0;

    
    useEffect(() => {
        getData();
    }, [idLocal]);
    

    const getData = async (urlPage?:string, value?:string, idToggle?:number, payloadFechas?:any) => {
        const dates = payloadFechas ? payloadFechas : fechas;
        const toggle = idToggle ? idToggle : 1
        const value_filtro = value ? value : "_";

        setToggle(toggle);
        setLoadingData(true);

        const restoURL:string = `/${value_filtro}/${idLocal}/${dates.inicio}/${dates.fin}/${tiendas}`;

        try {
            let data:any;
            if (urlPage && urlPage !== "") {
                data = await paginate(urlPage);
            } else {
                data = await paginate(COMPROBANTE_PAGINATE + restoURL);
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
        setComprobante({});
    }


    const handlerVer = (comp:any) => { 
        setComprobante(comp);
        setModalVer(!modalVer);        
    }

    const reenviarComprobante = (comp:any) => { 
        setComprobante(comp);
        setModalReenviar(!modalReenviar);
    }

    const anularComprobante = (comp:any) => { 
        setComprobante(comp);
        setModalAnular(!modalAnular);
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
                        url={COMPROBANTE_SEARCH}
                        placeholder="Codigo de venta"
                        localId={idLocal}
                    />
                    <div className="grid-2 gap">
                        
                        <div className="grid-4">
                            {/* <ExportarExcel /> */}
                            <GestionFechas 
                                getData={getData} 
                                fechas={fechas}
                                setFechas={setFechas}
                            />
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

                <TablaFiltro
                    getData={getData}
                    toggle={toggle}
                />

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
                                        <th>Codigo venta</th>
                                        <th>Tipo comprobante</th>
                                        <th>Tipo documento</th>
                                        <th>Estado</th>
                                        <th>Fecha de emisión</th>
                                        <th>Local</th>
                                        <th className="transparent inlineblock">...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((e:any) => {
                                            return (
                                                <ComprobanteItem 
                                                    key={e.id}
                                                    comprobante={e}
                                                    handlerVer={handlerVer}
                                                    reenviarComprobante={reenviarComprobante}
                                                    anularComprobante={anularComprobante}
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
                <ModalVerComprobante
                    modal={modalVer}
                    setModal={setModalVer}
                    idComprobante={comprobante.id}
                />
            </ModalWrap>

            <ModalWrap modal={modalReenviar}>
                <ModalReenviarComp
                    modal={modalReenviar}
                    setModal={setModalReenviar}
                    idComprobante={comprobante.id}
                    getData={getData}
                />
            </ModalWrap>

            {/* <ModalWrap modal={modalAnular}>
                <ModalAnularComp
                    modal={modalAnular}
                    setModal={setModalAnular}
                    comprobante={comprobante}
                    getData={getData}
                />
            </ModalWrap> */}

        </>
    )
}
