import { TextoRelleno } from "../../../../components/TextoRelleno";

export const BoxProveedor = ({ proveedorSolo, loading }:any) => {

    const objExist = () => { 
        if (!(Object.keys(proveedorSolo).length) || !proveedorSolo || proveedorSolo === undefined) {
            return true
        } else {
            return false
        }
    }
    
    return (
        <div>
            { 
                !objExist()
                ? (
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
                                <h4>Documento: </h4>
                                <p>{ proveedorSolo.documento }</p>
                            </span>

                            <span>
                                <h4>Titular: </h4>
                                <p>{ proveedorSolo.nombre_titular }</p>
                            </span>

                            <span>
                                <h4>Direccion: </h4>
                                <p>{ proveedorSolo.direccion }</p>
                            </span>

                            <span>
                                <h4>Email: </h4>
                                <p>{ proveedorSolo.email }</p>
                            </span>                           
                        </div>
                        
                    </div>
                )
                : (
                    <div style={{ height: "160px" }}>
                        <TextoRelleno texto="Seleeciona un proveedor" heightAuto />
                    </div>
                )
            }
        </div>
        
    )
}
