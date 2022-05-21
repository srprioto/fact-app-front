export const ObservacionesVenta = ({ observaciones }:any) => {
    return (
        observaciones
        ? (
            <div className="center">
                <h4 className="mb-10 warning">Observación: </h4>
                <p className="mb-10">{ observaciones }</p>
            </div>
        ) : <div></div>
    )
}
