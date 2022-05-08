import { BiCaretDown } from "react-icons/bi"

export const ProductoInfo = ({ producto }:any) => {
    return (
        <div className="producto-dropdown-info-ingrso">
            <BiCaretDown />
            <div className="producto-ddbox-info-ingrso wrap-descripcion box">
                <div className="box-wrap-descripcion3">
                    <span>
                        <p>Nombre: </p>
                        <h4>{ producto.nombre }</h4>
                    </span>
                    <span>
                        <p>Codigo: </p>
                        <h4>{ producto.codigo }</h4>
                    </span>
                    <span>
                        <p>Marca: </p>
                        <h4>{ producto.marca }</h4>
                    </span>
                    <span>
                        <p>Color: </p>
                        <h4>{ producto.color }</h4>
                    </span>
                    <span>
                        <p>Talla: </p>
                        <h4>{ producto.talla }</h4>
                    </span>
                    <span>
                        <p>Precio compra: </p>
                        <h4>S/. { producto.precio_compra }</h4>
                    </span>
                    <span>
                        <p>Precio/unidad: </p>
                        <h4>S/. { producto.precio_venta_1 }</h4>
                    </span>
                    <span>
                        <p>Precio/menor: </p>
                        <h4>S/. { producto.precio_venta_2 }</h4>
                    </span>
                    <span>
                        <p>Precio/mayor: </p>
                        <h4>S/. { producto.precio_venta_3 }</h4>
                    </span>
                    <span>
                        <p>Descripcion: </p>
                        <h4>{ producto.descripcion }</h4>
                    </span>
                </div>                    
            </div>
        </div>
    )
}