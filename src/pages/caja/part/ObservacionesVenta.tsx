export const ObservacionesVenta = ({ observaciones }:any) => {
    return (
        observaciones
        && (
            <div className="grid-1 mb-15 bb bb-neutro center">
                <h4 className="mb-10 warning">Observación: </h4>
                <p className="mb-10">{ observaciones }</p>
            </div>
        )
    )
}
