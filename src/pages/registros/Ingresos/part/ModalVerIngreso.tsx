import { Modal } from "../../../../components/modals/Modal"
import { BoxVerIngresos } from "./BoxVerIngresos";

export const ModalVerIngreso = ({ modal, setModal, idIngreso }:any) => {

    return (
        <Modal
            titulo="Detalles del ingreso de productos"
            modal={modal}
            setModal={setModal}
            border="border-primary"
            width={80}
        >
            <BoxVerIngresos idIngreso={idIngreso} />

        </Modal>
    )
}
