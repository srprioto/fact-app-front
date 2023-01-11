import { useRef, useState } from "react";
import { BiPrinter } from "react-icons/bi";
import { Input } from "../../../../components/forms/Input";
import { ProductoCodBarras } from "../../otros/ProductoCodBarras";
import { ProdCodBarEjemplo } from "../../otros/ProdCodBarEjemplo";
import { Checkbox2 } from "../../../../components/forms/Checkbox2";

// import { ProductoBarras } from "../../../../components/barcode/ProductoBarras";
// import { ProductoBarrasImp } from "../../../../components/barcode/ProductoBarrasImp";
// import { ProductoBarrasImp } from "../../../../components/barcode/ProductoBarrasImp";

export const GestionCodigo = ({ producto, noCreado }:any) => {

    const [totalBarras, setTotalBarras] = useState<number>(10);
    const [precio, setPrecio] = useState<boolean>(false);

    const imprimir = useRef<any>(null);

    const handlerPrint = () => { 
        let ventimp:any = window.open(' ', 'popimpr');
        if (ventimp) {
            ventimp.document.write( imprimir.current.innerHTML );
            ventimp.document.close();
            ventimp.print( );
            ventimp.close();    
        }
    }


    return (
        <div className="wrap-gestion-codigo grid-1 gap mb-25">
            { !noCreado && <h2 className="center">Producto registrado correctamente</h2> }
            <div className="grid-1 gap gestion-codigo">

                <div className="grid-1 gap mb-25">

                    <div className="grid-1">
                        <ProdCodBarEjemplo
                            producto={producto}
                            precio={precio}
                        />
                    </div>

                    <div className="grid-2 mb-25">
                        <Input
                            label="Cantidad de copias"
                            type="number"
                            name="totalBarras"
                            value={totalBarras}
                            onChange={(e:any) => { setTotalBarras(Number(e.target.value)) }}
                            moneda
                        />

                        <Checkbox2
                            label="Habilitar precio"
                            name="precio"
                            checked={precio}
                            handlerCheck={ () => setPrecio(!precio) }
                        />

                        
                    </div>
                    
                    <div className="middle">
                        <div>
                            <button className="btn btn-info" onClick={() => handlerPrint()}>
                                <BiPrinter />
                                Imprimir Codigo
                            </button>
                        </div>
                    </div>
                    
                    {/* <ProductoBarras
                        value={producto.codigo}
                        nombre={producto.nombre}
                        color={producto.color}
                        marca={producto.marca}
                        talla={producto.talla}
                    /> */}

                </div>
                {/* <DescProducto producto={producto} /> */}
            </div>

            <div 
                ref={imprimir} 
                className="none"
            >
                <ProductoCodBarras
                    producto={producto}
                    totalBarras={totalBarras}
                    precio={precio}
                />
            </div>

        </div>
    )
}
