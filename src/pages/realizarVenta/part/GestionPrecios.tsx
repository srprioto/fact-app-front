import { Checkbox2 } from "../../../components/forms/Checkbox2";
import { Input } from "../../../components/forms/Input"
import { RadioButton } from "../../../components/forms/RadioButton"

interface gestionPrecios {
    producto:any;
    handlerChangePrecio:Function;
    productoDetalles:any;
    descUnid:boolean;
    setDescUnid:Function;
}

export const GestionPrecios = ({ 
    producto, 
    handlerChangePrecio, 
    productoDetalles, 
    descUnid, 
    setDescUnid 
}:gestionPrecios) => {

    const strRadiobutton = () => { 

        let estructura_radiobutton:Array<any> = [];
        const prod:any = producto.productos;

        if (!(Object.keys(producto).length <= 0)) {

            estructura_radiobutton = [
                {
                    label: prod.precio_venta_1,
                    value: prod.precio_venta_1,
                },
                {
                    label: prod.precio_venta_2,
                    value: prod.precio_venta_2,
                },
                {
                    label: prod.precio_venta_3,
                    value: prod.precio_venta_3,
                }
            ]  

        }
        
        return estructura_radiobutton;
    }

    return (
        <div className="bb bb-neutro">
            <h3>Gestion de precios</h3>
            <div className="grid-1 gap">
                
                <div className="wrap-precios mt-15">

                    <div className="grid-3 gap center">
                        <p className="m-0 info">Precio por unidad</p>
                        <p className="m-0 info">Precio al por menor</p>
                        <p className="m-0 info">Precio al por mayor</p>
                    </div>

                    <RadioButton
                        // label="Precios"
                        grid="grid-3 gap10"
                        name="precio_venta"
                        values={strRadiobutton()}
                        onChange={handlerChangePrecio}
                        moneda
                    />
                </div>

                <div className="grid-2 gap mt-5">

                    <div className="grid-2 gap">

                        <div className="center">

                            <label htmlFor="descuento">
                                <p  className="mb-5">Incremento/Descuento</p>
                                {/* <h5>Selecciona un precio</h5> */}
                            </label>

                            <Input
                                // label="Cambiar precio final"
                                type="number"
                                name="descuento"
                                value={productoDetalles.descuento}
                                color={productoDetalles.descuento < 0 ? "danger-i" : ""}
                                onChange={handlerChangePrecio}
                                moneda
                            />

                            <h5 className="warning mt-5">Haz descuentos con una cantidad negativa</h5>

                        </div>

                        <div>
                            <p className="center info">{
                                descUnid
                                ? "Por unidad"
                                : "En bloque"
                            }</p>
                            <Checkbox2
                                name="por_unidad"
                                checked={descUnid}
                                handlerCheck={ () => setDescUnid(!descUnid) }
                            />
                        </div>

                    </div>                    

                    <span className="center">
                        <p className="info">Precio de venta</p>
                        <h1 className="info">S/. { productoDetalles.precio_parcial }</h1>
                    </span>

                </div>
            </div>
        </div>
    )
}
