import { useEffect, useState } from "react";
import { Loading } from "../../../components/loads/Loading";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { NoRegistros } from "../../../components/NoRegistros";
import { Pagination } from "../../../components/Pagination";
import { SearchWrap } from "../../../components/SearchWrap";
import { TitleBox } from "../../../components/TitleBox";
import { paginate } from "../../../resources/fetch";
import { MOVIMIENTOS, MOVIMIENTOS_SEARCH } from "../../../resources/routes";
import { IngresosItem } from "./part/IngresosItem";
import { ModalVerIngreso } from "./part/ModalVerIngreso";

export const IngresoProdRepo = () => {

    const [loadingData, setLoadingData] = useState<boolean>(false);

    // const [modalEliminar, setModalEliminar] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);
    const [idIngreso, setIdIngreso] = useState<number>(0);

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
        setIdIngreso(id);
        setModalVer(!modalVer);
        // console.log("**********");
        
    }

    const getData = async (urlPage?:string) => {
        setLoadingData(true);
        try {
            let data:any;
            if (urlPage) {
                data = await paginate(urlPage);
            }else{
                data = await paginate(MOVIMIENTOS);
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
        <div className="ingreso-prod-repo">
            
            <TitleBox titulo="Reporte de ingreso de productos"/>

            <div className="box">

                <div className="grid-211 gap">
                    
                    <SearchWrap 
                        setLoadingData={setLoadingData}
                        setData={setData}
                        getData={getData}
                        searchState={searchState}
                        setSearchState={setSearchState}
                        url={MOVIMIENTOS_SEARCH}
                        placeholder="Codigo de ingreso o local destino ..."
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
                                        <th>Codigo Ingreso</th>
                                        <th>Productos</th>
                                        <th>Local destino</th>
                                        <th>Observaciones</th>
                                        <th className="transparent inlineblock">...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((e:any) => {
                                            return (
                                                <IngresosItem
                                                    key={e.id}
                                                    ingreso={e}
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
                <ModalVerIngreso
                    modal={modalVer}
                    setModal={setModalVer}
                    idIngreso={idIngreso}
                />
            </ModalWrap>

        </div>
    )
}
