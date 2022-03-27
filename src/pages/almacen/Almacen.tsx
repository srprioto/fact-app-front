import { useEffect, useRef, useState } from "react";
import { BiPlusCircle, BiTransfer } from "react-icons/bi";
import { Link } from "react-router-dom";

// import { ModalEliminar } from "../../components/ModalEliminar";
// import { ModalMostrar } from "./part/ModalMostrar";
import { ModalCantidad } from "./part/ModalCantidad";
import { ProductoStock } from "./part/ProductoStock";
import { Loading } from "../../components/Loading";
import { TitleBox } from "../../components/TitleBox";
import { Search } from "../../components/Search";


// import { EditarProductosDto, ProductosDto } from "../../resources/dtos/ProductosDto";
import { LocalStockModalDto } from "../../resources/dtos/LocalStockDto";

import { ALMACEN, ALMACEN_SEARCH, PRODUCTOS, PRODUCTOS_SEARCH } from "../../resources/routes";
import { get, getOne, paginate } from "../../resources/fetch";
import { Pagination } from "../../components/Pagination";
import { ModalTransferencia } from "../../components/transferencia/EnviarTransferencia";
import { AlertaTransferencia } from "../../components/transferencia/AlertaTransferencia";
import { NoRegistros } from "../../components/NoRegistros";


export const Almacen = () => {

    const [loading, setLoading] = useState<boolean>(false); // carga todos los datos - getData
    // const [loadingSolo, setLoadingSolo] = useState<boolean>(false); // carga solo un dato - getOneData

    // const [modal, setModal] = useState<boolean>(false); // modal eliminar
    const [modalTransferencia, setModalTransferencia] = useState<boolean>(false); // modal transferencia
    const [modalCant, setModalCant] = useState<boolean>(false);

    const [localStock, setLocalStock] = useState<LocalStockModalDto>({
        id:0,
        cantidad:0,
        nombreProducto:""
    });
    
    const [searchTxt, setSearchTxt] = useState<string>("");
    const [searchState, setSearchState] = useState<boolean>(false);
    // const [infoProducto, setInfoProducto] = useState<any>({});
    const [data, setData] = useState<any>([]);
    const [pagination, setPagination] = useState<any>({
        meta: {},
        links: {}
    });
    // const [producto, setProducto] = useState<EditarProductosDto>({
    //     codigo:"",
    //     color:"",
    //     descripcion:"",
    //     marca:"",
    //     nombre:"",
    //     precio_compra:0,
    //     precio_venta_1:0,
    //     precio_venta_2:0,
    //     precio_venta_3:0,
    //     talla:"",
    //     created_at:"",
    //     updated_at:""
    // });
    const searchFocus = useRef<any>(null);


    useEffect(() => {
        getData();
    }, []);

    const handlerTransaccion = () => setModalTransferencia(!modalTransferencia) // modaltransacciones
    const onChangeSearch = (e:any) => setSearchTxt(e.target.value) // manela el estado del search

    // const handlerDeleted = (id:number, nombre:string) => {
    //     setInfoProducto({ id, nombre });
    //     setModal(!modal);
    // }

    // const handlerMostrar = (id:number) => { 
    //     getOneData(id);
    //     setModalMostrar(!modalMostrar);
    // }

    const handlerCantidad = (id:number, cantidad:number, nombreProducto:string) => { 
        setModalCant(!modalCant)
        setLocalStock({ id, cantidad, nombreProducto });
    }

    const handlerStateSearch = () => {
        setSearchTxt("");
        setSearchState(false);
        getData();
    }


    const searchData = async () => { 
        if (searchTxt === "" || searchTxt === undefined || searchTxt === null || searchTxt.length === 0) {
            searchFocus.current.focus();
        } else {
            setLoading(true);
            setSearchState(true);
            try {
                const data = await get(ALMACEN_SEARCH + searchTxt);
                setLoading(false);
                setData(data);
            } catch (error) {
                setLoading(true);
                console.log(error);
            }
        }
    }

    const getData = async (urlPage?:string) => {
        setLoading(true);
        try {
            let data:any;
            if (urlPage) {
                data = await paginate(urlPage);
            }else{
                data = await paginate(ALMACEN);
            }

            setData(data.items);
            setPagination({
                meta: data.meta,
                links: data.links
            });
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }
    
    // const getOneData = async (id:number) => { 
    //     setLoadingSolo(true);
    //     try {
    //         const response_productos = await getOne(id, PRODUCTOS);
    //         setProducto(response_productos);
    //         setLoadingSolo(false);
    //     } catch (error) {
    //         setLoadingSolo(true);
    //         console.log(error);
    //     }
    // }
    

    return (
        
        <div className="almacen">

            <TitleBox titulo="Almacen"/>

            <div className="box">

                <div className="grid-2 gap">

                    <Search
                        searchTxt={searchTxt}
                        searchData={searchData}
                        searchState={searchState}
                        onChangeSearch={onChangeSearch}
                        handlerStateSearch={handlerStateSearch}
                        searchFocus={searchFocus}
                        placeholder="Codigo o nombre del producto ..."
                    />

                    <div className="grid-2 gap">

                        <div className="grid-3 gap"></div>


                        <div className="grid-3 gap">
                            <Link to="/ingreso-productos" className="btn btn-info">
                                <BiPlusCircle/>
                            </Link>

                            <button className="btn btn-info" onClick={handlerTransaccion}>
                                <BiTransfer />
                            </button>

                            <AlertaTransferencia idLocal={1} actualizarDatos={getData} />
                            
                        </div>
                        
                    </div>

                    
                </div>

            </div>

            <div className="box">

                {
                    loading 
                    ? <Loading />
                    : (
                        data.length <= 0
                        ? <NoRegistros />
                        : (
                            <table className="table">
                            
                                <thead>
                                    <tr>
                                        <th>Codigo</th>
                                        <th>Nombre del producto</th>
                                        <th>Cantidad</th>
                                        <th>Detalles...</th>
                                        {/* <th>Precio Compra</th>
                                        <th>Precios Venta</th> */}
                                        <th className="transparent inlineblock">...</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {
                                        data.map((e:any) => {
                                            return (
                                                <ProductoStock 
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

            <ModalTransferencia
                modal={modalTransferencia}
                setModal={setModalTransferencia}
                idLocal={1}
                nombreLocal="Almacen"
                getData={getData}
            />


        </div>
        
    )
};
