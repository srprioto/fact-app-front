import { tipoVenta } from "../../../resources/dtos/VentasDto";
import { fecha } from "../../../resources/func/fechas";
import { moneda } from "../../../resources/func/moneda";
import { ListaDetalleProductos } from "../../registros/Ingresos/part/ListaDetalleProductos";

interface regVentaDetalles {
    ventas:any;
}

export const RegVentaDetalles = ({ ventas }:regVentaDetalles) => {

    const esComprobante:boolean = ventas.tipo_venta === tipoVenta.boleta || ventas.tipo_venta === tipoVenta.factura;
    const esCredito:boolean = ventas.tipo_venta === tipoVenta.credito || ventas.tipo_venta === tipoVenta.adelanto;
    const comprobante:any = ventas.comprobante ? ventas.comprobante : [];
    const correlativo:number = comprobante[0] ? comprobante[0].correlativo : 0;
    const codigoVenta:string = 
        ventas.id + "-" +
        ventas.codigo_venta +
        (correlativo !== 0 ? "-" + correlativo : "");


    const classEstado = () => { 
        if (ventas.estado_venta === "listo") {
            return "success ";
        } else if (ventas.estado_venta === "enviado") {
            return "warning ";
        } else if (ventas.estado_venta === "rechazado") {
            return "danger ";
        } else if (ventas.estado_venta === "anulado") {
            return "secundary-i opacity ";
        } else if (ventas.estado_venta === "cotizacion") {
            return "secundary ";
        }
    }


    const anulado = () => { 
        if (ventas.estado_venta === "anulado") {
            return "opacity ";
        } else {
            return "";
        }
    }


    const tipoComprobante = () => {
        if (esComprobante) {
            return "info ";
        } else if (esCredito) {
            return "warning ";
        } else if (ventas.tipo_venta === tipoVenta.venta_rapida) {
            return "success ";
        }
    }

    return (
        <tr className="venta-items">
            <td className={"secundary " + anulado()}>{ codigoVenta }</td>
            <td className={"" + anulado()}>
                <ListaDetalleProductos detalles={ventas.ventaDetalles} />
            </td>
            <td className={"secundary capitalize " + anulado() + tipoComprobante()}>{ ventas.tipo_venta }</td>

            {
                !esCredito
                ? <td className={"success strong " + anulado()}>S/. { moneda(ventas.total) }</td>
                : <td className={"warning strong " + anulado()}>S/. { moneda(ventas.totalPagado) }</td>
            }
            
            <td className={ anulado() + " secundary capitalize" }>{ ventas.forma_pago }</td>
            <td className={ classEstado() + " capitalize strong" } >{ ventas.estado_venta }</td>
            <td className={ anulado() }>{ fecha(ventas.created_at) }</td>
            {/* <td>
                <DropDown>
                    <span onClick={ () => handlerVerProducto(e.id) }>
                        <BiShowAlt /> Ver Producto
                    </span>
                </DropDown>
            </td> */}
        </tr>
    )
}
