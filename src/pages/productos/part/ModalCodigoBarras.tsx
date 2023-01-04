import { Modal } from "../../../components/modals/Modal"
import { GestionCodigo } from "./forms/GestionCodigo"

export const ModalCodigoBarras = ({ modal, setModal, producto }:any) => {
    return (
        <Modal
            modal={modal}
            setModal={setModal}
            width={70}
            titulo="Gestion de codigo de barras"
        >
            <GestionCodigo
                producto={producto}
                noCreado
            />
        </Modal>
    )
}
