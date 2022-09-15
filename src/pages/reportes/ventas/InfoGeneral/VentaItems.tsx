// import { ListaDetalleProductos } from "../../Ingresos/part/ListaDetalleProductos"
import { fecha } from "../../../../resources/func/fechas";
import { moneda } from "../../../../resources/func/moneda"
import { VentasDropdown } from "./VentasDropdown"

interface ventaItems {
    ventas:any;
    handlerVer:Function; 
    updateData:Function;
    handlerAnular:Function;
    handlerReimprimir:Function;
}

export const VentaItems = ({ ventas, handlerVer, updateData, handlerAnular, handlerReimprimir }:ventaItems) => {

    const comprobante:any = ventas.comprobante ? ventas.comprobante : [];
    const correlativo:number = comprobante[0] ? comprobante[0].correlativo : 0;
    const codigoVenta:string = 
        // ventas.serie + "-" + 
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
        } else if (ventas.estado_venta === "cotizacion") {
            return "secundary ";
        }
    }

    const anulado = () => { 
        if (ventas.estado_venta === "anulado") {
            return "opacity";
        } else {
            return "";
        }
    }

    // const tipoComprobante = () => {
    //     if (ventas.serie === "B003") {
    //         return "Boleta";
    //     } else if (ventas.serie === "F003") {
    //         return "Factura";
    //     } else if (ventas.serie === "V001") {
    //         return "Venta rapida";
    //     }
    // }
    
    
    return (
        <tr className="venta-items">
            <td className={"secundary " + anulado()}>{ codigoVenta }</td>
            <td className={"secundary capitalize " + anulado()}>{ ventas.tipo_venta }</td>
            {/* <td className={"secundary capitalize " + anulado()}>{ 
                ventas.tipo_venta === "venta_rapida" 
                ? "Venta rapida" 
                : ventas.tipo_venta
            }</td> */}
            <td className={"success strong " + anulado()}>S/. { moneda(ventas.total) }</td>
            <td className={ classEstado() + " capitalize strong" } >{ ventas.estado_venta }</td>
            <td>{ fecha(ventas.created_at) }</td>
            <td className={ anulado() }>{ ventas.locales && ventas.locales.nombre }</td>
            <td>
                <VentasDropdown 
                    ventas={ventas} 
                    handlerVer={handlerVer} 
                    updateData={updateData} 
                    handlerAnular={handlerAnular}
                    handlerReimprimir={handlerReimprimir}
                />
            </td>
        </tr>
    )
}
