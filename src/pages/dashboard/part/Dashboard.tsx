import { TitleBox } from "../../../components/TitleBox"
import { CardsDatosTransf } from "../../registros/transacciones/part/CardsDatosTransf"
import { CardsEstadisticas } from "../../registros/ventas/estadisticas/CardsEstadisticas"
import { VentasSemana } from "../../registros/ventas/estadisticas/VentasSemana"

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
