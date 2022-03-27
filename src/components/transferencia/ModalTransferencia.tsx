import { Modal } from "../Modal"
import { TextoRelleno } from "../TextoRelleno"
import { RecibirTransferencia } from "./RecibirTransferencia"


export const ModalTransferencia = ({ modal, setModal, data, getTransacciones, actualizarDatos }:any) => {
    return (
        <Modal
            title="Confirmar ingreso de productos" 
            modal={modal}
            setModal={setModal}
            width={80}
            getFuncion={actualizarDatos}
        >
            <div className="modal-transferencia">
                {
                    data.length <= 0
                    ? <SinTransferencia /> 
                    : <RecibirTransferencia
                        data={data}
                        getTransacciones={getTransacciones}
                        // actualizarDatos={actualizarDatos}
                    />
                }
            </div>
        </Modal>
    )
}


export const SinTransferencia = () => {
    return (
        <div className="no-envios">
            <TextoRelleno texto="Aun no se envian productos"/>
        </div>
    )
}
