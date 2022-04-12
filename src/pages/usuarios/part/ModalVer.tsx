import { Loading } from "../../../components/loads/Loading";
import { Modal } from "../../../components/modals/Modal";
// import { UsuarioDto } from "../../../resources/dtos/UsuariosDto";

// interface modalVer{
//     data:UsuarioDto;
//     modal:boolean;
//     setModal:Function;
//     loading:boolean;
// }

export const ModalVer = ({ data, modal, setModal, loading }:any) => {

    return (
        <Modal border="border-primary" title="Informacion del usuario" modal={modal} setModal={setModal}>
            {
                loading
                ? <Loading />
                : (
                    <div className="grid-2 gap-v">

                        <div className="box">
                            <h3 className="mb-25">Informacion personal</h3>
                            <div className="grid-2 gap-v">
                                <p>Nombre del usuario: </p><p><strong>{ data.nombre }</strong></p>
                                <p>Documento: </p><p><strong>{ data.documento }</strong></p>
                                <p>Direccion: </p><p><strong> { data.direccion }</strong></p>
                                <p>Edad: </p><p><strong>{ data.edad }</strong></p>
                            </div>
                        </div>

                        <div className="box">
                            <h3 className="mb-25">Informacion de contacto</h3>
                            <div className="grid-2 gap-v">
                                <p>Telefono: </p><p><strong>{ data.telefono }</strong></p>
                                <p>Email: </p><p><strong>{ data.email }</strong></p>
                            </div>
                        </div>

                        <div className="box">
                            <h3 className="mb-25">Rol</h3>
                            <div className="grid-2 gap-v">
                                <p>Rol del usuario: </p><p><strong>{ data.roles.descripcion }</strong></p>
                                {/* <p> </p><p><strong>{ data.roles.rol }</strong></p> */}
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






