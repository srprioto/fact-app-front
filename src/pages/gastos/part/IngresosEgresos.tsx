import { useEffect, useState } from "react"
import { BiPlusCircle } from "react-icons/bi"
import { Select } from "../../../components/forms/Select"
import { Loading } from "../../../components/loads/Loading"
import { ModalWrap } from "../../../components/modals/ModalWrap"
import { NoRegistros } from "../../../components/NoRegistros"
import { Pagination } from "../../../components/Pagination"
import { SearchWrap } from "../../../components/search/SearchWrap"
import { TitleBox } from "../../../components/TitleBox"
import { get, paginate } from "../../../resources/fetch"
import { INGRESOS_EGRESOS_PAGINATE, INGRESOS_EGRESOS_SEARCH, LOCALES_SOLO } from "../../../resources/routes"
import { ListaIngresosEgresos } from "./ListaIngresosEgresos"
import { ModalAddIngresoEgreso } from "./ModalAddIngresoEgreso"
import { ModalEditarIngresEgreso } from "./modals/ModalEditarIngresEgreso"
import { ModalEliminarIngresoEgreso } from "./modals/ModalEliminarIngresoEgreso"


export const IngresosEgresos = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Array<any>>([]);
    const [locales, setLocales] = useState<Array<any>>([]);
    const [idLocal, setIdLocal] = useState<string>("_"); // local seleccionado para la filtracion
    const [modalAddIE, setModalAddIE] = useState<boolean>(false);
    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });

    const [modalEliminar, setModalEliminar] = useState<boolean>(false);
    const [idIngresoEgreso, setIdIngresoEgreso] = useState<number>(0);
    const [modalEditar, setModalEditar] = useState<boolean>(false);
    const [ingresoEgreso, setingresoEgreso] = useState<any>({});

    // *** search
    const [searchState, setSearchState] = useState<boolean>(false);


    useEffect(() => {
        getData();
    }, [idLocal]);


    useEffect(() => {
        getLocales();
    }, [])
    

    const getLocales = async () => { 
        setLoading(true);
        try {
            const locales = await get(LOCALES_SOLO);
            setLocales(locales);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }


    const getData = async (urlPage?:string) => {
        setLoading(true);
        try {
            let data:any;
            if (urlPage) {
                data = await paginate(urlPage);
            }else{
                data = await paginate(INGRESOS_EGRESOS_PAGINATE + `/${idLocal}`);
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


    const handlerAddIE = () => { 
        setModalAddIE(!modalAddIE);
    }


    const handlerEditar = (e:any) => { 
        setingresoEgreso(e);
        setModalEditar(!modalEditar);
    }


    const handlerDeleted = (id:any) => { 
        setIdIngresoEgreso(id);
        setModalEliminar(!modalEliminar);
    }

    const handlerLocal = (e:any) => { 
        idLocal && setIdLocal(e.target.value)
    }


    return (
        <div className="ingresos-egresos">
            <TitleBox titulo="Ingresos y Egresos"/>
            
            <div className="box">
                <div className="grid-211 gap">

                    <SearchWrap
                        setLoadingData={setLoading}
                        setData={setData}
                        getData={getData}
                        searchState={searchState}
                        setSearchState={setSearchState}
                        url={INGRESOS_EGRESOS_SEARCH}
                        placeholder="Descripcion de ingreso o egreso ..."
                    />
                   
                   <button title="Añade un ingreso o egreso" className="btn btn-info" onClick={handlerAddIE}>
                        <BiPlusCircle />
                        Añadir I/E
                    </button>

                    <Select
                        loading={loading}
                        name={"id_local"}
                        onChange={handlerLocal}
                        textDefault="Selecciona un local"
                        defaultValue={false}
                    >
                        <option value={"_"}>Todas las tiendas</option>
                        <option value={"No"}>Sin tienda</option>
                        {
                            locales.map((e:any) => { 
                                return (
                                    <option key={e.id} value={Number(e.id)}>{ e.nombre }</option>
                                )
                            })
                        }
                    </Select>

                </div>
            </div>

            <div className="box">
                {
                    loading 
                    ? <Loading />
                    : ( 
                        data.length <= 0
                        ? <NoRegistros />
                        : <ListaIngresosEgresos 
                            data={data} 
                            handlerEditar={handlerEditar}
                            handlerDeleted={handlerDeleted} 
                        />
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

            <ModalWrap modal={modalAddIE}>
                <ModalAddIngresoEgreso
                    modal={modalAddIE}
                    setModal={setModalAddIE}
                    getData={getData}
                    locales={locales}
                />
            </ModalWrap>

            <ModalWrap modal={modalEliminar}>
                <ModalEliminarIngresoEgreso
                    modal={modalEliminar}
                    setModal={setModalEliminar}
                    idIngresoEgreso={idIngresoEgreso}
                    getData={getData}
                />
            </ModalWrap>

            <ModalWrap modal={modalEditar}>
                <ModalEditarIngresEgreso
                    modal={modalEditar}
                    setModal={setModalEditar}
                    ingresoEgreso={ingresoEgreso}
                    getData={getData}
                    locales={locales}
                />
            </ModalWrap>

        </div>
    )
}
