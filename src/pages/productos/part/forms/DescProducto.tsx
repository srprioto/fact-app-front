export const DescProducto = ({ producto }:any) => {
    return (
        <div className="descripcion-producto">

            <div className="grid-2 gap wrap-descripcion2 box2"> 
                <div className="">
                    <span>
                        <h4>Nombre: </h4>
                        <p>{ producto.nombre }</p>
                    </span>

                    <span>
                        <h4>Marca: </h4>
                        <p>{ producto.marca }</p>
                    </span>

                    <span>
                        <h4>Talla: </h4>
                        <p>{ producto.talla }</p>
                    </span>

                    <span>
                        <h4>Color: </h4>
                        <p>{ producto.color }</p>
                    </span>
                </div>

                <div className="">
                    <span>
                        <h4>Codigo: </h4>
                        <p>{ producto.codigo }</p>
                    </span>

                    <span>
                        <h4>P / unidad: </h4>
                        <p>{ producto.precio_venta_1 }</p>
                    </span>

                    <span>
                        <h4>P / menor: </h4>
                        <p>{ producto.precio_venta_2 }</p>
                    </span>

                    <span>
                        <h4>P / mayor: </h4>
                        <p>{ producto.precio_venta_3 }</p>
                    </span>
                </div> 
            </div>

        </div>
    )
}
