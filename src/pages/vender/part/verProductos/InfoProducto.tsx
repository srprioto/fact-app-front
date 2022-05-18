export const InfoProducto = ({ producto }:any) => {

    return (
        <div className="wrap-info-producto">
            <h3>Informacion del producto</h3>
            <div className="wrap-descripcion grid-2 gap">
                <div>
                    <span>
                        <h4>Codigo: </h4>
                        <p>{producto.codigo}</p>
                    </span>

                    <span>
                        <h4>Producto: </h4>
                        <p>{producto.nombre}</p>
                    </span>

                    <span>
                        <h4>Descripcion: </h4>
                        <p>{producto.descripcion}</p>
                    </span>
                </div>

                <div>
                    <span>
                        <h4>Marca: </h4>
                        <p>{producto.marca}</p>
                    </span>

                    <span>
                        <h4>Color: </h4>
                        <p>{producto.color}</p>
                    </span>

                    <span>
                        <h4>Talla: </h4>
                        <p>{producto.talla}</p>
                    </span>
                </div>

            </div>
        </div>
    )
}
