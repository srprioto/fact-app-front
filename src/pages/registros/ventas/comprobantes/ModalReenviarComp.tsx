import { useState } from "react"
import { BiCheck, BiReply } from "react-icons/bi"
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2"
import { Modal } from "../../../../components/modals/Modal"
import { post } from "../../../../resources/fetch"
import { COMPROBANTE } from "../../../../resources/routes"

export const ModalReenviarComp = ({ modal, setModal, idComprobante, getData }:any) => {

    const [loading, setLoading] = useState(false);

    const handlerReenviarComp = async () => { 
        setLoading(true);
        try {
            await post({ idComprobante: idComprobante}, COMPROBANTE + "/reenviar");
            // const resto = await post({ idComprobante: idComprobante}, COMPROBANTE + "/reenviar");
            // console.log(resto);
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
            title="Reenvio de comprobante"
            width={50}
        >
            <div className="grid-1 gap">
                
                <h3 className="center">¿Seguro que quieres reenviar este comprobante?</h3>

                <div className="grid-4 gap">
                    <div></div>
                    <LoadSwitchBtn2
                        loading={loading}
                        className="btn btn-success"
                        handler={handlerReenviarComp}
                    >
                        <BiCheck /> Confirmar
                    </LoadSwitchBtn2>
                    
                    <button className="btn btn-warning" onClick={() => {setModal(false)}}>
                        <BiReply /> Regresar
                    </button>
                </div>

            </div>
        </Modal>
    )
}
