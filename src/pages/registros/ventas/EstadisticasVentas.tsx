
import { CardsEstadisticas } from "./estadisticas/CardsEstadisticas";
import { VentasSemana } from "./estadisticas/VentasSemana";

export const EstadisticasVentas = () => {

    return (
        <div className="grid-1 gap">
            <CardsEstadisticas />
            <VentasSemana />
        </div>
    )
}
