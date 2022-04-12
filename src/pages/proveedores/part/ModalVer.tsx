import { Loading } from "../../../components/loads/Loading";
import { Modal } from "../../../components/modals/Modal";
import { ProveedoresDto } from "../../../resources/dtos/ProveedoresDto";

interface modalVer{
    data:ProveedoresDto;
    modal:boolean;
    setModal:Function;
    loading:boolean;
}

export const ModalVer = ({ data, modal, setModal, loading }:modalVer) => {
    return (
        <Modal border="border-primary" title="Informacion del proveedor" modal={modal} setModal={setModal}>

            {
                loading
                ? <Loading />
                : (
                    <div className="grid-2 gap">
                        <div className="box">
                            <h3 className="mb-25">Informacion de persona ó empresa</h3>
                            <div className="grid-2 gap-v">
                                <p>Nombre del Proveedor: </p><p><strong>{ data.nombre }</strong></p>
                                <p>Razon social: </p><p><strong>{ data.razon_social }</strong></p>
                                <p>Documento - { data.tipo_documento }: </p><p><strong> { data.documento }</strong></p>
                                <p>Direccion: </p><p><strong>{ data.direccion }</strong></p>
                                <p>Tipo producto: </p><p><strong>{ data.tipo_producto }</strong></p>
                            </div>
                        </div>

                        <div className="box">
                            <h3 className="mb-25">Informacion de contacto</h3>
                            <div className="grid-2 gap-v">
                                <p>Telefono: </p><p><strong>{ data.telefono }</strong></p>
                                <p>Celular: </p><p><strong>{ data.tel_movil }</strong></p>
                                <p>Email: </p><p><strong>{ data.email }</strong></p>
                            </div>
                        </div>

                        <div className="box">
                            <h3 className="mb-25">Informacion bancaria</h3>
                            <div className="grid-2 gap-v">
                                <p>Nombre del banco: </p><p><strong>{ data.nombre_banco }</strong></p>
                                <p>Nro de cuenta: </p><p><strong>{ data.nro_cuenta_bancaria }</strong></p>
                                <p>Nombre del titular: </p><p><strong>{ data.nombre_titular }</strong></p>
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
