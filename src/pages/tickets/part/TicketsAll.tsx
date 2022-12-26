import { useEffect, useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import { useAuth } from "../../../auth/useAuth";
import { DropDown } from "../../../components/DropDown";
import { Loading } from "../../../components/loads/Loading"
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { NoRegistros } from "../../../components/NoRegistros"
import { Pagination } from "../../../components/paginacion/Pagination";
import { ModalVerTicket } from "../../../components/tickets/ModalVerTicket";
import { TitleBox } from "../../../components/TitleBox"
import { TicketsDto } from "../../../resources/dtos/TicketsDto";
import { paginate } from "../../../resources/fetch";
import { fecha } from "../../../resources/func/fechas";
import { subguionEspacio } from "../../../resources/func/guionEspacio";
import { TICKETS } from "../../../resources/routes";

export const TicketsAll = () => {

    const auth = useAuth();
    const idLocal:string = !!auth.userInfo.local.id ? auth.userInfo.local.id : "_";

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Array<any>>([]);
    const [modalVer, setModalVer] = useState<boolean>(false);
    const [ticketId, setTicketId] = useState<number>(0);

    const [pagination, setPagination] = useState<any>({ meta: {}, links: {} });


    useEffect(() => {
        getData();
    }, []);


    const getData = async (urlPage?:string) => {
        setLoading(true);
        try {
            let data:any;
            if (urlPage) {
                data = await paginate(urlPage);
            }else{
                data = await paginate(TICKETS + `/paginate/${idLocal}/${auth.userInfo.sub}`);
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


    const handlerVerTicket = (id:number) => { 
        setTicketId(id);
        setModalVer(!modalVer);
    }


    return (
        <div className="tickets-notificaciones">
            <TitleBox titulo="Notificaciones"/>

            {/* <div className="box">

                <div className="grid-211 gap">
                    
                    <SearchWrap 
                        setLoadingData={setLoadingData}
                        setData={setData}
                        getData={getData}
                        searchState={searchState}
                        setSearchState={setSearchState}
                        url={CLIENTES_SEARCH}
                        placeholder="Nombre, razon social o documento ..."
                    />

                    <div></div>
                    
                    <Link to="/clientes/nuevo" className="btn btn-info" >
                        <BiPlusCircle />
                        Nuevo cliente
                    </Link>
                    
                </div>

            </div> */}

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
                                        <th>id</th>
                                        <th>Titulo</th>
                                        <th>Tipo</th>
                                        <th>Fecha de emisión</th>
                                        <th>Ultima actualiz.</th>
                                        <th className="transparent inlineblock">...</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        data.map((e:any) => {

                                            let classTipo:string = "";
                                            if (
                                                e.tipo === TicketsDto.Error_envio || 
                                                e.tipo === TicketsDto.Error_anulacion
                                            ) {
                                                classTipo = "danger";
                                            } else if (e.tipo === TicketsDto.Rechazado) {
                                                classTipo = "warning"
                                            } else if (e.tipo === TicketsDto.Anulacion_procesada) {
                                                classTipo = "secundary opacity2"
                                            }

                                            return (
                                                <tr className={
                                                    e.estado
                                                    ? "opacity2"
                                                    : "secundary"
                                                } key={e.id}>
                                                    <td>{ e.id }</td>
                                                    <td>{ e.titulo }</td>
                                                    <td className={classTipo}>{ subguionEspacio(e.tipo) }</td>
                                                    <td>{ fecha(e.created_at) }</td>
                                                    <td>{ fecha(e.updated_at) }</td>
                                                    <td className="td-dd">
                                                        <DropDown>
                                                            <span onClick={ () => handlerVerTicket(e.id) }>
                                                                <BiShowAlt /> Ver detalles
                                                            </span>
                                                        </DropDown>
                                                    </td>
                                                </tr>
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
                    // searchState={searchState}
                />
            </div>

            <ModalWrap modal={modalVer} >
                <ModalVerTicket
                    modal={modalVer}
                    setModal={setModalVer}
                    ticketId={ticketId}
                    getTickets={getData}
                />
            </ModalWrap>

        </div>
    )
}
