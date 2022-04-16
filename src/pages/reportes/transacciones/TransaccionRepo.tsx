import { useEffect, useState } from "react"
import { BiAlarmExclamation, BiAlarmSnooze, BiCheck, BiTransfer } from "react-icons/bi"
import { Loading } from "../../../components/loads/Loading"
import { ModalWrap } from "../../../components/modals/ModalWrap"
import { NoRegistros } from "../../../components/NoRegistros"
import { Pagination } from "../../../components/Pagination"
import { SearchWrap } from "../../../components/SearchWrap"
import { TitleBox } from "../../../components/TitleBox"
import { paginate } from "../../../resources/fetch"
import { TRANSACCIONES, TRANSACCIONES_SEARCH } from "../../../resources/routes"
import { CardsDatosTransf } from "./part/CardsDatosTransf"
import { ModalVerTransac } from "./part/ModalVerTransac"
import { Transaccion } from "./part/Transaccion"


export const TransaccionRepo = () => {

    const [loadingData, setLoadingData] = useState<boolean>(false); // carga de array de datos    
    const [modalVer, setModalVer] = useState<boolean>(false);
    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });
    const [data, setData] = useState<any>([]); // array de datos
    const [idTransaccion, setIdTransaccion] = useState<any>({});
    const [toggle, setToggle] = useState<number>(1); // tabs para los filtros

    // *** search
    const [searchState, setSearchState] = useState<boolean>(false);



    useEffect(() => {
        getData();
    }, []);


    const handlerVer = (idTransac:number) => { 
        setIdTransaccion(idTransac);
        setModalVer(!modalVer);
    }
    

    const getData = async (urlPage?:string, value?:string, idToggle?:number) => {

        const toggle = idToggle ? idToggle : 1
        const value_filtro = value ? value : "_";

        setToggle(toggle);
        setLoadingData(true);

        try {

            let data:any;

            if (urlPage && urlPage !== "") {
                data = await paginate(urlPage);
            }
            else {
                data = await paginate(TRANSACCIONES + `/${value_filtro}/filtro`);
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
        <div className="index-transac">
            <TitleBox titulo="Reporte de transferencias"/>

            <CardsDatosTransf/>

            <div className="box">

                <div className="grid-2 gap">

                    <SearchWrap 
                        setLoadingData={setLoadingData}
                        setData={setData}
                        getData={getData}
                        searchState={searchState}
                        setSearchState={setSearchState}
                        url={TRANSACCIONES_SEARCH}
                        placeholder="Descripcion ..."
                    />
                    
                    <div className="grid-4 gap">

                    </div>

                    
                </div>

            </div>

            <div className="box">

                <div className="grid-3 gap mb-25">

                    <div></div>
                    <div className="grid-4 gap">

                        <button 
                            onClick={() => getData("", "_", 1)}
                            className={`btn2 btn2-primary ${toggle === 1 && "btn2-sub-primary"}`}>
                            <BiTransfer />Todos
                        </button>
                        <button 
                            onClick={() => getData("", "enviado", 2)}
                            className={`btn2 btn2-warning ${toggle === 2 && "btn2-sub-warning"}`}>
                            <BiAlarmSnooze />Enviados
                        </button>
                        <button 
                            onClick={() => getData("", "observado", 3)}
                            className={`btn2 btn2-danger ${toggle === 3 && "btn2-sub-danger"}`}>
                            <BiAlarmExclamation />Observ.
                        </button>
                        <button 
                            onClick={() => getData("", "listo", 4)}
                            className={`btn2 btn2-success ${toggle === 4 && "btn2-sub-success"}`}>
                            <BiCheck />Listos
                        </button>
                        
                    </div>
                    <div></div>

                </div>

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
                                        <th>Codigo envio</th>
                                        <th>Descripcion</th>
                                        <th>Local destino</th>
                                        <th>Estado de envio</th>
                                        <th>Fecha de envio</th>
                                        <th className="transparent inlineblock">...</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {
                                        data.map((e:any) => {
                                            return (
                                                <Transaccion
                                                    key={e.id}
                                                    elemento={e}
                                                    handlerVer={handlerVer}
                                                    // handlerDeleted={handlerDeleted}
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
                <ModalVerTransac
                    modal={modalVer}
                    setModal={setModalVer}
                    idTransaccion={idTransaccion}
                />    
            </ModalWrap>


        </div>
    )
}
