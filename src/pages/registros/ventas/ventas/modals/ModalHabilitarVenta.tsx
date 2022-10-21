import { useState } from "react";
import { BiX } from "react-icons/bi"
import { LoadSwitchBtn } from "../../../../../components/btns/LoadSwitchBtn"
import { Modal } from "../../../../../components/modals/Modal"
import { put } from "../../../../../resources/fetch";
import { VENTAS } from "../../../../../resources/routes";

export const ModalHabilitarVenta = ({ modal, setModal, idVenta, getData }:any) => {

    const [loading, setLoading] = useState<boolean>(false);

    const handlerUpdate = async () => { 

        const data:any = {
            estado_venta: "enviado"
        }

        setLoading(true);
        try {
            await put(idVenta, data, VENTAS + "/reporte/habilitar-venta");
            setLoading(false);

        } catch (error) {
            setLoading(true);
            console.log(error);
        } finally {
            getData();
            setModal(false);
        }
    }
    

    return (
        <Modal
            modal={modal}
            setModal={setModal}
            border="border-warning"
        >
            <div className="center grid-1 gap">

                <div className="grid-1 gap">
                    <h3>¿Seguro que habilitar esta venta rechazada?</h3>
                </div>

                <div className="grid-4 gap">
                    <div />

                    <LoadSwitchBtn 
                        label="Aceptar" 
                        loading={loading}  
                        handler={handlerUpdate}
                    />
                    
                    <button className="btn btn-warning" onClick={ () => { setModal(false) } }>
                        <BiX />Cancelar
                    </button>

                    <div />
                </div>

            </div>
        </Modal>
    )
}
