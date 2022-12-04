import { NoRegistros } from "../../../../../components/NoRegistros";
import { moneda } from "../../../../../resources/func/moneda";

export const ModIngresosVentas = ({ 
    ingresosVentasDia, 
    sumaCostosVentas,
    sumaIngresosVentas,
    sumaGananciasVentas 
}:any) => {
    return (
        ingresosVentasDia.length <= 0
        ? <div className="info-tabbs-ganancias-detalles"><NoRegistros /></div>
        : (
            <div className="info-tabbs-ganancias-detalles">
                <div className="grid-3 gap mb-10">
                    <span className="middle grid-2 gap10">
                        <p className="m-0">Ganancias del dia: </p>
                        <h3 className={(
                            Number(sumaCostosVentas) > 0
                            ? "success m-0"
                            : "danger m-0"
                        )}>S/. { moneda(sumaGananciasVentas) }</h3>
                    </span>
                    <span className="middle grid-2 gap10">
                        <p className="m-0">Ingresos del dia: </p>
                        <h3 className="m-0">S/. { moneda(sumaIngresosVentas) }</h3>
                    </span>
                    <span className="middle grid-2 gap10">
                        <p className="m-0">Costos del dia: </p>
                        <h3 className="m-0">S/. { moneda(sumaCostosVentas) }</h3>
                    </span>
                </div>
                <table className="table2">
                    <thead>
                        <tr>
                            <th>Ganancias</th>
                            <th>Ingresos</th>
                            <th>Costos</th>
                            <th>Codigo de venta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ingresosVentasDia.map((e:any, index:number) => {
                                return (
                                    <tr className="items-caja" key={index}>
                                        <td className="strong success">S/. { moneda(e.ganancia) }</td>
                                        <td>S/. { moneda(e.ingreso) }</td>
                                        <td>S/. { moneda(e.costo) }</td>
                                        <td className="strong secundary">{ e.ventas.id + "-" + e.ventas.codigo_venta }</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    )
}




