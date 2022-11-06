import { BiTrash } from "react-icons/bi"
import { DropDown } from "../../../components/DropDown"
import { tipoMovimiento } from "../../../resources/dtos/Caja"
import { fecha } from "../../../resources/func/fechas"

interface cajaDetalles {
    cajaDetalles:any;
    handlerEliminar?:Function;
}

export const CajaDetalles = ({ cajaDetalles, handlerEliminar }:cajaDetalles) => {
    return (
        <div className="box">
                            
            <table className="table">

                <thead>
                    <tr>
                        <th>Descripcion</th>
                        <th>Monto</th>
                        <th>Tipo movimiento</th>
                        <th>Forma pago</th>
                        <th>Encargado</th>
                        <th>Fecha</th>
                        <th></th>
                    </tr>
                </thead>
                
                <tbody>
                    {
                        cajaDetalles.map((e:any) => {

                            let otrosMov:boolean = false;
                            let colorClass:string = "";

                            if (e.tipo_movimiento === tipoMovimiento.otrosMovimientos) {
                                colorClass = "warning";
                                otrosMov = true;
                            } else if (e.tipo_movimiento === tipoMovimiento.anulacion1) {
                                colorClass = "secundary-i opacity";
                            } else if (e.tipo_movimiento === tipoMovimiento.anulacion2) {
                                colorClass = "danger";
                            } else if (e.tipo_movimiento === tipoMovimiento.credito) {
                                colorClass = "success";
                            }

                            return (
                                <tr key={e.id}>
                                    <td>{ e.descripcion }</td>
                                    <td 
                                        className={"strong " +
                                            (e.monto_movimiento < 0
                                            ? "danger"
                                            : "success")
                                        }
                                    >S/. { e.monto_movimiento }</td>
                                    <td className={colorClass}>{ e.tipo_movimiento }</td>
                                    <td className={
                                        e.forma_pago === "efectivo"
                                        ? "secundary capitalize"
                                        : "info capitalize"
                                    }>{ e.forma_pago }</td>
                                    <td>{ e.usuario && e.usuario.nombre }</td>
                                    <td>{ fecha(e.created_at) }</td>
                                    {
                                        handlerEliminar
                                        && <td>
                                            {
                                                otrosMov
                                                && <DropDown>
                                                    <span onClick={ () => handlerEliminar(e.id) }>
                                                        <BiTrash />Eliminar
                                                    </span>
                                                </DropDown>
                                            }
                                            
                                        </td>
                                    }
                                    
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </div>
    )
}
