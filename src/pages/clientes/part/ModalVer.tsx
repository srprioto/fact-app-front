import { Loading } from "../../../components/loads/Loading";
import { Modal } from "../../../components/modals/Modal";
import { ClienteDto } from "../../../resources/dtos/Cliente";

interface ModalVer{
    data:ClienteDto;
    modal:boolean;
    setModal:Function;
    loading:boolean;
}

export const ModalVer = ({ data, modal, setModal, loading }:ModalVer) => {

    return (
        <Modal border="border-primary" title="Informacion del cliente" modal={modal} setModal={setModal}>

            {
                loading
                ? <Loading />
                : (
                    <div className="grid-2 gap">

                        <div className="box">
                            <h3 className="mb-25">Informacion personal</h3>
                            <div className="grid-2 gap-v">
                                <p>Nombre del cliente: </p><p><strong>{ data.nombre }</strong></p>
                                <p>Direccion: </p><p><strong>{ data.direccion }</strong></p>
                                <p>Telefono: </p><p><strong>{ data.telefono }</strong></p>
                                <p>Documento: </p><p><strong>{ data.documento }</strong></p>
                                <p>Email: </p><p><strong>{ data.email }</strong></p>
                            </div>
                        </div>

                        <div className="box">
                            <h3 className="mb-25">Otros</h3>                    
                            <div className="grid-2 gap-v">
                                <p>Fecha de creacion: </p><p><strong>{ data.created_at }</strong></p>
                                <p>Ultima fecha de actualizacion: </p><p><strong>{ data.updated_at }</strong></p>
                            </div>
                        </div>
                        
                    </div>
                )
            }
        </Modal>
    )
};
