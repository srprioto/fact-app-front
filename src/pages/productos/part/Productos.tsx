import { useEffect, useRef, useState } from "react";
import { BiPlusCircle } from "react-icons/bi"
import { Link } from "react-router-dom"

import { Loading } from "../../../components/loads/Loading";
import { ModalEliminar } from "../../../components/modals/ModalEliminar";
import { Pagination } from "../../../components/Pagination";
import { Search } from "../../../components/Search";
import { TitleBox } from "../../../components/TitleBox"
import { Producto } from "./Producto";

import { get, paginate } from "../../../resources/fetch";
import { PRODUCTOS, PRODUCTOS_SEARCH } from "../../../resources/routes";
import { NoRegistros } from "../../../components/NoRegistros";
import { ModalCodigoBarras } from "./ModalCodigoBarras";

export const Productos = () => {

    const [loadingData, setLoadingData] = useState<boolean>(false);
    // const [loadingOne, setLoadingOne] = useState<boolean>(false);

    const [modalEliminar, setModalEliminar] = useState<boolean>(false);
    const [modalBarcode, setModalBarcode] = useState<boolean>(false);
    // const [modalVer, setModalVer] = useState<boolean>(false);

    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });

    const [data, setData] = useState<any>([]);
    const [producto, setProducto] = useState<any>({
        // codigo:"",
        // color:"",
        // descripcion:"",
        // marca:"",
        // nombre:"",
        // precio_compra:0,
        // precio_venta_1:0,
        // precio_venta_2:0,
        // precio_venta_3:0,
        // talla:"",
        // created_at:"",
        // updated_at:""
    });

    const [infoProducto, setInfoProducto] = useState<any>({});

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
                const data = await get(PRODUCTOS_SEARCH + searchTxt);
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
    

    const handlerDeleted = (id:number, nombre?:string) => {
        setInfoProducto({ id, nombre });
        setModalEliminar(!modalEliminar);
    }

    // const handlerVer = (id:number) => { 
    //     getOneData(id);
    //     setModalVer(!modalVer);
    // }

    const handlerModalBarcode = (prod:any) => { 
        setProducto(prod);
        setModalBarcode(!modalBarcode)
    }


    // const getOneData = async (id:number) => { 
    //     setLoadingOne(true);
    //     try {
    //         const response_productos = await getOne(id, PRODUCTOS);
    //         setProducto(response_productos);        
    //         setLoadingOne(false);            
    //     } catch (error) {
    //         setLoadingOne(true);
    //         console.log(error);
    //     }
    // }

    const getData = async (urlPage?:string) => {
        setLoadingData(true);
        try {
            let data:any;
            if (urlPage) {
                data = await paginate(urlPage);
            }else{
                data = await paginate(PRODUCTOS);
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
        <div className="productos">

            <TitleBox titulo="Relacion de productos"/>

            <div className="box">

                <div className="grid-211 gap">
                    
                    <Search
                        searchTxt={searchTxt}
                        searchData={searchData}
                        searchState={searchState}
                        onChangeSearch={onChangeSearch}
                        handlerStateSearch={handlerStateSearch}
                        searchFocus={searchFocus}
                        placeholder="Nombre o codigo ..."
                    />
                    
                    
                    <div></div>
                    <Link to="/productos/crear-producto" className="btn btn-info" >
                        <BiPlusCircle />
                        Nuevo producto
                    </Link>
                    
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
                            <div className="grid-4 gap">
                                {
                                    data.map((e:any) => {
                                        return (
                                            <Producto
                                                key={e.id}
                                                producto={e}
                                                handlerDeleted={handlerDeleted}
                                                handlerBarcode={handlerModalBarcode}
                                                // handlerVer={handlerVer}
                                            />
                                        )
                                    })   
                                }
                            </div>
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

            <ModalEliminar 
                modal={ modalEliminar } 
                setModal={ setModalEliminar } 
                id={infoProducto.id}
                nombre={infoProducto.nombre}
                url={PRODUCTOS} 
                getData={getData}
                setSearchState={setSearchState}
            />

            {/* <ModalVer
                data={cliente}
                modal={modalVer}
                setModal={setModalVer}
                loading={loadingOne}
            /> */}

            <ModalCodigoBarras
                modal={modalBarcode}
                setModal={setModalBarcode}
                producto={producto}
            />


        </div>
    )
}
