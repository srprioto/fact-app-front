import { BiNote } from "react-icons/bi"

export const CodigoVenta = ({ codigVenta, observaciones }:any) => {
    return (
        <div className="codigo-venta-cobrar middle bb bb-neutro">
            <p className="m-0 pr-20">Codigo de venta: </p>
            <h1 className="info m-0">{ codigVenta }</h1>
            {
                observaciones
                && <div className="observaciones-cobrar">
                    <BiNote />
                    <div className="msj-obs-cobrar">
                        <div className="box-msj-obs-cobrar">
                            <h4 className="mb-10 warning">Observaciónes: </h4>
                            <p>{ observaciones }</p>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}
