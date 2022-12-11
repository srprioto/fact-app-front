import { moneda } from "../../../../resources/func/moneda";
import { ProductoInfo } from "../../../productos/otros/ProductoInfo";
import { IngresoDetalleDropD } from "./IngresoDetalleDropD";
import { ItemTablaListaIngresos } from "./ItemTablaListaIngresos";

export const TablaListaIngresos = ({ 
    movimiento, 
    handlerCalcularPrecio,
    gastosAdicionales,
    totalProductos
}:any) => {

    const classNoPrecios = (precios:any, precioDiferencia:number) => {
        let classItem:string = "";
        if (
            precios.precioVenta1 === 0 || 
            precios.precioVenta2 === 0 || 
            precios.precioVenta3 === 0 || 
            precios.precioCompra === 0
        ) {
            classItem = "danger-i"
        } else if (precioDiferencia !== 0) {
            classItem = "warning-i"
        }
        return classItem
    }


    return (
        <div className="box m-0">
            <table className="table2">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th></th>
                        <th>Cantidad</th>
                        <th>Precio/unidad</th>
                        <th>Precio/paquete</th>
                        <th>Proveedor</th>
                        <th>Descripcion</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        movimiento.movimientoDetalles
                        && (
                            movimiento.movimientoDetalles.map((e:any) => {
                                return (
                                    <ItemTablaListaIngresos
                                        key={e.id} 
                                        elemento={e}
                                        classNoPrecios={classNoPrecios}
                                        handlerCalcularPrecio={handlerCalcularPrecio}
                                        gastosAdicionales={gastosAdicionales}
                                        totalProductos={totalProductos}
                                    />
                                )
                            })
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
