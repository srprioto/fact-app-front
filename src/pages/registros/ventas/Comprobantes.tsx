import { useEffect, useState } from "react";
import { GestionFechas } from "../../../components/fechas/GestionFechas";
import { Select } from "../../../components/forms/Select";
import { Loading } from "../../../components/loads/Loading";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { NoRegistros } from "../../../components/NoRegistros";
import { Pagination } from "../../../components/paginacion/Pagination";
import { SearchWrap } from "../../../components/search/SearchWrap";
import { paginate } from "../../../resources/fetch";
import { fechaInicioFin, fechaInicioFinMes } from "../../../resources/func/fechas";
import { COMPROBANTE_PAGINATE, COMPROBANTE_SEARCH } from "../../../resources/routes";
import { ComprobanteItem } from "./comprobantes/ComprobanteItem";
import { ModalReenviarComp } from "./comprobantes/modals/ModalReenviarComp";
import { ModalReimpComprob } from "./comprobantes/modals/ModalReimpComprob";
import { ModalVerComprobante } from "./comprobantes/modals/ModalVerComprobante";
import { TablaFiltro } from "./comprobantes/TablaFiltro";
import { ExportarExcelComprobantes } from "./comprobantes/ExportarExcelComprobantes";
import { ModalAnularVenta } from "./ventas/modals/ModalAnularVenta";
import { ToolTip } from "../../../components/tooltip/ToolTip";

interface infoComprobante {
    idLocal?:string; // el id local es obligatorio
    selectLocal?:Function;
    loadingLocal?:boolean;
    locales?:any;
    contable?:boolean;
}

export const Comprobantes = ({ idLocal, selectLocal, loadingLocal, locales, contable }:infoComprobante) => {

    const tiendas = !locales ? true : false;
    let inicioFecha:string = "";
    let finFecha:string = "";

    if (contable) {
        const [ inicioMes, finMes ] = fechaInicioFinMes();
        inicioFecha = inicioMes;
        finFecha = finMes;
    } else if (tiendas) {
        const [ inidioDia, finDia ] = fechaInicioFin();
        inicioFecha = inidioDia;
        finFecha = finDia;
    } else {
        inicioFecha = "_";
        finFecha = "_";
    }

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);
    const [modalReenviar, setModalReenviar] = useState<boolean>(false);
    const [modalAnular, setModalAnular] = useState<boolean>(false);
    const [modalReimprimir, setModalReimprimir] = useState<boolean>(false);
    
    // const [modalHabilitarVenta, setModalHabilitarVenta] = useState<boolean>(false);
    const [idComprobante, setIdComprobante] = useState<number>(0);
    // const [comprobante, setComprobante] = useState<any>({});
    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });
    const [data, setData] = useState<any>([]);
    const [toggle, setToggle] = useState<number>(1); // tabs para los filtros

    const [fechas, setFechas] = useState<any>({ 
        inicio: inicioFecha,
        fin: finFecha
    });

    // const [fechas, setFechas] = useState<any>({ 
    //     inicio: tiendas ? inidioDia : "_", 
    //     fin: tiendas ? finDia : "_"
    // });
    
    // *** search
    const [searchState, setSearchState] = useState<boolean>(false); // estado de busqueda
    // *** end search

    
    useEffect(() => {
        getData();
    }, [idLocal]);
    

    const getData = async (urlPage?:string, value?:string, idToggle?:number, payloadFechas?:any) => {
        const dates = payloadFechas ? payloadFechas : fechas;
        const toggle = idToggle ? idToggle : 1
        const value_filtro = value ? value : "_";

        setToggle(toggle);
        setLoadingData(true);

        const restoURL:string = `/${value_filtro}/${idLocal}/${dates.inicio}/${dates.fin}`;

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
        setIdComprobante(0);
    }


    const handlerVer = (idComp:number) => { 
        setIdComprobante(idComp);
        setModalVer(!modalVer);        
    }

    const reenviarComprobante = (idComp:number) => { 
        setIdComprobante(idComp);
        setModalReenviar(!modalReenviar);
    }

    const anularComprobante = (idComp:number) => { 
        setIdComprobante(idComp); // guarda el id de la venta, no del comprobante
        setModalAnular(!modalAnular);
    }

    const imprimirComprobante = (idComp:number) => { 
        setIdComprobante(idComp); // guarda el id de la venta, no del comprobante
        setModalReimprimir(!modalReimprimir);
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
                        placeholder="Codigo de venta, correlativo, cliente o nro de doc."
                        localId={idLocal}
                    />
                    <div className="grid-2 gap">
                        
                        <div className="grid-4 gap">
                            <GestionFechas 
                                getData={getData} 
                                fechas={fechas}
                                setFechas={setFechas}
                            />
                            <ExportarExcelComprobantes
                                fechas={fechas}
                            />
                        </div>

                        <div className="grid-1 middle">
                            {
                                !tiendas
                                && (
                                    <Select
                                        loading={loadingLocal}
                                        name={"id_local"}
                                        onChange={handlerLocal}
                                        textDefault="Selecciona un local"
                                        defaultValue={false}
                                        tooltip={{
                                            anchor: "btn-select-local",
                                            descripcion: "Filtra registros por locales"
                                        }}
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
                                        <th id="txt-cod-comp">Codigo venta</th>
                                        <th>Tipo comprobante</th>
                                        <th>Tipo documento</th>
                                        <th>Estado</th>
                                        <th>Fecha de emisión</th>
                                        <th>Local</th>
                                        <th className="transparent inlineblock">
                                            <ToolTip
                                                anchor="txt-cod-comp"
                                                descripcion="El código de venta está formado por, el numero de venta general, numero de venta de caja y el correlativo"
                                            /> 
                                        </th>
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
                                                    imprimirComprobante={imprimirComprobante}
                                                    contable={contable}
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
                    idComprobante={idComprobante}
                    getData={getData}
                    contable={contable}
                />
            </ModalWrap>

            <ModalWrap modal={modalReenviar}>
                <ModalReenviarComp
                    modal={modalReenviar}
                    setModal={setModalReenviar}
                    idComprobante={idComprobante}
                    getData={getData}
                />
            </ModalWrap>

            <ModalWrap modal={modalAnular}>
                <ModalAnularVenta
                    modal={modalAnular}
                    setModal={setModalAnular}
                    idVenta={idComprobante}
                    getData={getData}
                />
            </ModalWrap>

            <ModalWrap modal={modalReimprimir}>
                <ModalReimpComprob
                    modal={modalReimprimir}
                    setModal={setModalReimprimir}
                    idComprobante={idComprobante}
                />
            </ModalWrap>

        </>
    )
}
