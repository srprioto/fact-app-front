import { BiX } from "react-icons/bi";
import { TextoRelleno } from "../../../../components/TextoRelleno";

export const BoxProducto = ({ productoSolo, loading, handlerReset }:any) => {

    const objExist = (objeto:any) => { 
        if (!(Object.keys(objeto).length) || !objeto || objeto === undefined) {
            return true
        } else {
            return false
        }
    }
    

    return (
        <div className="relative">
            {
                !objExist(productoSolo)
                ? (
                    <>
                        <button className="btn-reset-danger" onClick={handlerReset}>
                            <BiX />
                        </button>
                        <div className="grid-2 gap wrap-descripcion box2"> 
                            <div>
                                <span>
                                    <h4>Nombre: </h4>
                                    <p>{ productoSolo.nombre }</p>
                                </span>
            
                                <span>
                                    <h4>Marca: </h4>
                                    <p>{ productoSolo.marca }</p>
                                </span>
            
                                <span>
                                    <h4>Talla: </h4>
                                    <p>{ productoSolo.talla }</p>
                                </span>
            
                                <span>
                                    <h4>Color: </h4>
                                    <p>{ productoSolo.color }</p>
                                </span>
                            </div>
            
                            <div>
                                <span>
                                    <h4>Codigo: </h4>
                                    <p>{ productoSolo.codigo }</p>
                                </span>
            
                                <span>
                                    <h4>P / unidad: </h4>
                                    <p>{ productoSolo.precio_venta_1 }</p>
                                </span>
            
                                <span>
                                    <h4>P / menor: </h4>
                                    <p>{ productoSolo.precio_venta_2 }</p>
                                </span>
            
                                <span>
                                    <h4>P / mayor: </h4>
                                    <p>{ productoSolo.precio_venta_3 }</p>
                                </span>
                            </div> 
                        </div>
                    </>
                ) : (
                    <div style={{ height: "160px" }}>
                        <TextoRelleno texto="Seleeciona un producto" heightAuto />
                    </div>
                )
            }

        </div>
    )
}


