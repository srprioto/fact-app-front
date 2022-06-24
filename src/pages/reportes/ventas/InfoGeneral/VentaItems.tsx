// import { ListaDetalleProductos } from "../../Ingresos/part/ListaDetalleProductos"
import { moneda } from "../../../../resources/func/moneda"
import { VentasDropdown } from "./VentasDropdown"

export const VentaItems = ({ ventas, handlerVer, updateData }:any) => {

    const classEstado = () => { 
        if (ventas.estado_venta === "listo") {
            return "success"
        } else if (ventas.estado_venta === "enviado") {
            return "warning"
        } else if (ventas.estado_venta === "rechazado") {
            return "danger"
        }
    }

    
    return (
        <tr className="venta-items">
            <td className="secundary">{ ventas.id + "-" + ventas.codigo_venta }</td>
            {/* <td><ListaDetalleProductos detalles={ventas.movimientoDetalles} /></td> */}
            <td className="success strong">S/. { moneda(ventas.total) }</td>
            <td className={ classEstado() } >{ ventas.estado_venta }</td>
            <td>{ ventas.locales && ventas.locales.nombre }</td>
            <td>{ ventas.observaciones }</td>
            <td>
                <VentasDropdown ventas={ventas} handlerVer={handlerVer} updateData={updateData} />
            </td>
        </tr>
    )
}
