import { moneda } from "../../../../resources/func/moneda"

export const FormasPago = ({ formasDePago }:any) => {

    return (
        <div className="box box-par m-0">
            <h3>Formas de pago</h3>
            <table className="table2">
                
                <thead>
                    <tr>
                        <th>Forma pago</th>
                        <th>Cantidad</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        formasDePago.map((e:any) => {
                            return (
                                <tr key={e.id}>
                                    <td>{ e.forma_pago }</td>
                                    <td className="success strong">S/. { moneda(e.precio_parcial) }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}

