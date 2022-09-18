import { BiX } from "react-icons/bi";
import { TextoRelleno } from "../../../../components/TextoRelleno";

export const BoxProveedor = ({ proveedorSolo, loading, handlerReset }:any) => {

    const objExist = () => { 
        if (!(Object.keys(proveedorSolo).length) || !proveedorSolo || proveedorSolo === undefined) {
            return true
        } else {
            return false
        }
    }
    
    return (
        <div className="relative">
            { 
                !objExist()
                ? (
                    <>
                        <button className="btn-reset-danger" onClick={handlerReset}>
                            <BiX />
                        </button>
                        <div className="grid-2 gap wrap-descripcion box2"> 
                            <div>
                                <span>
                                    <h4>Nombre: </h4>
                                    <p>{ proveedorSolo.nombre }</p>
                                </span>

                                <span>
                                    <h4>Razon social: </h4>
                                    <p>{ proveedorSolo.razon_social }</p>
                                </span>

                                <span>
                                    <h4>Celular: </h4>
                                    <p>{ proveedorSolo.tel_movil }</p>
                                </span>

                                <span>
                                    <h4>Telefono: </h4>
                                    <p>{ proveedorSolo.telefono }</p>
                                </span>
                            </div>

                            <div>

                                <span>
                                    <h4>T. producto: </h4>
                                    <p>{ proveedorSolo.tipo_producto }</p>
                                </span>

                                <span>
                                    <h4>Documento: </h4>
                                    <p>{ proveedorSolo.documento }</p>
                                </span>

                                <span>
                                    <h4>Titular: </h4>
                                    <p>{ proveedorSolo.nombre_titular }</p>
                                </span>

                                <span>
                                    <h4>Email: </h4>
                                    <p>{ proveedorSolo.email }</p>
                                </span>                           
                            </div>
                            
                        </div>
                    </>
                )
                : (
                    <div style={{ height: "160px" }}>
                        <TextoRelleno texto="Seleciona un proveedor" heightAuto />
                    </div>
                )
            }
        </div>
        
    )
}
