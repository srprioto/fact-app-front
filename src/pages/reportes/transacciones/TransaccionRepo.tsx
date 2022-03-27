import { useEffect, useRef, useState } from "react"
import { BiAlarmExclamation, BiAlarmSnooze, BiCheck, BiTransfer } from "react-icons/bi"
import { Loading } from "../../../components/Loading"
import { NoRegistros } from "../../../components/NoRegistros"
import { Pagination } from "../../../components/Pagination"
import { Search } from "../../../components/Search"
import { TitleBox } from "../../../components/TitleBox"
import { get, getOne, paginate } from "../../../resources/fetch"
import { TRANSACCIONES, TRANSACCIONES_SEARCH } from "../../../resources/routes"
import { CardsDatosTransf } from "./part/CardsDatosTransf"
import { Transaccion } from "./part/Transaccion"


export const TransaccionRepo = () => {

    const [loadingData, setLoadingData] = useState<boolean>(false); // carga de array de datos
    const [loadingOne, setLoadingOne] = useState<boolean>(false); // carga de un solo dato

    const [modalEliminar, setModalEliminar] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);

    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });

    const [data, setData] = useState<any>([]); // array de datos
    const [transacciones, setTransacciones] = useState<any>({}); // un solo dato
    const [resumenTransf, setResumenTransf] = useState<any>() // resumen para cards

    const [infoTransaccion, setInfoTransaccion] = useState<any>({}); // para eliminar

    const [toggle, setToggle] = useState<number>(1); // tabs para los filtros

    // *** search
    const [searchState, setSearchState] = useState<boolean>(false);
    const [searchTxt, setSearchTxt] = useState<string>("");
    const searchFocus = useRef<any>(null)

    
    const searchData = async () => { 
        if (searchTxt === "" || searchTxt === undefined || searchTxt === null || searchTxt.length === 0) {
            searchFocus.current.focus();
        } else {
            setLoadingData(true);
            setSearchState(true);
            try {
                const data = await get(TRANSACCIONES_SEARCH + searchTxt);
                setLoadingData(false);
                setData(data);
            } catch (error) {
                setLoadingData(true);
                console.log(error);
            }
        }
    }

    const handlerStateSearch = () => {
        setSearchTxt("");
        setSearchState(false);
        getData();
    }

    const onChangeSearch = (e:any) => { 
        setSearchTxt(e.target.value);
    }

    // *** end search


    useEffect(() => {
        getData();
    }, []);
    

    // const handlerDeleted = (id:number, descripcion?:string) => {
    //     setInfoTransaccion({ id, descripcion });
    //     setModalEliminar(!modalEliminar);
    // }

    // const handlerVer = (id:number) => { 
    //     getOneData(id);
    //     setModalVer(!modalVer);
    // }


    const getOneData = async (id:number) => { 
        setLoadingOne(true);
        try {
            const response_productos = await getOne(id, TRANSACCIONES); 
            setTransacciones(response_productos);        
            setLoadingOne(false);            
        } catch (error) {
            setLoadingOne(true);
            console.log(error);
        }
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
                data = await paginate(TRANSACCIONES + `/${value_filtro}/filtro`);

            const resumen = await get(TRANSACCIONES + "/resumen-transacciones");

            setData(data.items);            
            setResumenTransf(resumen);
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

            <CardsDatosTransf resumen={resumenTransf} loading={loadingData}/>

            <div className="box">

                <div className="grid-2 gap">
                    
                    <Search
                        searchTxt={searchTxt}
                        searchData={searchData}
                        searchState={searchState}
                        onChangeSearch={onChangeSearch}
                        handlerStateSearch={handlerStateSearch}
                        searchFocus={searchFocus}
                        placeholder="Descripcion ..."
                    />
                    
                    <div className="grid-4 gap">

                        {/* <Link to="/clientes/nuevo" className="btn btn-info" >
                            <BiPlusCircle />
                            Nuevo cliente
                        </Link> */}

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
                                                    // handlerDeleted={handlerDeleted}
                                                    // handlerVer={handlerVer}
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
            />

            <ModalVer
                data={cliente}
                modal={modalVer}
                setModal={setModalVer}
                loading={loadingOne}
            /> */}

        </div>
    )
}
