export const ProductoDetallesVenta = ({ producto }:any) => {
    return (
        <div className="bb bb-neutro">
            <h3>Informacion del producto</h3>
            <div className="wrap-descripcion">
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
