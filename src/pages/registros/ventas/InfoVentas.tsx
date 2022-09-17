import { useEffect, useState } from "react";
import { GestionFechas } from "../../../components/fechas/GestionFechas";
import { Select } from "../../../components/forms/Select";
import { Loading } from "../../../components/loads/Loading";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { NoRegistros } from "../../../components/NoRegistros";
import { Pagination } from "../../../components/Pagination";
import { SearchWrap } from "../../../components/SearchWrap";
import { paginate } from "../../../resources/fetch";
import { VENTAS_PAGINATE, VENTAS_SEARCH } from "../../../resources/routes";
import { ModalAnularVenta } from "./ventas/ModalAnularVenta";
import { ModalHabilitarVenta } from "./ventas/ModalHabilitarVenta";
import { ModalReimpVenta } from "./ventas/ModalReimpVenta";
import { ModalVentaDetalles } from "./ventas/ModalVentaDetalles";
import { TabbsFiltroDatos } from "./ventas/TabbsFiltroDatos";
import { VentaItems } from "./ventas/VentaItems";


interface infoGeneralVentas {
    idLocal?:string; // el id local es obligatorio
    selectLocal?:Function;
    loadingLocal?:boolean;
    locales?:any;
}

export const InfoGeneralVentas = ({ idLocal, selectLocal, loadingLocal, locales }:infoGeneralVentas) => {

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);
    const [modalHabilitarVenta, setModalHabilitarVenta] = useState<boolean>(false);
    const [modalAnular, setModalAnular] = useState<boolean>(false);
    const [modalReimprimir, setModalReimprimir] = useState<boolean>(false);
    const [idVenta, setIdVenta] = useState<number>(0);
    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });
    const [data, setData] = useState<any>([]);
    const [toggle, setToggle] = useState<number>(1); // tabs para los filtros

    const [fechas, setFechas] = useState<any>({ inicio: "_", fin: "_" });
    
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


    const handlerAnular = (idVenta:number) => { 
        setIdVenta(idVenta);
        setModalAnular(true);
    }


    const handlerReimprimir = (idVenta:number) => { 
        setIdVenta(idVenta);
        setModalReimprimir(true);
    }


    const getData = async (urlPage?:string, value?:string, idToggle?:number, payloadFechas?:any) => {
        const dates = payloadFechas ? payloadFechas : fechas;
        const toggle = idToggle ? idToggle : 1
        const value_filtro = value ? value : "_";
        
        setToggle(toggle);
        setLoadingData(true);

        const restoURL = `/${value_filtro}/${idLocal}/${dates.inicio}/${dates.fin}/filtro`;

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
                        url={VENTAS_SEARCH}
                        placeholder="Codigo de venta"
                        localId={idLocal}
                    />
                    <div className="grid-2 gap">
                        
                        <div className="grid-4">
                            <div></div>
                            <div></div>
                            <div></div>
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
                                        <th>Tipo comp.</th>
                                        <th>Costo total</th>
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
                                                    updateData={handlerHabilitarVenta}
                                                    handlerVer={handlerVer}
                                                    handlerAnular={handlerAnular}
                                                    handlerReimprimir={handlerReimprimir}
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

            <ModalHabilitarVenta 
                modal={modalHabilitarVenta}
                setModal={setModalHabilitarVenta}
                idVenta={idVenta}
                getData={getData}
            />

        </>
    )
}
