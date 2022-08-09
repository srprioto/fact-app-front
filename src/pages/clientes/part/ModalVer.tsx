import { Loading } from "../../../components/loads/Loading";
import { Modal } from "../../../components/modals/Modal";
import { fecha } from "../../../resources/func/fechas";
// import { ClienteDto } from "../../../resources/dtos/Cliente";

interface modalVer{
    data:any;
    modal:boolean;
    setModal:Function;
    loading:boolean;
}

export const ModalVer = ({ data, modal, setModal, loading }:modalVer) => {

    return (
        <Modal 
            border="border-primary" 
            title="Informacion del cliente" 
            modal={modal} 
            setModal={setModal}
            width={80}
        >

            {
                loading
                ? <Loading />
                : (
                    <div className="grid-2 gap">

                        <div className="wrap-descripcion5 box box-par m-0">
                            <h3>Información del Cliente</h3>
                            <span className="grid-12 gap">
                                <p>Razon social</p>
                                <h4>{ data.razonSocial }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Nombre comercial</p>
                                <h4>{ data.nombreComercial }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Nombre del cliente</p>
                                <h4>{ data.nombre }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Telefono</p>
                                <h4>{ data.telefono }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Email</p>
                                <h4>{ data.email }</h4>
                            </span>
                        </div>

                        <div className="wrap-descripcion5 box box-par m-0">
                            <h3>Ubicacion</h3>
                            <span className="grid-12 gap">
                                <p>Direccion</p>
                                <h4>{ data.direccion }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Departamento</p>
                                <h4>{ data.departamento }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Provincia</p>
                                <h4>{ data.provincia }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Distrito</p>
                                <h4>{ data.distrito }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Codigo del país</p>
                                <h4>{ data.codigo_pais }</h4>
                            </span>
                        </div>

                        <div className="wrap-descripcion5 box box-par m-0">
                            <h3>Informacion adicional</h3>
                            <span className="grid-12 gap">
                                <p>Tipo de documento</p>
                                <h4>{ data.tipoDocumento }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Nro de documento</p>
                                <h4>{ data.numero_documento }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Ubigeo</p>
                                <h4>{ data.ubigeo !== 0 ? data.ubigeo : "" }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Estado Cliente</p>
                                <h4>{ data.estado }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Condic. Cliente</p>
                                <h4>{ data.condom }</h4>
                            </span>
                        </div>
                        
                        <div className="wrap-descripcion5 box box-par m-0">
                            <h3>Otros</h3>
                            <span className="grid-12 gap">
                                <p>Fecha registro</p>
                                <h4>{ fecha(data.created_at) }</h4>
                            </span>
                            <span className="grid-12 gap">
                                <p>Ultima actualiz.</p>
                                <h4>{ fecha(data.updated_at) }</h4>
                            </span>
                        </div>
                        
                    </div>
                )
            }
        </Modal>
    )
};