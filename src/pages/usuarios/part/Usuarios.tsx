import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { BiPlusCircle } from "react-icons/bi";

import { TitleBox } from "../../../components/TitleBox";
import { Loading } from "../../../components/loads/Loading";
import { Pagination } from "../../../components/Pagination";
import { ModalEliminar } from "../../../components/modals/ModalEliminar";
import { Search } from "../../../components/Search";
import { ModalVer } from "./ModalVer";
import { Usuario } from "./Usuario";

import { UsuarioDto } from "../../../resources/dtos/UsuariosDto";
import { USUARIOS, USUARIOS_SEARCH } from "../../../resources/routes";
import { getOne, paginate, post } from "../../../resources/fetch";
import { NoRegistros } from "../../../components/NoRegistros";

export const Usuarios = () => {

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [loadingOne, setLoadingOne] = useState<boolean>(false);

    const [modalEliminar, setModalEliminar] = useState<boolean>(false);
    const [modalVer, setModalVer] = useState<boolean>(false);

    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });

    const [data, setData] = useState<any>([]);
    const [user, setUser] = useState<UsuarioDto>({
        id:0,
		nombre:"",
		documento:"",
		direccion:"",
		telefono:"",
		edad:0,
		email:"",
		created_at:"",
		updated_at:"",
        roles: {
            id: 0,
            rol: ""
        }
    });
    const [infoUser, setInfoUser] = useState<any>({});

    // *** search
    const [searchState, setSearchState] = useState<boolean>(false);
    const [searchTxt, setSearchTxt] = useState<string>("");
    const searchFocus = useRef<any>(null)
    // *** end search


    useEffect(() => {
        getData();
    }, []);

    const handlerDeleted = (id:number, nombre?:string) => {
        setInfoUser({ id, nombre });
        setModalEliminar(!modalEliminar);
    }

    const handlerVer = (id:number) => { 
        getOneData(id);
        setModalVer(!modalVer);
    }


    // *** search
    const searchData = async () => { 
        if (searchTxt === "" || searchTxt === undefined || searchTxt === null || searchTxt.length === 0) {
            searchFocus.current.focus();
        } else {
            setLoadingData(true);
            setSearchState(true);
            try {
                const data = await post({value: searchTxt}, USUARIOS_SEARCH);
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

    const getOneData = async (id:number) => { 
        setLoadingOne(true);
        try {
            const response_productos = await getOne(id, USUARIOS);
            setUser(response_productos);        
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
                data = await paginate(USUARIOS);
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
        <div className="usuarios">
            
            <TitleBox titulo="Directorio de Usuarios"/>

            <div className="box">

                <div className="grid-211 gap">
                    
                    <Search
                        searchTxt={searchTxt}
                        searchData={searchData}
                        searchState={searchState}
                        onChangeSearch={onChangeSearch}
                        handlerStateSearch={handlerStateSearch}
                        searchFocus={searchFocus}
                        placeholder="Nombre o documento ..."
                    />
                    <div></div>
                    <Link to="/usuarios/nuevo" className="btn btn-info" >
                        <BiPlusCircle />
                        Nuevo usuario
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
                                                <Usuario
                                                    key={e.id}
                                                    usuario={e}
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

            <ModalEliminar 
                modal={ modalEliminar } 
                setModal={ setModalEliminar } 
                id={infoUser.id}
                nombre={infoUser.nombre}
                url={USUARIOS} 
                getData={getData}
                setSearchState={setSearchState}
            />

            <ModalVer
                modal={modalVer}
                data={user}
                setModal={setModalVer}
                loading={loadingOne}
            />

        </div>
    )
};
