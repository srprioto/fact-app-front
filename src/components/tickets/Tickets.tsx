import { useEffect, useState } from "react"
import { BiBell } from "react-icons/bi"
import { get } from "../../resources/fetch";
import { TICKETS } from "../../resources/routes";
import { ModalWrap } from "../modals/ModalWrap";
import { ModalVerTicket } from "./ModalVerTicket";
import { Notificaciones } from "./Notificaciones";

interface tickets {
    idLocal:string;
    idUser:string;
}

export const Tickets = ({ idLocal, idUser }:tickets) => {

    const [showNotificaciones, setShowNotificaciones] = useState<boolean>(false);
    const [ticketsNoVistos, setTicketsNoVistos] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const [modalVer, setModalVer] = useState<boolean>(false);
    const [ticketId, setTicketId] = useState<number>(0);


    useEffect(() => {
        getTickets();
    }, [])
    

    const getTickets = async () => { 
        setLoading(true);
        try {
            const data = await get(TICKETS + `/no_vistos/${idLocal}/${idUser}`);
            setTicketsNoVistos(data);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }


    const handlerModalVer = (id:number) => { 
        setShowNotificaciones(false);
        setTicketId(id);
        setModalVer(true);
    }


    return (
        <div className="tickets">
            { 
                showNotificaciones 
                && <div 
                    className="div-close" 
                    onClick={() => setShowNotificaciones(false)}
                /> 
            }
            <div className="box-ticket">
                <div
                    className="pointer btn-shot-tickets"
                    onClick={() => setShowNotificaciones(!showNotificaciones)}
                >
                    <BiBell className="icon-header" />
                    {
                        (!loading && ticketsNoVistos > 0)
                        && <div className="count-no-vistos">
                            <span>{ ticketsNoVistos }</span>
                        </div>
                    }
                </div>
                {
                    showNotificaciones
                    && <Notificaciones
                        setShowNotificaciones={setShowNotificaciones} 
                        handlerModalVer={handlerModalVer}
                        getTickets={getTickets}
                        idLocal={idLocal}
                        idUser={idUser}
                    />
                }
            </div>

            <ModalWrap modal={modalVer} >
                <ModalVerTicket
                    modal={modalVer}
                    setModal={setModalVer}
                    ticketId={ticketId}
                    getTickets={getTickets}
                />
            </ModalWrap>

        </div>
    )
}
