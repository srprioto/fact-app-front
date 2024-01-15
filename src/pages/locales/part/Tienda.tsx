import { useEffect, useState } from 'react';
import { BiCartAlt, BiChevronDown, BiChevronUp, BiDownload, BiInfoCircle, BiTransfer } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { Loading } from '../../../components/loads/Loading';
import { Pagination } from '../../../components/paginacion/Pagination';
import { TitleBox } from '../../../components/TitleBox';
import { ModalCantidad } from './ModalCantidad';
import { ProductoLocal } from './ProductoLocal';

import { LocalStockModalDto } from '../../../resources/dtos/LocalStockDto';
import { API_URL, paginate } from '../../../resources/fetch';
import { LOCAL_STOCK, LOCAL_STOCK_SEARCH, LOCAL_STOCK_SOLO } from '../../../resources/routes';
import { ModalTransferencia } from '../../../components/transferencia/enviar/EnviarTransferencia';
import { AlertaTransferencia } from '../../../components/transferencia/recibir/AlertaTransferencia';
import { NoRegistros } from '../../../components/NoRegistros';
import { ModalWrap } from '../../../components/modals/ModalWrap';
import { SearchWrap } from '../../../components/search/SearchWrap';
import { ToolTip } from '../../../components/tooltip/ToolTip';
import { ModalDescExcel } from '../../../components/modals/ModalDescExcel';
import { ModalInfoStock, WrapModalInfoStock } from '../../../components/modals/ModalInfoStock';

interface tienda{
    idLocal:string;
    nombreLocal:string;
    user?:boolean;
}

export const Tienda = ({ idLocal, nombreLocal, user }:tienda) => {

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

    // const searchFocus = useRef<any>(null)
    // const [searchTxt, setSearchTxt] = useState<string>("");

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
    //             // const data = await get(LOCAL_STOCK_SEARCH + idLocal + "/" + searchTxt);
    //             const data = await post({value: searchTxt}, LOCAL_STOCK_SEARCH + idLocal);
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
                data = await paginate(LOCAL_STOCK_SOLO + idLocal + `/${ordenCantidad}`);
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
            
            {
                user
                ? <TitleBox titulo={`Stock de la tienda`}/>
                : <TitleBox titulo={`Stock de la tienda - ${nombreLocal}`} link="/tiendas"/>
            }
            

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
                        localId={idLocal}
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
                            </button>

                            {
                                user
                                ? <div></div>
                                : (
                                    <Link 
                                        id="btn-ir-vender"
                                        to={`/tiendas/vender/${idLocal}/${nombreLocal}`} 
                                        className="btn btn-success"
                                    >
                                        <BiCartAlt />
                                    </Link>
                                )
                            }
                            
                            <div></div>
                        </div>

                        <div className="grid-4 gap">
                            <div></div>
                            <button 
                                id="btn-transferencias"
                                className="btn btn-info" 
                                onClick={handlerTransaccion}
                            ><BiTransfer /></button>
                            <AlertaTransferencia idLocal={Number(idLocal)} actualizarDatos={getData} />
                            <WrapModalInfoStock idLocal={idLocal} />
                        </div>

                    </div>                    
                </div>

                <ToolTip
                    anchor="btn-ir-vender"
                    descripcion="Módulo de creación de ventas"
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

            <ModalWrap modal={modalTransferencia}>
                <ModalTransferencia
                    modal={modalTransferencia}
                    setModal={setModalTransferencia}
                    idLocal={Number(idLocal)}
                    nombreLocal={nombreLocal}
                    getData={getData}
                />
            </ModalWrap>

            <ModalWrap modal={modalDescargarExcel}>
                <ModalDescExcel
                    modal={modalDescargarExcel}
                    setModal={setModalDescargarExcel}
                    linkDescarga={API_URL + LOCAL_STOCK + '/descargar/excel/' + idLocal}
                    nombreArchivo="stock productos.xlsx"
                />
            </ModalWrap> 

        </div>
    )
}
