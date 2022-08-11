export const InfoCliente = ({ cliente }:any) => {
    return (

        <div className="box box-par">
            <div className="wrap-descripcion5 m-0">

                <h3>Respuesta de la Sunat</h3>

                {
                    cliente.nombre
                    && <span className="grid-12 gap">
                        <p>Nombre del cliente: </p>
                        <h4>{ cliente.nombre }</h4>
                    </span>
                }

                {
                    cliente.razonSocial
                    && <span className="grid-12 gap">
                        <p>Razon social: </p>
                        <h4>{ cliente.razonSocial }</h4>
                    </span>
                }

                <span className="grid-12 gap">
                    <p>Documento: </p>
                    <h4>{ cliente.numero_documento }</h4>
                </span>

                {
                    cliente.telefono
                    && <span className="grid-12 gap">
                        <p>Telefono: </p>
                        <h4>{ cliente.telefono }</h4>
                    </span>
                }

                {
                    cliente.email
                    && <span className="grid-12 gap">
                        <p>E-mail: </p>
                        <h4>{ cliente.email }</h4>
                    </span>
                }

                {
                    cliente.direccion
                    && <span className="grid-12 gap">
                        <p>Direccion: </p>
                        <h4>{ cliente.direccion }</h4>
                    </span>
                }

                

            </div>                 
        </div>



    )
}


// <div className="wrap-descripcion3">
// <h3>Informacion del cliente</h3>
// <div className="box-wrap-descripcion3 grid-2 gap-v">
//     <span className="grid-12 gap">
//         <p>Nombre del cliente: </p>
//         <h4>{ cliente.nombre }</h4>
//     </span>

//     <span className="grid-12 gap">
//         <p>Razon social: </p>
//         <h4>{ cliente.razonSocial }</h4>
//     </span>

//     <span className="grid-12 gap">
//         <p>Documento: </p>
//         <h4>{ cliente.numero_documento }</h4>
//     </span>

//     <span className="grid-12 gap">
//         <p>Telefono: </p>
//         <h4>{ cliente.telefono }</h4>
//     </span>

//     <span className="grid-12 gap">
//         <p>E-mail: </p>
//         <h4>{ cliente.email }</h4>
//     </span>

//     <span className="grid-12 gap">
//         <p>Direccion: </p>
//         <h4>{ cliente.direccion }</h4>
//     </span>

// </div>                    
// </div>