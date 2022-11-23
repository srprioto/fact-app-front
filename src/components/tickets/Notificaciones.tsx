import { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import { Link } from "react-router-dom";
import { TicketsDto } from "../../resources/dtos/TicketsDto";
import { get } from "../../resources/fetch";
import { timeAgo } from "../../resources/func/fechas";
import { subguionEspacio } from "../../resources/func/guionEspacio";
import { TICKETS } from "../../resources/routes";
import { Loading } from "../loads/Loading";
import { NoRegistros } from "../NoRegistros";

interface notificaciones {
    setShowNotificaciones:Function;
    handlerModalVer:Function;
    getTickets:Function;
    idLocal:string;
}

export const Notificaciones = ({ setShowNotificaciones, handlerModalVer, getTickets, idLocal }:notificaciones) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [tickets, setTickets] = useState<Array<any>>([]);


    useEffect(() => {
        getUltimosTickets();
        getTickets();
    }, [])


    const getUltimosTickets = async () => { 
        setLoading(true);
        try {
            const data = await get(TICKETS + `/ultimos_tickets/${idLocal}`);
            setTickets(data);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    
    return (
        <div className="notificaciones">
            <div onClick={() => setShowNotificaciones(false)} className="cerrar-notificaciones pointer">
                <BiX className="m-0" size={25}/>
            </div>
            <h4 className="titulo-notificaciones">Notificaciones</h4>
            {
                loading
                ? <Loading />
                : (
                    <div className="lista-notificaciones">
                        {
                            tickets.length <= 0
                            ? <NoRegistros />
                            : (
                                <TablaNotificaciones tickets={tickets} handlerModalVer={handlerModalVer} />
                            )
                        }
                    </div>
                )
            }
            <Link to="/tickets" className="middle">Mostrar todas las notificaciones</Link>
        </div>
    )
}


const TablaNotificaciones = ({ tickets, handlerModalVer }:any) => { 
    return (
        <table className="table2 pointer">
            <tbody>
                {
                    tickets.map((e:any) => {
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
                            <tr key={e.id} onClick={() => handlerModalVer(e.id)}>
                                <td>
                                    <span className={
                                        e.estado
                                        ? "opacity2"
                                        : "secundary"
                                    }>{ e.titulo }</span>
                                    <h5 className={classTipo + " m-0"}>{ subguionEspacio(e.tipo) }</h5>
                                    <h5 className="m-0 capitalize"
                                    >{ timeAgo(e.created_at) }</h5>
                                </td>
                            </tr>
                        )
                    })   
                }
            </tbody>
        </table>
    )
}