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
                        <th>Cant.</th>
                        <th>Precio U.</th>
                        <th>Inc/Desc</th>
                        <th>Precio Sv.</th>
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
                                    <td>{ e.productos.nombre }</td>
                                    <td><strong>{ e.cantidad_venta }</strong></td>
                                    <td className="info">S/. { moneda(e.precio_venta) }</td>
                                    <td className={
                                        Number(venta.descuento_total) < 0
                                        ? "danger"
                                        : Number(venta.descuento_total) === 0
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
