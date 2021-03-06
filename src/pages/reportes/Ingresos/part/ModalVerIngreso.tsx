import { Modal } from "../../../../components/modals/Modal"
import { BoxVerIngresos } from "./BoxVerIngresos";

export const ModalVerIngreso = ({ modal, setModal, idIngreso }:any) => {

    return (
        <Modal
            title="Detalles del ingreso de productos"
            modal={modal}
            setModal={setModal}
            border="border-primary"
            width={70}
        >
            <BoxVerIngresos idIngreso={idIngreso} />

        </Modal>
    )
}
