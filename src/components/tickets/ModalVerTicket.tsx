import { useEffect, useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import { ModalVerComprobante } from "../../pages/registros/ventas/comprobantes/ModalVerComprobante";
import { TicketsDto } from "../../resources/dtos/TicketsDto";
import { getOne } from "../../resources/fetch";
import { fecha } from "../../resources/func/fechas";
import { TICKETS } from "../../resources/routes";
import { Loading } from "../loads/Loading";
import { Modal } from "../modals/Modal"
import { ModalWrap } from "../modals/ModalWrap";

interface modalVerTicket {
    modal:boolean;
    setModal:Function;
    ticketId:number;
    getTickets:Function;
}

export const ModalVerTicket = ({ modal, setModal, ticketId, getTickets }:modalVerTicket) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [ticket, setTicket] = useState<any>({});
    const [modalVerComp, setModalVerComp] = useState<boolean>(false);

    const tipo:string = ticket.tipo ? ticket.tipo.replace('_', ' ') : "";
    const relacion:any = ticket.relacion ? JSON.parse(ticket.relacion) : {};
    const local:any = ticket.local ? ticket.local : {};


    useEffect(() => {
        getTicket();
    }, [])


    const getTicket = async () => {
        setLoading(true);
        try {
            const data = await getOne(ticketId, TICKETS);
            setTicket(data);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }
 

    const acciones = ():Array<any> => { 
        const accionesArray:Array<any> = [];
        if (!loading) {
            if (
                ticket.tipo === TicketsDto.Error_envio || 
                ticket.tipo === TicketsDto.Rechazado ||
                ticket.tipo === TicketsDto.Error_anulacion ||
                ticket.tipo === TicketsDto.Anulacion_procesada
            ) {
                accionesArray.push({
                    label: "Ver compr.",
                    funcion: () => setModalVerComp(true),
                    icon: <BiShowAlt />
                });
            }
        }
        return accionesArray;
    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            title={loading ? "..." : ticket.titulo}
            width={50}
            btnClose={getTickets}
            acciones={acciones().length > 0 ? acciones() : null}
        >
            {
                loading
                ? <Loading />
                : (
                    <div className="grid-1 gap">

                        <div className="wrap-descripcion5 box box-par m-0">
                            {/* <h3>Titulo 1</h3> */}
                            <div className="mb-30">
                                <h4>{ ticket.descripcion }</h4>
                            </div>
                            <span className="grid-12 gap">
                                <p>Tipo:</p>
                                <h4>{ tipo }</h4>
                            </span>
                            {
                                ticket.local
                                && <span className="grid-12 gap">
                                    <p>Local:</p>
                                    <h4>{ local.nombre }</h4>
                                </span>
                            }
                            
                            <span className="grid-12 gap">
                                <p>Fecha de creacion:</p>
                                <h4>{ fecha(ticket.created_at) }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Ultima actualizacion:</p>
                                <h4>{ fecha(ticket.updated_at) }</h4>
                            </span>
                        </div>

                    </div>
                )
            }

            <ModalWrap modal={modalVerComp}>
                <ModalVerComprobante
                    modal={modalVerComp}
                    setModal={() => setModal()}
                    idComprobante={relacion.id}
                />
            </ModalWrap>
            
        </Modal>
    )
}
