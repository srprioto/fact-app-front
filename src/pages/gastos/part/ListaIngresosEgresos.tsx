import { BiPencil, BiTrash } from "react-icons/bi";
import { DropDown } from "../../../components/DropDown";
import { fecha } from "../../../resources/func/fechas";
import { moneda } from "../../../resources/func/moneda"


interface listaIngresosEgresos {
    data:any;
    handlerEditar:Function;
    handlerDeleted:Function;
}

export const ListaIngresosEgresos = ({ data, handlerEditar, handlerDeleted }:listaIngresosEgresos) => {

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Monto</th>
                    <th>Descripcion</th>
                    <th>Tipo</th>
                    <th>Local ligado</th>
                    <th>Usuario</th>
                    <th>Fecha movimiento</th>
                    <th></th>
                    {/* <th className="transparent inlineblock">...</th> */}
                </tr>
            </thead>
            
            <tbody>
                {
                    data.map((e:any) => {
                        return (
                            <tr key={e.id} className="item-ingreso-egreso">
                                <td className={
                                    e.monto > 0
                                    ? "strong success"
                                    : "strong danger"
                                }>S/. { moneda(e.monto) }</td>
                                <td>{ e.descripcion }</td>
                                <td className={
                                    e.tipo === "ingreso"
                                    ? "capitalize success"
                                    : "capitalize danger"
                                }>{ e.tipo }</td>
                                <td>{ e.locales ? e.locales.nombre : "No" }</td>
                                <td>{ e.usuarios ? e.usuarios.nombre : "No" }</td>
                                <td>{ fecha(e.updated_at) }</td>
                                <td>
                                    <DropDown>
                                        <span onClick={ () => handlerDeleted(e.id) }>
                                            <BiTrash />Eliminar
                                        </span>
                                        <span onClick={ () => handlerEditar(e) }>
                                            <BiPencil />Editar usuario
                                        </span>
                                    </DropDown>
                                </td>
                            </tr>
                        )
                    })   
                }
            </tbody>
        </table>
    )
}
