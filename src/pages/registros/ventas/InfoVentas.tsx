import { useEffect, useState } from "react";
import { GestionFechas } from "../../../components/fechas/GestionFechas";
import { Select } from "../../../components/forms/Select";
import { Loading } from "../../../components/loads/Loading";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { NoRegistros } from "../../../components/NoRegistros";
import { Pagination } from "../../../components/Pagination";
import { SearchWrap } from "../../../components/search/SearchWrap";
import { paginate } from "../../../resources/fetch";
import { fechaInicioFin } from "../../../resources/func/fechas";
import { VENTAS_PAGINATE, VENTAS_SEARCH } from "../../../resources/routes";
import { ModalAnularVenta } from "./ventas/modals/ModalAnularVenta";
import { ModalConvertirComp } from "./ventas/modals/modalConvertirComp/ModalConvertirComp";
import { ModalCredito } from "./ventas/modals/modalCreditos/ModalCredito";
// import { ModalHabilitarVenta } from "./ventas/modals/ModalHabilitarVenta";
import { ModalReimpVenta } from "./ventas/modals/ModalReimpVenta";
import { ModalVentaDetalles } from "./ventas/modals/ModalVentaDetalles";
import { TabbsFiltroDatos } from "./ventas/TabbsFiltroDatos";
import { VentaItems } from "./ventas/VentaItems";

interface infoGeneralVentas {
    idLocal:string; // el id local es obligatorio
    selectLocal?:Function;
    loadingLocal?:boolean;
    locales?:any;
}

export const InfoGeneralVentas = ({ idLocal, selectLocal, loadingLocal, locales }:infoGeneralVentas) => {

    const [ inidioDia, finDia ] = fechaInicioFin();
    const tiendas = !locales ? true : false;

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);
    // const [modalHabilitarVenta, setModalHabilitarVenta] = useState<boolean>(false);
    const [modalAnular, setModalAnular] = useState<boolean>(false);
    const [modalReimprimir, setModalReimprimir] = useState<boolean>(false);
    const [modalCredito, setModalCredito] = useState<boolean>(false);
    const [modalConvComprobante, setModalConvComprobante] = useState<boolean>(false);
    const [idVenta, setIdVenta] = useState<number>(0);
    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });
    const [data, setData] = useState<any>([]);
    const [toggle, setToggle] = useState<number>(1); // tabs para los filtros
    const [fechas, setFechas] = useState<any>({ 
        inicio: tiendas ? inidioDia : "_", 
        fin: tiendas ? finDia : "_"
    });
    
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

    
    // const handlerHabilitarVenta = (idVenta:number) => {
    //     setIdVenta(idVenta);
    //     setModalHabilitarVenta(true);
    // }


    const handlerAnular = (idVenta:number) => { 
        setIdVenta(idVenta);
        setModalAnular(true);
    }


    const handlerReimprimir = (idVenta:number) => { 
        setIdVenta(idVenta);
        setModalReimprimir(true);
    }

    
    const handlerCredito = (idVenta:number) => { 
        setIdVenta(idVenta);
        setModalCredito(true);
    }


    const handlerConvertirComp = (idVenta:number) => {
        setIdVenta(idVenta);
        setModalConvComprobante(true);
    }


    const getData = async (urlPage?:string, value?:string, idToggle?:number, payloadFechas?:any) => {
        const dates = payloadFechas ? payloadFechas : fechas;
        const toggle = idToggle ? idToggle : 1
        const value_filtro = value ? value : "_";
        
        setToggle(toggle);
        setLoadingData(true);

        const restoURL = `/${value_filtro}/${idLocal}/${dates.inicio}/${dates.fin}`;

        try {
            let data:any;
            if (urlPage && urlPage !== "") {
                data = await paginate(urlPage);
            } else {
                data = await paginate(VENTAS_PAGINATE + restoURL);
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
                        url={VENTAS_SEARCH}
                        placeholder="Codigo de venta, cliente o nro de doc."
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
                                !tiendas
                                && (
                                    <Select
                                        loading={loadingLocal}
                                        name={"id_local"}
                                        onChange={(e:any) => selectLocal && selectLocal(e.target.value)}
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

                <TabbsFiltroDatos 
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
                                        <th></th>
                                        <th>Tipo venta</th>
                                        <th>Ingreso venta</th>
                                        <th>Forma pago</th>
                                        <th>Estado de venta</th>
                                        <th>Fecha venta</th>
                                        <th>Local</th>
                                        <th className="transparent inlineblock">...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((e:any) => {
                                            return (
                                                <VentaItems
                                                    key={e.id}
                                                    ventas={e}
                                                    // updateData={handlerHabilitarVenta}
                                                    handlerVer={handlerVer}
                                                    handlerAnular={handlerAnular}
                                                    handlerReimprimir={handlerReimprimir}
                                                    handlerCredito={handlerCredito}
                                                    handlerConvertirComp={handlerConvertirComp}
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
                <ModalVentaDetalles
                    modal={modalVer}
                    setModal={setModalVer}
                    idVenta={idVenta}
                />
            </ModalWrap>

            <ModalWrap modal={modalAnular}>
                <ModalAnularVenta
                    modal={modalAnular}
                    setModal={setModalAnular}
                    idVenta={idVenta}
                    getData={getData}
                />
            </ModalWrap>

            <ModalWrap modal={modalReimprimir}>
                <ModalReimpVenta
                    modal={modalReimprimir}
                    setModal={setModalReimprimir}
                    idVenta={idVenta}
                />
            </ModalWrap>

            <ModalWrap modal={modalCredito}>
                <ModalCredito
                    modal={modalCredito}
                    setModal={setModalCredito}
                    idVenta={idVenta}
                    getData={getData}
                    localId={idLocal}
                />
            </ModalWrap>

            <ModalWrap modal={modalConvComprobante}>
                <ModalConvertirComp
                    modal={modalConvComprobante}
                    setModal={setModalConvComprobante}
                    idVenta={idVenta}
                    getData={getData}
                />
            </ModalWrap>

            {/* <ModalHabilitarVenta
                modal={modalHabilitarVenta}
                setModal={setModalHabilitarVenta}
                idVenta={idVenta}
                getData={getData}
            /> */}

        </>
    )
}
