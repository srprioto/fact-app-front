import { useEffect, useState } from 'react';
import { BiCartAlt, BiTransfer } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import { Loading } from '../../../components/loads/Loading';
import { Pagination } from '../../../components/Pagination';
import { TitleBox } from '../../../components/TitleBox';
import { ModalCantidad } from './ModalCantidad';
import { ProductoLocal } from './ProductoLocal';

import { LocalStockModalDto } from '../../../resources/dtos/LocalStockDto';
import { paginate } from '../../../resources/fetch';
import { LOCAL_STOCK_SEARCH, LOCAL_STOCK_SOLO } from '../../../resources/routes';
import { ModalTransferencia } from '../../../components/transferencia/enviar/EnviarTransferencia';
import { AlertaTransferencia } from '../../../components/transferencia/recibir/AlertaTransferencia';
import { NoRegistros } from '../../../components/NoRegistros';
import { ModalWrap } from '../../../components/modals/ModalWrap';
import { SearchWrap } from '../../../components/search/SearchWrap';

interface tienda{
    idLocal:string;
    nombreLocal:string;
    user?:boolean;
}

export const Tienda = ({ idLocal, nombreLocal, user }:tienda) => {

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [modalCant, setModalCant] = useState<boolean>(false);
    const [modalTransferencia, setModalTransferencia] = useState<boolean>(false);
    
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
    }, []);

    
    const handlerTransaccion = () => setModalTransferencia(!modalTransferencia)

    const handlerCantidad = (id:number, cantidad:number, nombreProducto:string) => { 
        setModalCant(!modalCant)
        setLocalStock({ id, cantidad, nombreProducto });
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
                data = await paginate(LOCAL_STOCK_SOLO + idLocal);
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
                            {
                                user
                                ? <div></div>
                                : (
                                    <Link 
                                        to={`/tiendas/vender/${idLocal}/${nombreLocal}`} 
                                        className="btn btn-success"
                                    >
                                        <BiCartAlt />
                                    </Link>
                                )
                            }
                            <div></div>
                            <div></div>
                        </div>

                        <div className="grid-3 gap">
                            <div></div>
                            <button className="btn btn-info" onClick={handlerTransaccion}>
                                <BiTransfer />
                            </button>
                            <AlertaTransferencia idLocal={Number(idLocal)} actualizarDatos={getData} />
                        </div>

                    </div>                    
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
                                        <th>Cantidad</th>
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

            <ModalCantidad 
                modal={modalCant}
                setModal={setModalCant}
                localStock={localStock}
                getData={getData}
                setSearchState={setSearchState}
            />

            <ModalWrap modal={modalTransferencia}>
                <ModalTransferencia
                    modal={modalTransferencia}
                    setModal={setModalTransferencia}
                    idLocal={Number(idLocal)}
                    nombreLocal={nombreLocal}
                    getData={getData}
                />
            </ModalWrap>


        </div>
    )
}
