import { zeroFill } from "../../../../resources/func/ceroFill"
import { IngresoDropdown } from "./IngresoDropdown";
import { ListaDetalleProductos } from "./ListaDetalleProductos";

export const IngresosItem = ({ ingreso, handlerVer }:any) => {
    
    return (

        <tr className="ingresos-item">
            <td className="info">{ zeroFill(ingreso.id, 8) }</td>
            <td><ListaDetalleProductos detalles={ingreso.movimientoDetalles} /></td>
            <td>{ ingreso.locales && ingreso.locales.nombre }</td>
            <td>{ ingreso.observaciones }</td>
            <td>
                <IngresoDropdown
                    ingreso={ingreso}
                    handlerVer={handlerVer}
                />
            </td>
        </tr>

    )
}





