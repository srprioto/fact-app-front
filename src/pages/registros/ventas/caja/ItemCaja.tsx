import { zeroFill } from "../../../../resources/func/ceroFill";
import { fechaNoHora } from "../../../../resources/func/fechas";
import { moneda } from "../../../../resources/func/moneda";
import { CajaDropDown } from "./CajaDropDown";

export const ItemCaja = ({ item, handlerVer }:any) => {

    const montoEfectivo:number = Number(item.monto_efectivo);
    const montoApertura:number = Number(item.monto_apertura);
    const montoOtros:number = Number(item.otros_montos);

    return (
        <tr className="items-caja">

            <td className="">{ zeroFill(Number(item.id)) }</td>

            <td className={ item.estado_caja ? "success-i" : "danger-i" }>
                {
                    item.estado_caja ? "Abierto" : "Cerrado"
                }
            </td>

            <td className="info">S/. { moneda(montoApertura) }</td>

            <td className={
                "strong " +
                (Number(item.cantidad_diferencia) > 0
                ? "danger"
                : "primary")
            }>S/. { moneda(montoEfectivo + montoApertura + montoOtros) }</td>

            <td className="success strong">S/. { moneda(montoEfectivo + montoOtros) }</td>

            <td>{ fechaNoHora(item.created_at) }</td>

            <td><CajaDropDown item={item} handlerVer={handlerVer}/></td>
        </tr>
    )
}

