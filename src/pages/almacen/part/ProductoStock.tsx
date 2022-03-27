import { BiCaretDown } from "react-icons/bi";
import { BoxDropdown } from "./BoxDropdown";

// import { ProductosDto } from "../../../resources/dtos/ProductosDto";
// import { NRO_ALMACEN } from "../../../resources/nroLocal";
import { DetallesProd } from "./DetallesProd";


interface Producto { 
    elemento:any;
    handlerCantidad:Function;
}

export const ProductoStock = ({ 
    elemento, 
    // handlerDeleted, 
    // handlerMostrar, 
    handlerCantidad 
}:Producto) => {

    // let cantidadLocalStock:number|null;
    // let idLocalStock:number;

    // if (elemento.localesStock.length > 0 && elemento.localesStock !== undefined ) {
    //     cantidadLocalStock = elemento.localesStock[NRO_ALMACEN].cantidad
    //     idLocalStock = elemento.localesStock[NRO_ALMACEN].id
    // }else{
    //     cantidadLocalStock = null;
    //     idLocalStock = 0;
    // }

    return (
        <tr>
            <td>{ elemento.productos.codigo }</td>
            <td>{ elemento.productos.nombre }</td>
            <td className={
                    elemento.cantidad <= 10
                    ? elemento.cantidad === 0 || elemento.cantidad === null
                    ? "danger" 
                    : "warning"
                    : "success"
                }
            >
                {elemento.cantidad === null ? "---" : elemento.cantidad}
            </td>
            <td>
                <div className="wrap-detalles-prod">
                    <BiCaretDown />
                    <div className="detalles-prod">
                        <DetallesProd producto={elemento.productos} />
                    </div>
                </div>
                
            </td>
            {/* <td>{ elemento.productos.precio_compra }</td>
            <td>{ elemento.productos.precio_venta_1 } - { elemento.productos.precio_venta_2 } - { elemento.productos.precio_venta_3 }</td> */}
            <td>
                <BoxDropdown 
                    id={elemento.id}
                    nombreProducto={elemento.nombre}
                    idLocalStock={elemento.id}
                    cantLocalStock={elemento.cantidad}
                    // handlerDeleted={handlerDeleted}
                    // handlerMostrar={handlerMostrar}
                    handlerCantidad={handlerCantidad}
                />
            </td>
        </tr>
    )
};
