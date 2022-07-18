export const InfoRespuestaSunat = ({ respuesta_sunat }:any) => {


    const classEstado = () => { 
        if (respuesta_sunat.estado === "ACEPTADO") {
            return "success-i"
        } else if (respuesta_sunat.estado === "OBSERVACION") {
            return "primary-i"
        } else if (respuesta_sunat.estado === "RECHAZADO") {
            return "warning-i"
        } else if (respuesta_sunat.estado === "Excepción") {
            return "secundary-i"
        } else if (respuesta_sunat.estado === "ERROR") {
            return "danger-i"
        }
    }


    const estado = () => { 
        if (respuesta_sunat.estado === "ACEPTADO") {
            return "Aceptado"
        } else if (respuesta_sunat.estado === "OBSERVACION") {
            return "Observado"
        } else if (respuesta_sunat.estado === "RECHAZADO") {
            return "Rechazado"
        } else if (respuesta_sunat.estado === "Excepción") {
            return "Excepción"
        } else if (respuesta_sunat.estado === "ERROR") {
            return "Error"
        }
    }


    return (
        <div className="box box-par">
            <div className="wrap-descripcion5 m-0">

                <h3>Respuesta de la Sunat</h3>

                <span className="grid-12 gap">
                    <p>Estado</p>
                    <h4 className={classEstado()}>{ estado() }</h4>
                </span>

                {
                    !!respuesta_sunat.descripcion
                    && (
                        <span className="grid-12 gap">
                            <p>Descripcion</p>
                            <h4>{ respuesta_sunat.descripcion }</h4>
                        </span>
                    )
                }
                
                {
                    !!respuesta_sunat.codErr
                    && (
                        <span className="grid-12 gap">
                            <p>Codigo de error</p>
                            <h4>{ respuesta_sunat.codErr }</h4>
                        </span>
                    )
                }
                {
                    !!respuesta_sunat.msgErr
                    && (
                        <span className="grid-12 gap">
                            <p>Mensaje de error</p>
                            <h4>{ respuesta_sunat.msgErr }</h4>
                        </span>
                    )
                }
                {
                    !!respuesta_sunat.nota
                    && (
                        <span className="grid-12 gap">
                            <p>Nota</p>
                            <h4>{ respuesta_sunat.nota }</h4>
                        </span>
                    )
                }
                
            </div>                 
        </div>
    )
}
