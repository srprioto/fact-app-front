import { BiCheck, BiReply } from "react-icons/bi"
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2"
import { Modal } from "../../../../components/modals/Modal"

export const ModalVentaRechazar = ({ modal, setModal, venta, rechazarVenta, loading }:any) => {
    return (
        <Modal
            modal={modal}
            setModal={setModal}
            border="border-danger"
        >
            <div className="grid-1 gap">
                
                <div className="center">
                    <h1 className="danger mb-25">¡Cuidado!</h1>
                    <h3 className="mb-25">
                        Estas rechazando la venta <strong className="warning">{ venta.codigo_venta }</strong>
                        {/* Estas rechazando la venta <strong className="info">Nro: { codigoPago() + "-" + venta.id }</strong> */}
                    </h3>
                </div>
                <div className="grid-4 gap">
                    <div></div>
                    <LoadSwitchBtn2
                        loading={loading}
                        className="btn btn-danger"
                        handler={() => rechazarVenta("rechazado", false, false)}
                    >
                        <BiCheck /> Rechazar venta
                    </LoadSwitchBtn2>
                    <button 
                        className="btn btn-warning"
                        onClick={() => setModal(!modal)}
                    ><BiReply /> Regresar</button>

                    <div></div>
                </div>
            </div>
        </Modal>
    )
}
