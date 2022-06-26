import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { BiPlusCircle } from "react-icons/bi"

import { Loading } from "../../../components/loads/Loading"
import { ModalEliminar } from "../../../components/modals/ModalEliminar"
import { Pagination } from "../../../components/Pagination"
import { TitleBox } from "../../../components/TitleBox"
import { ModalVer } from "./ModalVer"

import { getOne, paginate, post } from "../../../resources/fetch"
import { CLIENTES, CLIENTES_SEARCH } from "../../../resources/routes"
import { Cliente } from "./Cliente"
import { Search } from "../../../components/Search"
import { NoRegistros } from "../../../components/NoRegistros"
// import { ClienteDto } from "../../../resources/dtos/Cliente"

export const Clientes = () => {

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [loadingOne, setLoadingOne] = useState<boolean>(false);

    const [modalEliminar, setModalEliminar] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);

    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });

    const [data, setData] = useState<any>([]);
    const [cliente, setCliente] = useState<any>({
		id: 0,
        nombre: "",
		direccion: "",
		telefono: "",
		documento: "",
		email: "",
		created_at: "",
		updated_at: ""
    });

    const [infoCliente, setInfoCliente] = useState<any>({});

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
                const data = await post({value: searchTxt}, CLIENTES_SEARCH);
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
        setInfoCliente({ id, nombre });
        setModalEliminar(!modalEliminar);
    }

    const handlerVer = (id:number) => { 
        getOneData(id);
        setModalVer(!modalVer);
    }


    const getOneData = async (id:number) => { 
        setLoadingOne(true);
        try {
            const response_productos = await getOne(id, CLIENTES);
            setCliente(response_productos);        
            setLoadingOne(false);            
        } catch (error) {
            setLoadingOne(true);
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
                data = await paginate(CLIENTES);
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
        <div className="clientes">
            <TitleBox titulo="Directorio de Clientes"/>

            <div className="box">

                <div className="grid-211 gap">
                    
                    <Search
                        searchTxt={searchTxt}
                        searchData={searchData}
                        searchState={searchState}
                        onChangeSearch={onChangeSearch}
                        handlerStateSearch={handlerStateSearch}
                        searchFocus={searchFocus}
                        placeholder="Nombre, razon social o documento ..."
                    />
                    {/* <div></div> */}
                    
                    <div></div>
                    <Link to="/clientes/nuevo" className="btn btn-info" >
                        <BiPlusCircle />
                        Nuevo cliente
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
                                        <th>Nombre / Razon social</th>
                                        <th>Tipo Doc.</th>
                                        <th>Documento</th>
                                        <th>Telefono</th>
                                        <th>Email</th>
                                        <th className="transparent inlineblock">...</th>
                                    </tr>
                                </thead>
                                
                                <tbody>
                                    {
                                        data.map((e:any) => {
                                            return (
                                                <Cliente
                                                    key={e.id}
                                                    cliente={e}
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
            />

        </div>
    )
}
