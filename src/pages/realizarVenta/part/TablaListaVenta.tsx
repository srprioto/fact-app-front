import { BiX } from "react-icons/bi";

interface TablaListaVenta {
    listaVenta:any;
    itemPop:Function;
}

export const TablaListaVenta = ({ listaVenta, itemPop }:TablaListaVenta) => {
  return (
    <div className="tabla-lista-venta">
        <table className="table2">
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cant.</th>
                    <th>Precio V.</th>
                    <th>Inc/Desc</th>
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
                                <td>{ e.nombre_producto }</td>
                                <td><strong>{ e.cantidad_venta }</strong></td>
                                {/* <td>S/. { e.precio_venta }</td> */}
                                <td className={cambioPrecio}><strong>S/. { e.precio_parcial }</strong></td>
                                <td className={cambioPrecio}>S/. { e.descuento }</td>
                                <td>
                                    <span className="wrap-icons danger center">
                                        <BiX className="pointer" onClick={() => { itemPop(index) }} />
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
