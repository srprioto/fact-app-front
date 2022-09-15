var Barcode = require('react-barcode');

export const ProdCodBarEjemplo = ({ producto, precio }:any) => {
    return (
        <div className="producto-barras center">
            <div className="wrap-barcode pt-10">
                { producto.nombre && <h4 className="m-0">{ producto.nombre } { producto.marca }</h4> }
                <div className={
                    "gap " + 
                    (precio ? "grid-3" : "grid-2")
                }>
                    {
                        precio
                        && (
                            producto.precio_venta_1 && <h5 className="m-0"><strong>S/. { producto.precio_venta_1 }</strong></h5>
                        )
                    }
                    { producto.color && <h5 className="m-0"><strong>{ producto.color }</strong></h5> }
                    { producto.talla && <h5 className="m-0"><strong>{ producto.talla }</strong></h5> }
                </div>
                <Barcode
                    value={producto.codigo}
                    background="transparent"
                    height={40}
                    lineColor="#72849a"
                />
            </div>
        </div>
    )
}
