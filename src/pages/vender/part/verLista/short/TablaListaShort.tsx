import { BiX } from "react-icons/bi";

export const TablaListaShort = ({ itemPop, listaVenta }:any) => {
    return (
        <div className="tabla-lista-venta mb-25">
            <table className="table3 no-cursor">
                <thead>
                    <tr>
                        <th>Prod.</th>
                        <th>Precio</th>
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
                                    <td className={"strong " + cambioPrecio}>S/. { e.precio_parcial }</td>
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
