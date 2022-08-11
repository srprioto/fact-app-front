// import { ListaDetalleProductos } from "../../Ingresos/part/ListaDetalleProductos"
import { moneda } from "../../../../resources/func/moneda"
import { VentasDropdown } from "./VentasDropdown"

interface ventaItems {
    ventas:any;
    handlerVer:Function; 
    updateData:Function;
    handlerAnular:Function;
}

export const VentaItems = ({ ventas, handlerVer, updateData, handlerAnular }:ventaItems) => {

    const comprobante:any = ventas.comprobante ? ventas.comprobante : [];
    const correlativo:number = comprobante[0] ? comprobante[0].id : 0;
    const codigoVenta:string = 
        ventas.serie + "-" + 
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
            return "danger ";
        }
    }

    const anulado = () => { 
        if (ventas.estado_venta === "anulado") {
            return "opacity";
        } else {
            return "";
        }
    }

    const tipoComprobante = () => { 
        if (ventas.serie === "B001") {
            return "Boleta";
        } else if (ventas.serie === "F001") {
            return "Factura";
        } else if (ventas.serie === "V001") {
            return "Venta rapida";
        }
    }

    
    return (
        <tr className="venta-items">
            <td className={"secundary " + anulado()}>{ codigoVenta }</td>
            <td className={"secundary " + anulado()}>{ tipoComprobante() }</td>
            <td className={"success strong " + anulado()}>S/. { moneda(ventas.total) }</td>
            <td className={ classEstado() + anulado() } >{ ventas.estado_venta }</td>
            <td className={ anulado() }>{ ventas.locales && ventas.locales.nombre }</td>
            <td>
                <VentasDropdown 
                    ventas={ventas} 
                    handlerVer={handlerVer} 
                    updateData={updateData} 
                    handlerAnular={handlerAnular}
                />
            </td>
        </tr>
    )
}
