import { useEffect, useState } from "react";
import { Loading } from "../../../components/loads/Loading";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { NoRegistros } from "../../../components/NoRegistros";
import { Pagination } from "../../../components/Pagination";
import { SearchWrap } from "../../../components/SearchWrap";
import { paginate } from "../../../resources/fetch";
import { VENTAS_PAGINATE, VENTAS_SEARCH } from "../../../resources/routes";
import { ExportarExcel } from "./InfoGeneral/ExportarExcel";
import { ModalVentaDetalles } from "./InfoGeneral/ModalVentaDetalles";
import { TabbsFiltroDatos } from "./InfoGeneral/TabbsFiltroDatos";
import { VentaItems } from "./InfoGeneral/VentaItems";

export const InfoGeneralVentas = () => {

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);
    const [idVenta, setIdVenta] = useState<number>(0);
    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });
    const [data, setData] = useState<any>([]);
    const [toggle, setToggle] = useState<number>(1); // tabs para los filtros
    
    // *** search
    const [searchState, setSearchState] = useState<boolean>(false); // estado de busqueda
    // *** end search


    useEffect(() => {
        getData();
    }, []);
    

    const handlerVer = (id:number) => { 
        setIdVenta(id);
        setModalVer(!modalVer);        
    }


    const getData = async (urlPage?:string, value?:string, idToggle?:number) => {

        const toggle = idToggle ? idToggle : 1
        const value_filtro = value ? value : "_";

        setToggle(toggle);
        setLoadingData(true);

        try {

            let data:any;

            if (urlPage && urlPage !== "") 
                data = await paginate(urlPage);
            else 
                data = await paginate(VENTAS_PAGINATE + `/${value_filtro}/filtro`);

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
                        placeholder="Nombre del cliente ..."
                    />
                    <div className="grid-6 gap">
                        <ExportarExcel />                        
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
                                        <th>Nombre cliente</th>
                                        {/* <th>Productos vendidos</th> */}
                                        <th>Costo total</th>
                                        <th>Estado de venta</th>
                                        <th>Local</th>
                                        <th>Observaciones</th>
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
                                                    // handlerDeleted={handlerDeleted}
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
                <ModalVentaDetalles
                    modal={modalVer}
                    setModal={setModalVer}
                    idVenta={idVenta}
                />
            </ModalWrap>
        </>
    )
}
