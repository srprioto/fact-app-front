import { zeroFill } from "../../../../resources/func/ceroFill";
import { CajaDropDown } from "./CajaDropDown";

export const ItemCaja = ({ item, handlerVer }:any) => {

    return (
        <tr className="items-caja">
            <td className="">{ zeroFill(Number(item.id)) }</td>
            <td className={
                item.estado_caja
                ? "success-i"
                : "danger-i"
            }>{
                item.estado_caja
                ? "Abierto"
                : "Cerrado"
            }</td>
            <td className="info">S/. { item.monto_apertura }</td>
            <td className={
                "strong " +
                (item.cantidad_diferencia > 0
                ? "danger"
                : "success")
            }>S/. { item.monto_efectivo + item.monto_apertura + item.otros_montos }</td>
            <td>{ item.nota_observacion }</td>
            <td>{ item.created_at }</td>
            <td>
                <CajaDropDown item={item} handlerVer={handlerVer}/>
            </td>
        </tr>
    )
}





// estado_caja
// otros_montos
// cantidad_diferencia