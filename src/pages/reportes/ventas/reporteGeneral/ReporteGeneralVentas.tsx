import { CardsEstadisticas } from "./CardsEstadisticas"
import { VentasSemana } from "./VentasSemana"

export const ReporteGeneralVentas = () => {
    return (
        <div className="grid-1 gap">
            <CardsEstadisticas />
            <VentasSemana />
        </div>
    )
}
