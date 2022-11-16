import { TitleBox } from "../../../components/TitleBox"
import { CardsDatosTransf } from "../../registros/transacciones/part/CardsDatosTransf"
import { CardsEstadisticas } from "../../reportes/ventas/reporteGeneral/CardsEstadisticas"
import { VentasSemana } from "../../reportes/ventas/reporteGeneral/VentasSemana"

export const Dashboard = () => {
    return (
        <div className="dashboard grid-1 gap">
            
            <TitleBox titulo="Dashboard"/>

            <CardsEstadisticas />

            <CardsDatosTransf />

            <VentasSemana />

        </div>
    )
}
