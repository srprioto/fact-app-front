import { Checkbox } from "../../../components/forms/Checkbox";

interface tablaListaVentaProductos { 
    venta:any;
    listaRechazados:any;
    handlerCheckbox:Function;
}

export const TablaListaVentaProductos = ({ venta, listaRechazados, handlerCheckbox }:tablaListaVentaProductos) => {
    return (
        <div className="lista-productos-pedido bb bb-neutro">
            <h3>Informacion de la venta</h3>
            <table className="table2">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cant.</th>
                        <th>Precio U.</th>
                        <th>Inc/Desc</th>
                        <th>Precio V.</th>
                        {/* <th className="transparent inlineblock">...</th> */}
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

                            let opacity:string = ""
                            if (listaRechazados.includes(e.id)) {
                                opacity = "opacity-line-table"
                            } else {
                                opacity = ""
                            }

                            return (
                                <tr key={index} className={opacity}>
                                    <td>{ e.productos.nombre }</td>
                                    <td><strong>{ e.cantidad_venta }</strong></td>
                                    <td>S/. { e.precio_venta }</td>
                                    <td className={cambioPrecio}>S/. { e.descuento }</td>
                                    <td className={cambioPrecio}>
                                        <strong>S/. { e.precio_parcial }</strong>
                                    </td>
                                    {/* <td>
                                        <Checkbox
                                            name={`estado_detalle`}
                                            value={e.id}
                                            onChange={handlerCheckbox}
                                            invertir
                                        />
                                    </td> */}
                                </tr>
                            )
                        })   
                    }
                </tbody>
            </table>   

        </div>
    )
}
