import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BiPlusCircle } from "react-icons/bi";

import { TitleBox } from "../../../components/TitleBox";
import { Loading } from "../../../components/loads/Loading";
import { ModalEliminar } from "../../../components/modals/ModalEliminar";
import { Proveedor } from "./Proveedor";
import { Pagination } from "../../../components/Pagination";
import { Search } from "../../../components/Search";

import { PROVEEDORES, PROVEEDORES_SEARCH } from "../../../resources/routes";
import { ProveedoresDto } from "../../../resources/dtos/ProveedoresDto";
import { get, getOne, paginate } from "../../../resources/fetch";
import { ModalVer } from "./ModalVer";
import { NoRegistros } from "../../../components/NoRegistros";

export const Proveedores = () => {

    
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [loadingProv, setLoadingProv] = useState<boolean>(false);

    const [modalEliminar, setModalEliminar] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);

    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });

    const [data, setData] = useState<any>([]);
    const [proveedor, setProveedor] = useState<any>({
        // nombre: "",
        // razon_social: "",
        // tipo_documento: "",
        // documento: "",
        // direccion: "",
        // telefono: "",
        // tel_movil: "",
        // email: "",
        // nombre_banco: "",
        // nro_cuenta_bancaria: "",
        // nombre_titular: "",
        // created_at: "",
        // updated_at: "",
    });
    const [infoProveedor, setInfoProveedor] = useState<any>({});

    // search

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
                const data = await get(PROVEEDORES_SEARCH + searchTxt);
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
    
    // end search
    

    useEffect(() => {
        getData();
    }, []);
    


    const handlerDeleted = (id:number, nombre?:string) => {
        setInfoProveedor({ id, nombre });
        setModalEliminar(!modalEliminar);
    }

    const handlerVer = (id:number) => { 
        getOneData(id);
        setModalVer(!modalVer);
    }

    const getOneData = async (id:number) => { 
        setLoadingProv(true);
        try {
            const response_productos = await getOne(id, PROVEEDORES);
            setProveedor(response_productos);        
            setLoadingProv(false);            
        } catch (error) {
            setLoadingProv(true);
            console.log(error);
        }
    }

    const getData = async (urlPage?:string) => {
        setLoadingData(true);
        try {
            let data:any;
            if (urlPage) {
                data = await paginate(urlPage);
            }else{
                data = await paginate(PROVEEDORES);
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
        <div className="proveedores">
            <TitleBox titulo="Directorio de Proveedores"/>

            <div className="box">

                <div className="grid-211 gap">
                    
                    <Search
                        searchTxt={searchTxt}
                        searchData={searchData}
                        searchState={searchState}
                        onChangeSearch={onChangeSearch}
                        handlerStateSearch={handlerStateSearch}
                        searchFocus={searchFocus}
                        placeholder="Nombre o razon social ..."
                    />

                    <div></div>
                    <Link to="/proveedores/nuevo" className="btn btn-info" >
                        <BiPlusCircle />
                        Nuevo proveedor
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
                                        <th>Nombre</th>
                                        <th>Razon social</th>
                                        <th>Documento</th>
                                        <th>Tipo producto</th>
                                        <th className="transparent inlineblock">...</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {
                                        data.map((e:ProveedoresDto) => {
                                            return (
                                                <Proveedor
                                                    key={e.id}
                                                    proveedor={e}
                                                    handlerDeleted={handlerDeleted}
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

            <ModalEliminar 
                modal={ modalEliminar } 
                setModal={ setModalEliminar } 
                id={infoProveedor.id}
                nombre={infoProveedor.nombre}
                url={PROVEEDORES} 
                getData={getData}
                setSearchState={setSearchState}
            />

            <ModalVer
                modal={modalVer}
                data={proveedor}
                setModal={setModalVer}
                loading={loadingProv}
            />


        </div>
    )
};
