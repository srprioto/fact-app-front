import { BiX } from "react-icons/bi"
import { AddBtn } from "../../../components/btns/AddBtn"
import { MovimientoDetallesDto } from "../../../resources/dtos/MovimientoDetalles"

export const ListaProductosIngreso = ({ movimientoDetalles, itemPop, setModalAdd }:any) => {
    return (
        <div className="box box-lista-productos">
            <h4 className="desc-form m-0">
                {
                    movimientoDetalles.length > 0
                    ? "Lista de productos"
                    : "Añade un producto a la lista"
                }
            </h4>
            {
                movimientoDetalles.length > 0
                ? (
                    <>
                        
                        <table className="table2 mb-25 mt-5">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Proveedor</th>
                                    <th>Cantidad</th>
                                    <th>Precio unidad</th>
                                    <th>Precio acumulado</th>
                                    <th>Descripcion</th>
                                    <th className="transparent">...</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    movimientoDetalles.map((el:MovimientoDetallesDto, index:number) => { 
                                        return(
                                            <tr key={el.producto.nombre + el.proveedor.nombre}>
                                                <td>{ el.producto.nombre }</td>
                                                <td>{ el.proveedor.nombre }</td>
                                                <td>{ el.cantidad }</td>
                                                <td>S/. { el.precio_unidad }</td>
                                                <td>S/. { el.precio_parcial }</td>
                                                <td>{ el.descripcion }</td>
                                                <td>
                                                    <span className="wrap-icons danger center">
                                                        <BiX className="pointer" onClick={() => { itemPop(index) }} />
                                                    </span>
                                                </td>
                                            </tr>  
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </>
                ) : (
                    
                    <AddBtn 
                        handlerModal={setModalAdd}
                    />
                )
            }

        </div>
    )
}
