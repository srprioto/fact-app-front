import { NoRegistros } from "../../../../../components/NoRegistros";
import { moneda } from "../../../../../resources/func/moneda";

export const ModIngresosEgresos = ({ ingresosEgresosDia, sumaIngresosEgresos }:any) => {
    return (
        ingresosEgresosDia.length <= 0
        ? <div className="info-tabbs-ganancias-detalles"><NoRegistros /></div>
        : (
            <div className="info-tabbs-ganancias-detalles">
                <div className="grid-1 gap mb-10">
                    <span className="middle grid-2 gap10">
                        <p className="m-0">Total ingresos egresos: </p>
                        <h3 className={(
                            Number(sumaIngresosEgresos) > 0
                            ? "success m-0"
                            : "danger m-0"
                        )}>S/. { moneda(sumaIngresosEgresos) }</h3>
                    </span>
                </div>
                <table className="table2">
                    <thead>
                        <tr>
                            <th>Monto</th>
                            <th>Descripcion</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            ingresosEgresosDia.map((e:any, index:number) => {
                                return (
                                    <tr className="items-caja" key={index}>
                                        <td className={(
                                            Number(e.monto) > 0
                                            ? "success strong"
                                            : "danger strong"
                                        )}>S/. { moneda(e.monto) }</td>
                                        <td>{ e.descripcion }</td>
                                        <td className="capitalize strong">{ e.tipo }</td>
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
