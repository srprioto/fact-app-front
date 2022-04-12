import { TitleBox } from "../../../components/TitleBox"
import { CardsDatosTransf } from "../../reportes/transacciones/part/CardsDatosTransf"
import { CardsEstadisticas } from "../../reportes/ventas/estadisticas/CardsEstadisticas"
import { VentasSemana } from "../../reportes/ventas/estadisticas/VentasSemana"

export const Dashboard = () => {
    return (
        <div className="dashboard">
            
            <TitleBox titulo="Dashboard"/>

            <CardsEstadisticas />

            <CardsDatosTransf />

            <VentasSemana />

        </div>
    )
}
