import { moneda } from "../../../../resources/func/moneda";

interface tablaProdVenta {
    venta:any;
}

export const TablaProdVenta = ({ venta }:tablaProdVenta) => {

    return (
        <div className="mb-15">
            <table className="table2 no-hover">
                
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio G.</th>
                        <th>IGV</th>
                        <th>Precio U.</th>
                        <th>Cant.</th>
                        <th>Precio V.</th>
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
                                    <td>
                                        { e.productos.nombre + " - " + e.productos.marca + " - " + e.productos.talla }
                                    </td>
                                    <td><strong>S/. { moneda(e.precio_gravada) }</strong></td>
                                    <td>S/. { moneda(e.igv) }</td>
                                    <td><strong>S/. { moneda(e.precio_venta) }</strong></td>
                                    <td><strong>{ e.cantidad_venta }</strong></td>
                                    <td className={cambioPrecio}><strong>S/. { moneda(e.precio_parcial) }</strong></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>  
        </div>
    )
}
