import { Checkbox2 } from "../../../components/forms/Checkbox2"
import { Input } from "../../../components/forms/Input"
import { InputDisable } from "../../../components/forms/InputDisable"

interface gestionCantidades {
    productoCantidad:number;
    fornzarVenta:boolean;
    handlerForzVenta:Function;
    cantidad:number;
    cantidad_venta:number;
    handlerChangePrecio:Function;
}

interface boxGestionCantidades {
    cantidad:number;
    cantidad_venta:number;
    handlerChangePrecio:Function;
}


export const GestionCantidades = ({ 
    productoCantidad, 
    fornzarVenta, 
    handlerForzVenta, 
    cantidad,
    cantidad_venta,
    handlerChangePrecio
}:gestionCantidades) => {

    return (
        <div className="bb bb-neutro">
            <h3>Gestion de cantidades</h3>
            <div className="grid-2 gap">
                {
                    productoCantidad <= 0
                    ? (
                        !fornzarVenta
                        ? (
                            <>
                                <h4 className="danger mayus center m-0">No hay stock</h4>
                                <Checkbox2
                                    label="Forzar venta"
                                    name="forzar_venta"
                                    checked={fornzarVenta}
                                    handlerCheck={handlerForzVenta}
                                />
                            </>
                        ) : (
                            <BoxGestionCantidades
                                cantidad={cantidad}
                                cantidad_venta={cantidad_venta}
                                handlerChangePrecio={handlerChangePrecio}
                            />
                        )
                    )
                    : (
                        <BoxGestionCantidades
                            cantidad={cantidad}
                            cantidad_venta={cantidad_venta}
                            handlerChangePrecio={handlerChangePrecio}
                        />
                    )
                }
            </div>
        </div>
    )
}

const BoxGestionCantidades = ({ cantidad, cantidad_venta, handlerChangePrecio }:boxGestionCantidades) => {

    return (
        <>
            <div>
                <InputDisable
                    label="Cantidad en stock"
                    color={cantidad < 0 ? "danger-i" : ""}
                    value={cantidad}
                />
                {
                    cantidad < 0
                    ? <h5 className="danger center">No hay suficiente stock</h5>
                    : <h5 className="danger center transparent">.</h5>
                }
            </div>
            <Input
                label="Cantidad de venta"
                type="number"
                name="cantidad_venta"
                value={cantidad_venta}
                onChange={handlerChangePrecio}
                noMenos
            />
        </>
    )
}




