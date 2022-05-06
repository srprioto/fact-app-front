import { useState } from "react";
import { BiCheck, BiReply } from "react-icons/bi"
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../components/modals/Modal"
import { put } from "../../../resources/fetch";
import { CAJA_CERRAR } from "../../../resources/routes";
import { LoadSwitchBtn2 } from '../../../components/btns/LoadSwitchBtn2';

export const ModalCerrarCaja = ({ modal, setModal, caja, idCaja }:any) => {

    const navigate = useNavigate();

    const [loadUpdate, setLoadUpdate] = useState<boolean>(false);

    const handlerUpdateCaja = async () => { 
        setLoadUpdate(true);
        try {
            await put(idCaja, caja, CAJA_CERRAR);
            setLoadUpdate(false);
        } catch (error) {
            setLoadUpdate(true);
            console.log(error);
        } finally {
            setModal(false);
            navigate(`/tiendas`);
        }
    }

    return (
        <Modal
            title="Seguro que quieres cerrar caja?"
            modal={modal}
            setModal={setModal}
            width={50}
        >
            <div className="grid-1 gap">
                <h4 className="danger center">Si cierras caja no podrás vender o cobrar por productos hasta que vuelvas a abrirla.</h4>

                <div className="grid-4 gap">
                    <div></div>
                    <LoadSwitchBtn2
                        loading={loadUpdate}
                        className="btn btn-success"
                        handler={handlerUpdateCaja}
                    >
                        <BiCheck /> Si, Seguro
                    </LoadSwitchBtn2>                    
                    <button onClick={() => setModal(false) }className="btn btn-warning">
                        <BiReply /> Regresar
                    </button>
                </div>

            </div>
        </Modal>
    )
}
