import { ToolTip } from "../../../components/tooltip/ToolTip";
import { moneda } from "../../../resources/func/moneda";

interface tablaListaVentaProductos { 
    venta:any;
    // listaRechazados:any;
    // handlerCheckbox:Function;
}

export const TablaListaVentaProductos = ({ venta }:tablaListaVentaProductos) => {
    return (
        <div className="lista-productos-pedido bb bb-neutro">
            <h3>Informacion de la venta</h3>
            <table className="table2">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Talla</th>
                        <th id="txt-cant-un-cob">
                            Cant.
                            <ToolTip
                                anchor="txt-cant-un-cob"
                                descripcion="Cantidad de unidades vendidas"
                            />
                        </th>
                        <th id="txt-pre-unid-cob">
                            Precio U.
                            <ToolTip
                                anchor="txt-pre-unid-cob"
                                descripcion="Precio por unidad"
                            /> 
                        </th>
                        <th id="txt-inc-desc-cob">
                            Inc/Desc
                            <ToolTip
                                anchor="txt-inc-desc-cob"
                                descripcion="Incremento o descuento en la subventa"
                            />
                        </th>
                        <th id="txt-pres-sub-cob">
                            Precio Sv.
                            <ToolTip
                                anchor="txt-pres-sub-cob"
                                descripcion="Incremento o descuento en la subventa"
                            /> 
                        </th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        venta.ventaDetalles.map((e:any, index:number) => {

                            let cambioPrecio:string = "info";
                            if (e.descuento < 0) {
                                cambioPrecio = "danger";
                            } else if (e.descuento > 0) {
                                cambioPrecio = "success";
                            }

                            return (
                                <tr key={index}>
                                    <td className="nombre-prod-perdido">{ e.productos.nombre }</td>
                                    <td>{ e.productos.marca }</td>
                                    <td>{ e.productos.talla }</td>
                                    <td><strong>{ e.cantidad_venta }</strong></td>
                                    <td className="info">S/. { moneda(e.precio_venta) }</td>
                                    <td className={
                                        Number(e.descuento) < 0
                                        ? "danger"
                                        : Number(e.descuento) === 0
                                        ? "secundary"
                                        : "success"
                                    }>S/. { moneda(e.descuento) }</td>
                                    <td className={cambioPrecio}>
                                        <strong>S/. { moneda(e.precio_parcial) }</strong>
                                    </td>
                                </tr>
                            )
                        })   
                    }
                </tbody>
            </table>   

        </div>
    )
}
