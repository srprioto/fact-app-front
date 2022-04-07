import { BiCaretDown } from "react-icons/bi";
import { zeroFill } from "../../../../resources/func/ceroFill"
import { IngresoDropdown } from "./IngresoDropdown";

export const IngresosItem = ({ ingreso, handlerVer }:any) => {
    
    return (

        <tr className="ingresos-item">
            <td className="info">{ zeroFill(ingreso.id, 8) }</td>
            <td>
                <div className="lista-ingreso-productos">
                    <BiCaretDown />
                    <ul className="box-lista-ingreso-productos">
                        {
                            ingreso.movimientoDetalles.map((e:any) => { 
                                return (
                                    <li key={e.id}>{e.productos.nombre}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </td>
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





