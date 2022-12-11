import { moneda } from "../../../../resources/func/moneda";
import { ProductoInfo } from "../../../productos/otros/ProductoInfo";
import { IngresoDetalleDropD } from "./IngresoDetalleDropD";

export const ItemTablaListaIngresos = ({ 
    elemento, 
    classNoPrecios, 
    handlerCalcularPrecio,
    gastosAdicionales,
    totalProductos
}:any) => {

    const precios:any = {
        precioVenta1: Number(elemento.productos.precio_venta_1),
        precioVenta2: Number(elemento.productos.precio_venta_2),
        precioVenta3: Number(elemento.productos.precio_venta_3),
        precioCompra: Number(elemento.productos.precio_compra),
    };

    const compra:number = Number(elemento.productos.precio_compra);
    const precioUnidad:number = Number(elemento.precio_unidad);
    const adicionalesXUnidad:number = Number(gastosAdicionales / totalProductos);
    const costoRealProd:number = precioUnidad + adicionalesXUnidad;
    const precioDiferencia:number = costoRealProd - compra;

    const nombreProducto:string = elemento.productos.nombre + (elemento.productos.marca ? " - " + elemento.productos.marca + " - " : "") + (elemento.productos.talla ? elemento.productos.talla : "");

    return (
        <tr 
            className={classNoPrecios(precios, precioDiferencia)}
        >
            <td className={
                classNoPrecios(precios, precioDiferencia) === ""
                ? "info"
                : classNoPrecios(precios, precioDiferencia)
            }>{ nombreProducto }</td>
            <td>
                <ProductoInfo producto={elemento.productos} />
            </td>
            <td>{ elemento.cantidad }</td>
            <td>S/.{ moneda(elemento.precio_unidad) }</td>
            <td className={(
                classNoPrecios(precios, precioDiferencia) === ""
                ? "strong info"
                : "strong " +classNoPrecios(precios, precioDiferencia)
            )}>S/.{ moneda(elemento.precio_parcial) }</td>
            <td>{ elemento.proveedores && elemento.proveedores.nombre }</td>
            <td>{ elemento.descripcion }</td>
            
            <td>
                <IngresoDetalleDropD
                    el={elemento}
                    calcularPrecio={handlerCalcularPrecio}
                />
            </td>

        </tr>
    )
}
