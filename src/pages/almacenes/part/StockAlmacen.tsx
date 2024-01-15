import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp, BiDownload, BiPlusCircle, BiTransfer } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../../components/loads/Loading";
import { NoRegistros } from "../../../components/NoRegistros";
import { Pagination } from "../../../components/paginacion/Pagination";
import { TitleBox } from "../../../components/TitleBox";
import { AlertaTransferencia } from "../../../components/transferencia/recibir/AlertaTransferencia";
import { ModalTransferencia } from "../../../components/transferencia/enviar/EnviarTransferencia";
import { LocalStockModalDto } from "../../../resources/dtos/LocalStockDto";
import { API_URL, paginate } from "../../../resources/fetch";
import { LOCAL_STOCK, LOCAL_STOCK_SEARCH, LOCAL_STOCK_SOLO } from "../../../resources/routes";
import { ModalCantidad } from "../../locales/part/ModalCantidad";
import { ProductoLocal } from "../../locales/part/ProductoLocal";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { SearchWrap } from "../../../components/search/SearchWrap";
import { ToolTip } from "../../../components/tooltip/ToolTip";
import { ModalDescExcel } from "../../../components/modals/ModalDescExcel";
import { WrapModalInfoStock } from "../../../components/modals/ModalInfoStock";

export const StockAlmacen = () => {

    const params = useParams(); // params.id, params.nombre
    
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [modalCant, setModalCant] = useState<boolean>(false);
    const [modalTransferencia, setModalTransferencia] = useState<boolean>(false);
    const [modalDescargarExcel, setModalDescargarExcel] = useState<boolean>(false);
    const [ordenCantidad, setOrdenCantidad] = useState<string>("DESC");
    
    const [searchState, setSearchState] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });
    const [localStock, setLocalStock] = useState<LocalStockModalDto>({
        id:0,
        cantidad:0,
        nombreProducto:""
    });

    useEffect(() => {
        getData();        
    }, [ordenCantidad]);
    
    const handlerTransaccion = () => setModalTransferencia(!modalTransferencia)

    const handlerCantidad = (id:number, cantidad:number, nombreProducto:string) => { 
        setModalCant(!modalCant)
        setLocalStock({ id, cantidad, nombreProducto });
    }

    const handlerModalDescargarExcel = () => { 
        setModalDescargarExcel(true);
    }

    const handlerOrdenCantidad = () => { 
        if (ordenCantidad === "DESC") {
            setOrdenCantidad("ASC");
        } else {
            setOrdenCantidad("DESC")
        }
    }

    // const [searchTxt, setSearchTxt] = useState<string>("");
    // const searchFocus = useRef<any>(null);

    // const onChangeSearch = (e:any) => setSearchTxt(e.target.value);

    // const handlerStateSearch = () => {
    //     setSearchTxt("");
    //     setSearchState(false);
    //     getData();
    // }

    // const searchData = async () => { 
    //     if (searchTxt === "" || searchTxt === undefined || searchTxt === null || searchTxt.length === 0) {
    //         searchFocus.current.focus();
    //     } else {
    //         setLoadingData(true);
    //         setSearchState(true);
    //         try {
    //             const data = await post({value: searchTxt}, LOCAL_STOCK_SEARCH + params.id);
    //             setLoadingData(false);
    //             setData(data);
    //         } catch (error) {
    //             setLoadingData(true);
    //             console.log(error);
    //         }
    //     }
    // }


    const getData = async (urlPage?:string) => {
        setLoadingData(true);
        try {
            let data:any;
            if (urlPage) {
                data = await paginate(urlPage);
            }else{
                data = await paginate(LOCAL_STOCK_SOLO + params.id + `/${ordenCantidad}`);
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
        <div className="local-stock">
            
            <TitleBox titulo={`Stock del almacen - ${params.nombre}`} link="/almacenes"/>

            <div className="box">

                <div className="grid-2 gap">

                    <SearchWrap 
                        setLoadingData={setLoadingData}
                        setData={setData}
                        getData={getData}
                        searchState={searchState}
                        setSearchState={setSearchState}
                        url={LOCAL_STOCK_SEARCH}
                        placeholder="Codigo o nombre del producto ..."
                        localId={params.id}
                    />

                    {/* <Search
                        searchTxt={searchTxt}
                        searchData={searchData}
                        searchState={searchState}
                        onChangeSearch={onChangeSearch}
                        handlerStateSearch={handlerStateSearch}
                        searchFocus={searchFocus}
                        placeholder="Codigo o nombre del producto ..."
                    /> */}

                    <div className="grid-2 gap">

                        <div className="grid-3 gap">

                            <button 
                                id="btn-desc-excel"
                                className="btn btn-primary" 
                                onClick={() => handlerModalDescargarExcel()}
                                // onClick={() => {window.location.href = `https://www.youtube.com/`;}}
                            >
                                <BiDownload />
                                {/* <ToolTip
                                    anchor="btn-desc-excel"
                                    descripcion="
                                        Descarga un documento Excel con la lista de registros.<br/>
                                        Requiere establecer un rango de fechas para la descarga, de lo contrario, solo se descargará los registros comprendidos el mes pasado.
                                    "
                                />  */}
                            </button>

                        </div>

                        <div className="grid-4 gap">
                            <Link id="btn-reabastecer" to="/ingreso-productos" className="btn btn-info">
                                <BiPlusCircle/>
                            </Link>
                            <button 
                                id="btn-transferencias"
                                className="btn btn-info"
                                onClick={handlerTransaccion}>
                                <BiTransfer />
                            </button>
                            <AlertaTransferencia idLocal={Number(params.id)} actualizarDatos={getData} />
                            <WrapModalInfoStock idLocal={params.id} />
                        </div>

                    </div>                    
                </div>

                <ToolTip
                    anchor="btn-reabastecer"
                    descripcion="Módulo de reabastecimiento"
                /> 
                <ToolTip
                    anchor="btn-transferencias"
                    descripcion="Transferencia de productos"
                /> 

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
                                        <th 
                                            className="icon-center-table no-select pointer" 
                                            onClick={handlerOrdenCantidad}
                                        >
                                            Cantidad
                                            { ordenCantidad === "ASC" ? <BiChevronUp /> : <BiChevronDown /> }
                                        </th>
                                        <th>Codigo</th>
                                        <th>Nombre</th>
                                        <th>Marca</th>
                                        <th>Talla</th>
                                        <th>Color</th>
                                        <th className="transparent inlineblock">...</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {
                                        data.map((e:any) => {
                                            return (
                                                <ProductoLocal
                                                    key={e.id} 
                                                    elemento={e} 
                                                    // handlerDeleted={handlerDeleted}
                                                    // handlerMostrar={handlerMostrar}
                                                    handlerCantidad={handlerCantidad}
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
                    searchState={searchState} 
                    getData={getData} 
                    previous={pagination.links.previous} 
                    currentPage={pagination.meta.currentPage} 
                    next={pagination.links.next} 
                />

            </div>

            {/* <ModalEliminar 
                modal={ modal } 
                setModal={ setModal } 
                id={infoProducto.id} 
                nombre={infoProducto.nombre}
                url={PRODUCTOS} 
                getData={getData}
                setSearchState={setSearchState}
            /> */}

            {/* <ModalMostrar 
                modal={ modalMostrar }
                setModal={ setModalMostrar }
                producto={ producto }
                getData={ getData }
                getOneData={ getOneData }
                loading={ loadingSolo }
                setSearchState={setSearchState}
            /> */}

            <ModalWrap modal={modalCant} >
                <ModalCantidad
                    modal={modalCant}
                    setModal={setModalCant}
                    localStock={localStock}
                    getData={getData}
                    setSearchState={setSearchState}
                />
            </ModalWrap>

            <ModalWrap modal={modalTransferencia} >
                <ModalTransferencia
                    modal={modalTransferencia}
                    setModal={setModalTransferencia}
                    idLocal={Number(params.id)}
                    nombreLocal={params.nombre}
                    getData={getData}
                />
            </ModalWrap>

            <ModalWrap modal={modalDescargarExcel}>
                <ModalDescExcel
                    modal={modalDescargarExcel}
                    setModal={setModalDescargarExcel}
                    linkDescarga={API_URL + LOCAL_STOCK + '/descargar/excel/' + params.id}
                    nombreArchivo="stock productos.xlsx"
                />
            </ModalWrap> 


        </div>
    )
}
