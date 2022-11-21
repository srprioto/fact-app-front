import { useEffect, useState } from "react";
import { getOne } from "../../resources/fetch";
import { fecha } from "../../resources/func/fechas";
import { TICKETS } from "../../resources/routes";
import { Loading } from "../loads/Loading";
import { Modal } from "../modals/Modal"

interface modalVerTicket {
    modal:boolean;
    setModal:Function;
    ticketId:number;
}

export const ModalVerTicket = ({ modal, setModal, ticketId }:modalVerTicket) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [ticket, setTicket] = useState<any>({});

    const tipo:string = ticket.tipo ? ticket.tipo.replace('_', ' ') : "";


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

    console.log(ticket);    

    return (
        <Modal
            modal={modal}
            setModal={setModal}
            title={loading ? "..." : ticket.titulo}
            width={50}
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
            
        </Modal>
    )
}
