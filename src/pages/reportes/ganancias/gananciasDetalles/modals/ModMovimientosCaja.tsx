import { NoRegistros } from "../../../../../components/NoRegistros"
import { moneda } from "../../../../../resources/func/moneda"

export const ModMovimientosCaja = ({ movimientosCajaDia, sumaMovimientosCaja }:any) => {
    return (
        movimientosCajaDia.length <= 0
        ? <div className="info-tabbs-ganancias-detalles"><NoRegistros /></div>
        : (
            <div className="info-tabbs-ganancias-detalles">
                <div className="grid-1 gap mb-10">
                    <span className="middle grid-2 gap10">
                        <p className="m-0">Total movimientos de caja: </p>
                        <h3 className={(
                            Number(sumaMovimientosCaja) > 0
                            ? "success m-0"
                            : "danger m-0"
                        )}>S/. { moneda(sumaMovimientosCaja) }</h3>
                    </span>
                </div>
                <table className="table2">
                    <thead>
                        <tr>
                            <th>Monto</th>
                            <th>Descripcion</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            movimientosCajaDia.map((e:any, index:number) => {
                                return (
                                    <tr className="items-caja" key={index}>
                                        <td className={(
                                            Number(e.monto_movimiento) > 0
                                            ? "strong success"
                                            : "strong danger"
                                        )}>S/. { moneda(e.monto_movimiento) }</td>
                                        <td>{ e.descripcion }</td>
                                        <td></td>
                                        {/* <td className="">{ e.ventas.id }</td> */}
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
