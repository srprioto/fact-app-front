import { useState } from "react";
import { LoadSwitchBtn } from "../../../components/btns/LoadSwitchBtn";
import { Modal } from "../../../components/modals/Modal"
import { put } from "../../../resources/fetch";
import { CAJA_DETALLES } from "../../../resources/routes";

interface modalEliminarCajaDet {
    modal:boolean;
    setModal:Function;
    idCajaDetalle:number;
    getDataOne:Function;
    idCaja:number;
}

export const ModalEliminarCajDet = ({ 
    modal, 
    setModal, 
    idCajaDetalle, 
    getDataOne, 
    idCaja 
}:modalEliminarCajaDet) => {

    const [loading, setLoading] = useState<boolean>(false);

    const handlerDestoroy = async () => {

        const payload:any = {
            idCaja: idCaja,
        }

        setLoading(true);
        try {
            await put(idCajaDetalle, payload, CAJA_DETALLES);
            getDataOne();
            setLoading(false);
            setModal(false);
        } catch (error) {
            getDataOne();
            console.log(error);
            setLoading(true);
        }
    }


    return (
        <Modal 
            border={"border-danger"}
            modal={modal}
            setModal={setModal}
            width={40}
        >
            <div className="center grid-1 gap">

                <h3>¿Seguro que quieres eliminar este registro?</h3>
                <div className="grid-3 gap">
                    <div />
                    <LoadSwitchBtn 
                        label="Aceptar" 
                        loading={loading}
                        handler={handlerDestoroy}
                    />
                    <div />
                </div>

            </div>

        </Modal>
    )
}
