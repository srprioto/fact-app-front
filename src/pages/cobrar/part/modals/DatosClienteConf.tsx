export const DatosClienteConf = ({ venta }:any) => {

    return (

        <div className="grid-1">
            {
                venta.clientes
                ? <ClienteInfo venta={venta} />
                : <ClienteRapido venta={venta} />
            }            
        </div>        
    )
}


const ClienteInfo = ({ venta }:any) => { 
    return (
        <div className="grid-2 gap wrap-descripcion">
            <div>
                <span>
                    <h4>Nombre: </h4>
                    <p><strong>{ venta.clientes.nombre }</strong></p>
                </span>

                <span>
                    <h4>Direccion: </h4>
                    <p><strong>{ venta.clientes.direccion }</strong></p>
                </span>

                <span>
                    <h4>Documento: </h4>
                    <p><strong>{ venta.clientes.documento }</strong></p>
                </span>
            </div>

            <div>
                <span>
                    <h4>Email: </h4>
                    <p><strong>{ venta.clientes.email }</strong></p>
                </span>

                <span>
                    <h4>Telefono: </h4>
                    <p><strong>{ venta.clientes.telefono }</strong></p>
                </span>
            </div>
            
        </div>
    )
}

const ClienteRapido = ({ venta }:any) => { 
    return (
        <div className="wrap-descripcion">
            <span>
                <h4>Nombre de cliente rapido: </h4>
                <p><strong>{ venta.nombre_cliente }</strong></p>
            </span>
        </div>
    )
}