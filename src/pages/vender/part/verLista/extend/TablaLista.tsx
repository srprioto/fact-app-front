import { BiX } from "react-icons/bi";
import { moneda } from "../../../../../resources/func/moneda";

export const TablaLista = ({ listaVenta, itemPop }:any) => {

    return (
        <div className="tabla-lista-large mb-25">
            <table className="table3 no-cursor">
                <thead>
                    <tr>
                        {/* <th>Codigo</th> */}
                        <th>Producto</th>
                        <th>Marca</th>
                        <th>Talla</th>
                        <th>Cantidad</th>
                        <th>P. Unidad</th>
                        <th>Descuento</th>
                        <th>P. Subventa</th>
                        <th className="transparent inlineblock">...</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listaVenta.map((e:any, index:number) => {
                            let cambioPrecio:string = "info";
                            if (e.descuento < 0) {
                                cambioPrecio = "danger";
                            } else if (e.descuento > 0) {
                                cambioPrecio = "success";
                            }
                            return (
                                <tr key={index}>
                                    {/* <td className="strong">{ e.codigo_producto }</td> */}
                                    <td>{ e.nombre_producto }</td>
                                    <td>{ e.marca }</td>
                                    <td>{ e.talla }</td>
                                    <td className="strong">{ e.cantidad_venta }</td>
                                    <td className="strong primary">S/. { moneda(e.precio_venta) }</td>
                                    <td className={"strong " + cambioPrecio}>S/. { moneda(e.descuento) }</td>
                                    <td className={"strong " + cambioPrecio}>S/. { moneda(e.precio_parcial) }</td>

                                    <td>
                                        <span className="wrap-icons danger center">
                                            <BiX 
                                                className="pointer" 
                                                onClick={() => { itemPop(index) }} 
                                            />
                                        </span>
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
