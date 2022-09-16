import { useState } from "react"
import { BiCalendar } from "react-icons/bi";
import { ModalWrap } from "../../../../components/modals/ModalWrap"
import { ModalFechasVentas } from "./ModalFechasVentas";


export const FechasVentas = ({ getData }:any) => {
    const [modalFechas, setModalFechas] = useState<boolean>(false);
    
    return (
        <div>

            <button className="btn btn-primary" onClick={() => setModalFechas(!modalFechas)}>
                <BiCalendar />
            </button>

            <ModalWrap modal={modalFechas}>
                <ModalFechasVentas
                    modal={modalFechas}
                    setModal={setModalFechas}
                    getData={getData}
                />
            </ModalWrap>
            

        </div>
    )
}
