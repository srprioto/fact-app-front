import { useState } from "react";
import { LoadSwitchBtn } from "../../../../components/btns/LoadSwitchBtn";
import { Modal } from "../../../../components/modals/Modal"
import { destroy } from "../../../../resources/fetch";
import { INGRESOS_EGRESOS } from "../../../../resources/routes";

interface modalEliminarIngresoEgreso {
    modal:boolean;
    setModal:Function;
    idIngresoEgreso:number;
    getData:Function;
}

export const ModalEliminarIngresoEgreso = ({ modal, setModal, idIngresoEgreso, getData }:modalEliminarIngresoEgreso) => {

    const [loading, setLoading] = useState<boolean>(false);

    const handlerDestoroy = async () => { 
        setLoading(true);
        try {
            await destroy(idIngresoEgreso, INGRESOS_EGRESOS);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(true);
        } finally {
            getData();
            setModal(false);
        }
    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            border={"border-danger"}
            width={40}
        >

            <div className="center grid-1 gap">

                <h3>¿Seguro que quieres eliminar el registro?</h3>

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
