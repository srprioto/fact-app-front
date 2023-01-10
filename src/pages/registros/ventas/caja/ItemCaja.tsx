import { zeroFill } from "../../../../resources/func/ceroFill";
import { fechaNoHora } from "../../../../resources/func/fechas";
import { moneda } from "../../../../resources/func/moneda";
import { CajaDropDown } from "./CajaDropDown";

export const ItemCaja = ({ item, handlerVer }:any) => {

    const montoEfectivo:number = Number(item.monto_efectivo);
    const montoApertura:number = Number(item.monto_apertura);
    // const montoOtros:number = Number(item.otros_montos);

    return (
        <tr className="items-caja">

            {/* Codigo caja */}
            <td className="">{ zeroFill(Number(item.id)) }</td>

            {/* Estado caja */}
            <td className={ item.estado_caja ? "success-i" : "danger-i" }>
                { item.estado_caja ? "Abierto" : "Cerrado" }
            </td>

            {/* Monto apertura */}
            {/* <td className="secundary">S/. { moneda(montoApertura) }</td> */}

            {/* Monto recaudado */}
            <td className={
                "strong " +
                (Number(item.cantidad_diferencia) > 0
                ? "danger"
                : "info")
            }>
                {
                    item.estado_caja
                    ? "---"
                    : <> S/. { moneda(montoEfectivo) } </>
                }
            </td>

            {/* Monto total en caja */}
            <td className="success strong">
                {
                    item.estado_caja
                    ? "---"
                    : <> S/. { moneda(montoEfectivo + montoApertura) } </>
                }
            </td>

            {/* Fecha */}
            <td>{ fechaNoHora(item.created_at) }</td>

            <td>
                {
                    !item.estado_caja
                    && <CajaDropDown item={item} handlerVer={handlerVer}/>
                }
            </td>
            
        </tr>
    )
}






