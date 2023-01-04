import { Modal } from "../../../../../components/modals/Modal"

export const ModalExportarExcel = ({ modal, setModal }:any) => {
    return (
        <Modal
            titulo="Descargar reporte general en Excel"
            modal={modal}
            setModal={setModal}
        >
            <div className="grid-1 gap">

                <div className="box m-0">
                    
                </div>

                <div className="box m-0">

                </div>

            </div>

        </Modal>        
    )
}
