export const InfoCliente = ({ cliente }:any) => {
    return (
        <div className="wrap-descripcion3">
            <h3>Informacion del cliente</h3>
            <div className="box-wrap-descripcion3 grid-2 gap-v">
                <span>
                    <p>Nombre del cliente: </p>
                    <h4>{ cliente.nombre }</h4>
                </span>

                <span>
                    <p>Documento: </p>
                    <h4>{ cliente.documento }</h4>
                </span>

                <span>
                    <p>Telefono: </p>
                    <h4>{ cliente.telefono }</h4>
                </span>

                <span>
                    <p>E-mail: </p>
                    <h4>{ cliente.email }</h4>
                </span>

                {
                    cliente.direccion
                    && (
                        <span>
                            <p>Direccion: </p>
                            <h4>{ cliente.direccion }</h4>
                        </span>
                    )
                }

            </div>                    
        </div>
    )
}
