import { useRef } from "react";
import { BiPrinter } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ProductoBarras } from "../../../../components/barcode/ProductoBarras";
import { ProductoBarrasImp } from "../../../../components/barcode/ProductoBarrasImp";
import { DescProducto } from "./DescProducto";

export const GestionCodigo = ({ producto, noCreado }:any) => {

    const imprimir = useRef<any>(null);

    const handlerPrint = () => { 
        let ventimp:any = window.open(' ', 'popimpr');
        ventimp.document.write( imprimir.current.innerHTML );
        ventimp.document.close();
        ventimp.print( );
        ventimp.close();
    }
        
    return (
        <div className="wrap-gestion-codigo grid-1 gap mb-25">
            {
                !noCreado && <h2 className="center">Producto registrado correctamente</h2> 
            }
            <div className="grid-1 gap gestion-codigo">

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
                            <button className="btn btn-info" onClick={handlerPrint}>
                                <BiPrinter />
                                Imprimir Codigo
                            </button>
                        </div>
                    </div>

                </div>

                <DescProducto producto={producto} />
            </div>

            <div ref={imprimir} className="none">
                <ProductoBarrasImp
                    value={producto.codigo}
                    nombre={producto.nombre}
                    color={producto.color}
                    // marca={producto.marca}
                    talla={producto.talla}
                />
            </div>

        </div>
    )
}
