import { useEffect, useState } from "react";
import { Loading } from "../../../components/loads/Loading";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { NoRegistros } from "../../../components/NoRegistros";
import { Pagination } from "../../../components/Pagination"
import { SearchWrap } from "../../../components/SearchWrap"
import { TitleBox } from "../../../components/TitleBox"
import { paginate } from "../../../resources/fetch";
import { VENTAS, VENTAS_PAGINATE, VENTAS_SEARCH } from "../../../resources/routes";
import { ModalVentaDetalles } from "./part/ModalVentaDetalles";
import { VentaItems } from "./part/VentaItems";

export const VentasRepo = () => {

    const [loadingData, setLoadingData] = useState<boolean>(false);

    // const [modalEliminar, setModalEliminar] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);
    const [idVenta, setIdVenta] = useState<number>(0);

    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });

    const [data, setData] = useState<any>([]);

    // *** search
    const [searchState, setSearchState] = useState<boolean>(false); // estado de busqueda
    // *** end search


    useEffect(() => {
        getData();
    }, []);
    

    // const handlerDeleted = (id:number, nombre?:string) => {
    //     setInfoCliente({ id, nombre });
    //     setModalEliminar(!modalEliminar);
    // }

    const handlerVer = (id:number) => { 
        // getOneData(id);
        setIdVenta(id);
        setModalVer(!modalVer);        
    }

    const getData = async (urlPage?:string) => {
        setLoadingData(true);
        try {
            let data:any;
            if (urlPage) {
                data = await paginate(urlPage);
            }else{
                data = await paginate(VENTAS_PAGINATE);
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
    }

    return (
        <div className="ventas-repo">
            
            <TitleBox titulo="Reporte de ventas"/>

            <div className="box">

                <div className="grid-211 gap">
                    
                    <SearchWrap 
                        setLoadingData={setLoadingData}
                        setData={setData}
                        getData={getData}
                        searchState={searchState}
                        setSearchState={setSearchState}
                        url={VENTAS_SEARCH}
                        placeholder="Nombre del cliente ..."
                    />
                    
                    <div></div>
                    {/* <Link to="/clientes/nuevo" className="btn btn-info" >
                        <BiPlusCircle />
                        Nuevo cliente
                    </Link> */}
                    
                </div>

            </div>

            <div className="box">
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

            {/* <ModalEliminar 
                modal={ modalEliminar } 
                setModal={ setModalEliminar } 
                id={infoCliente.id}
                nombre={infoCliente.nombre}
                url={CLIENTES} 
                getData={getData}
                setSearchState={setSearchState}
            /> */}

            <ModalWrap modal={modalVer}>
                <ModalVentaDetalles
                    modal={modalVer}
                    setModal={setModalVer}
                    idVenta={idVenta}
                />
            </ModalWrap>

        </div>
    )
}
