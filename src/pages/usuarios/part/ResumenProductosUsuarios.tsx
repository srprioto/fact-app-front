import { Loading } from "../../../components/loads/Loading";

import { ChartResumenProductosUsuario } from '../../../components/charts/ChartResumenProductosUsuario';
import { ChartPieMontoTotalUsuario } from "../../../components/charts/ChartPieMontoTotalUsuario";


export const ResumenProductosUsuarios = ({ detalles, loading }:any) => {

    const data:any = detalles ? detalles.topProductosVendidos : [];

    return (

        loading
        ? <Loading />
        : <div className="resumen-productos-usuarios grid-1 gap">
            
            <div className="grid-2 gap">
                <div className="box box-par m-0 middle-down">
                    <div className="center">
                        <p>Monto total recaudado: </p>
                        <h2 className="success">S/. { detalles.totalDineroRecaudado }</h2>
                    </div>
                    <div className="center">
                        <p>Total de productos vendidos: </p>
                        <h1 className="success">{ detalles.totalProductosVendidos }</h1>
                    </div>
                </div>
                <div className="box box-par m-0">
                    <h4 className="mb-10 center strong">Productos mas vendidos</h4>
                    <ChartPieMontoTotalUsuario data={data} />
                </div>
            </div>

            <div className="box box-par grid-1 gap m-0">
                <h4 className="mb-10 center strong">Productos con mayor recaudación</h4>
                <ChartResumenProductosUsuario data={data} />
            </div>

        </div>
    )
}
