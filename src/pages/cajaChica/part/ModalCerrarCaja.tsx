import { useState } from "react";
import { BiCheck, BiReply } from "react-icons/bi"
import { useNavigate } from "react-router-dom";
import { Modal } from "../../../components/modals/Modal"
import { put } from "../../../resources/fetch";
import { CAJA_CERRAR } from "../../../resources/routes";
import { LoadSwitchBtn2 } from '../../../components/btns/LoadSwitchBtn2';
import { useCaja } from "../../../hooks/useContext/caja.ts/useCaja";

export const ModalCerrarCaja = ({ modal, setModal, caja, idCaja, user, getDataOne }:any) => {

    const navigate = useNavigate();

    const cajaCtx = useCaja();

    const [loadUpdate, setLoadUpdate] = useState<boolean>(false);

    const handlerUpdateCaja = async () => { 
        setLoadUpdate(true);
        try {
            await put(idCaja, caja, CAJA_CERRAR);
            if (user) {
                cajaCtx.handlerEstadoCaja();
            }
            setLoadUpdate(false);
        } catch (error) {
            setLoadUpdate(true);
            console.log(error);
        } finally {
            setModal(false);
            if (user) {
                getDataOne();
            } else {
                navigate(`/tiendas`);
            }
        }
    }

    return (
        <Modal
            titulo="Seguro que quieres cerrar caja?"
            modal={modal}
            setModal={setModal}
            width={50}
        >
            <div className="grid-1 gap">
                <h4 className="warning center m-0">
                    Si cierras caja no podrás vender o cobrar hasta que vuelvas a abrirla.
                </h4>
                <h4 className="warning center">
                    Esta acción también eliminara todas las ventas pendientes o rechazadas.
                </h4>

                <div className="grid-4 gap">
                    <div></div>
                    <LoadSwitchBtn2
                        loading={loadUpdate}
                        className="btn btn-success"
                        handler={handlerUpdateCaja}
                    >
                        <BiCheck /> Si, Seguro
                    </LoadSwitchBtn2>
                    <button onClick={() => setModal(false)} className="btn btn-warning">
                        <BiReply /> Regresar
                    </button>
                </div>

            </div>
        </Modal>
    )
}
