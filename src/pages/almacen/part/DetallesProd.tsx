import { ProductosDto } from "../../../resources/dtos/ProductosDto";

interface DetallesProducto {
    producto:ProductosDto;
}

export const DetallesProd = ({ producto }:DetallesProducto) => {

    return (

        <div className="producto grid-3 border-primary">

            <div>

                <h4 className="prod-cod">
                    <span>Codigo: </span>
                    <strong className="info">{ producto.codigo }</strong>
                </h4>
                

                <div className="prod-info">
                    
                    <h4 className="prod-desc-int">Descripcion</h4>
                    <p>{ producto.descripcion }</p>

                </div>
                
                
            </div>

            <div>

                <div className="prod-nombre">
                    <h3>{ producto.nombre }</h3>
                </div>
                
                <div className="prod-detalles grid-3 gap">
                    <div className="prod-det-int">
                        <h4>Marca</h4>
                        <p>{ producto.marca }</p>
                    </div>
                    <div className="prod-det-int">
                        <h4>Color</h4>
                        <p>{ producto.color }</p>
                    </div>
                    <div className="prod-det-int">
                        <h4>Talla</h4>
                        <p>{ producto.talla }</p>
                    </div>
                </div>
            </div>

            <div className="prod-prec">
                {/* <h4 className="primary">Compra: </h4><h4 className="primary"><strong>S/. { producto.precio_compra }</strong></h4> */}
                <h4 className="info">Venta 1: </h4><h4 className="info"><strong>S/. { producto.precio_venta_1 }</strong></h4>
                <h4 className="info">Venta 2: </h4><h4 className="info"><strong>S/. { producto.precio_venta_2 }</strong></h4>
                <h4 className="info">Venta 3: </h4><h4 className="info"><strong>S/. { producto.precio_venta_3 }</strong></h4>
            </div>
        </div>
    )
};

