import { BiPrinter } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ProductoBarras } from "../../../../components/barcode/ProductoBarras";
import { DescProducto } from "./DescProducto";

export const GestionCodigo = ({ producto }:any) => {
        
    return (
        <div className="wrap-gestion-codigo grid-1 gap">
            <h2 className="center">Producto registrado correctamente</h2>

            <div className="grid-1 gap gestion-codigo">

                <DescProducto producto={producto} />

                {/* <h3 className="center">Codigo de barras</h3> */}
                <div className="grid-2">

                    <ProductoBarras 
                        value={producto.codigo}
                        nombre={producto.nombre}
                        color={producto.color}
                        marca={producto.marca}
                        talla={producto.talla}
                    />
                    <div className="middle">
                        <div>
                            <button className="btn btn-info">
                                <BiPrinter />
                                Imprimir Codigo
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            {/* <div className="grid-4 gap mt-25">

                <div></div>

                <Link to="" className="btn btn-info">
                    Crear un producto
                </Link>

                <Link to="" className="btn btn-info">
                    
                </Link>
                
                <div></div>

            </div> */}

        </div>
    )
}
