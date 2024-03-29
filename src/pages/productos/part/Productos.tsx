import { useEffect, useState } from "react";
import { BiDownload, BiPlusCircle } from "react-icons/bi"
import { Link } from "react-router-dom"

import { Loading } from "../../../components/loads/Loading";
import { ModalEliminar } from "../../../components/modals/ModalEliminar";
import { Pagination } from "../../../components/paginacion/Pagination";
import { TitleBox } from "../../../components/TitleBox"
import { Producto } from "./Producto";

import { API_URL, paginate } from "../../../resources/fetch";
import { PRODUCTOS, PRODUCTOS_SEARCH } from "../../../resources/routes";
import { NoRegistros } from "../../../components/NoRegistros";
import { ModalCodigoBarras } from "./ModalCodigoBarras";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { ModalVerProducto } from "./ModalVerProducto";
import { SearchWrap } from "../../../components/search/SearchWrap";
import { ToolTip } from "../../../components/tooltip/ToolTip";
import { ModalDescExcel } from "../../../components/modals/ModalDescExcel";

export const Productos = () => {

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [modalEliminar, setModalEliminar] = useState<boolean>(false);
    const [modalBarcode, setModalBarcode] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);
    const [modalDescargarExcel, setModalDescargarExcel] = useState<boolean>(false);
    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });
    const [data, setData] = useState<any>([]);
    const [producto, setProducto] = useState<any>({});
    const [idProducto, setIdProducto] = useState<number>(0);
    const [infoProducto, setInfoProducto] = useState<any>({});

    // *** search
    const [searchState, setSearchState] = useState<boolean>(false);
    // const [searchTxt, setSearchTxt] = useState<string>("");
    // const searchFocus = useRef<any>(null)

    
    // const searchData = async () => { 
    //     if (searchTxt === "" || searchTxt === undefined || searchTxt === null || searchTxt.length === 0) {
    //         searchFocus.current.focus();
    //     } else {
    //         setLoadingData(true);
    //         setSearchState(true);
    //         try {
    //             // const data = await get(PRODUCTOS_SEARCH + searchTxt);
    //             const data = await post({value: searchTxt}, PRODUCTOS_SEARCH);
    //             setLoadingData(false);
    //             setData(data);
    //         } catch (error) {
    //             setLoadingData(true);
    //             console.log(error);
    //         }
    //     }
    // }

    // const handlerStateSearch = () => {
    //     setSearchTxt("");
    //     setSearchState(false);
    //     getData();
    // }

    // const onChangeSearch = (e:any) => { 
    //     setSearchTxt(e.target.value);
    // }

    // *** end search

    useEffect(() => {
        getData();
    }, []);
    

    const handlerDeleted = (id:number, nombre?:string) => {
        setInfoProducto({ id, nombre });
        setModalEliminar(!modalEliminar);
    }

    const handlerVer = (prod:any) => { 
        setIdProducto(prod.id);
        setModalVer(!modalVer);
    }

    const handlerModalBarcode = (prod:any) => { 
        setProducto(prod);
        setModalBarcode(!modalBarcode)
    }

    const handlerModalDescargarExcel = () => { 
        setModalDescargarExcel(true);
    }


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
                    
                    <SearchWrap 
                        setLoadingData={setLoadingData}
                        setData={setData}
                        getData={getData}
                        searchState={searchState}
                        setSearchState={setSearchState}
                        url={PRODUCTOS_SEARCH}
                        placeholder="Nombre o codigo ..."
                    />
                    {/* <Search
                        searchTxt={searchTxt}
                        searchData={searchData}
                        searchState={searchState}
                        onChangeSearch={onChangeSearch}
                        handlerStateSearch={handlerStateSearch}
                        searchFocus={searchFocus}
                        placeholder="Nombre o codigo ..."
                    /> */}
                    
                    <div>
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
                            <table className="table">
                                
                                <thead>
                                    <tr>
                                        <th>Codigo</th>
                                        <th id="txt-nomb-prod">Nombre del prod.</th>
                                        <th>Marca</th>
                                        <th>Talla</th>
                                        <th>Color</th>
                                        <th id="txt-p-unid">P. Und.</th>
                                        <th id="txt-p-men">P. Men.</th>
                                        <th id="txt-p-may">P. May.</th>
                                        <th id="txt-p-com">P. Comp.</th>
                                        <th>
                                            <ToolTip
                                                anchor="txt-nomb-prod"
                                                descripcion="Nombre del producto"
                                            />
                                            <ToolTip
                                                anchor="txt-p-unid"
                                                descripcion="Precio de venta por unidad"
                                            /> 
                                            <ToolTip
                                                anchor="txt-p-men"
                                                descripcion="Precio de venta al por menor"
                                            /> 
                                            <ToolTip
                                                anchor="txt-p-may"
                                                descripcion="Precio de venta al por mayor"
                                            /> 
                                            <ToolTip
                                                anchor="txt-p-com"
                                                descripcion="Precio de compra"
                                            /> 
                                        </th>
                                    </tr>

                                </thead>                                
                                <tbody>
                                    {
                                        data.map((e:any) => {
                                            return (
                                                <Producto
                                                    key={e.id}
                                                    producto={e}
                                                    handlerDeleted={handlerDeleted}
                                                    handlerBarcode={handlerModalBarcode}
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

            <ModalEliminar 
                modal={ modalEliminar } 
                setModal={ setModalEliminar } 
                id={infoProducto.id}
                nombre={infoProducto.nombre}
                url={PRODUCTOS} 
                getData={getData}
                setSearchState={setSearchState}
            />

            <ModalWrap modal={modalVer}>
                <ModalVerProducto
                    idProducto={idProducto}
                    modal={modalVer}
                    setModal={setModalVer}
                    // loading={loadingOne}
                />
            </ModalWrap>
            

            <ModalCodigoBarras
                modal={modalBarcode}
                setModal={setModalBarcode}
                producto={producto}
            />

            <ModalWrap modal={modalDescargarExcel}>
                <ModalDescExcel
                    modal={modalDescargarExcel}
                    setModal={setModalDescargarExcel}
                    linkDescarga={API_URL + PRODUCTOS + '/descargar/excel'}
                    nombreArchivo="productos_excel.xlsx"
                />
            </ModalWrap>


        </div>
    )
}


/* <div className="grid-4 gap">
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
</div> */