import { NoRegistros } from "../../../components/NoRegistros"
import { Pagination2 } from "../../../components/paginacion/Pagination2"
import { ToolTip } from "../../../components/tooltip/ToolTip"
import { RegVentaDetalles } from "./RegVentaDetalles"


interface listaProductosUsuario { 
    data:any;
    getData:Function;
    paginacion:Function;
}

export const ListaProductosUsuario = ({ data, getData, paginacion }:listaProductosUsuario) => {


    return (
        <div className="box box-par lista-prod-usuarios m-0">

            {
                data.length <= 0
                ? <NoRegistros />
                : (
                    <table className="table">
                        <thead>
                            <tr>
                                <th id="txt-cod-venta-modal">Codigo venta</th>
                                <th></th>
                                <th>Tipo venta</th>
                                <th>Ingreso venta</th>
                                <th>Forma pago</th>
                                <th>Estado venta</th>
                                <th>Fecha venta</th>
                                <th className="transparent inlineblock">
                                    <ToolTip
                                        anchor="txt-cod-venta-modal"
                                        descripcion="El código de venta está formado por, el numero de venta general, numero de venta de caja y el correlativo, en caso de ser un comprobante"
                                    /> 
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((e:any, index:number) => {
                                    return (
                                        <RegVentaDetalles
                                            key={index}
                                            ventas={e}
                                        />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                )
            }

            <Pagination2 paginacion={paginacion} getData={getData} />

        </div>
    )
}
