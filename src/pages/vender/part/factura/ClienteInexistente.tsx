export const ClienteInexistente = ({ tipoDocumento }:any) => {

    const sunatURL:string = "https://e-consultaruc.sunat.gob.pe/cl-ti-itmrconsruc/FrameCriterioBusquedaWeb.jsp";

    return (
        <>
            {
                tipoDocumento === "DNI"
                && (
                    <div className="mb-25 center">
                        <p className="warning m-0">No se puede identificar al cliente</p>
                        <p className="warning m-0">Regístralo manualmente, pero recuerda solicitar su DNI</p>
                    </div>
                )
            }
            {
                tipoDocumento === "RUC"
                && (
                    <div className="mb-25 center">
                        <p className="warning m-0">No se puede identificar al cliente</p>
                        <p className="warning m-0">Regístralo manualmente, pero recuerda solicitar un documento para verificar sus datos, o <a href={sunatURL} target="_blank" rel="noreferrer">búscalo aquí</a></p>
                    </div>
                )
            }
        </>
    )
}
