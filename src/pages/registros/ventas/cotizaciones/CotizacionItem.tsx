import { CotizDropdown } from "./CotizDropdown";

interface cotizacionItems {
    ventas:any;
    handlerVer:Function; 
    updateData:Function;
}

export const CotizacionItem = ({ ventas, handlerVer, updateData }:cotizacionItems) => {

    // const comprobante:any = ventas.comprobante ? ventas.comprobante : [];
    const codigoVenta:string = 
        ventas.serie + "-" + ventas.id
        // + ventas.codigo_venta

    return (
        <tr className="cotizacion-items">
            <td className={"secundary "}>{ codigoVenta }</td>
            {/* <td className={"success strong "}>S/. { moneda(ventas.total) }</td> */}
            <td>{ ventas.locales && ventas.locales.nombre }</td>
            <td>
                <CotizDropdown 
                    ventas={ventas} 
                    handlerVer={handlerVer} 
                    updateData={updateData} 
                />
            </td>
        </tr>
    )
}
