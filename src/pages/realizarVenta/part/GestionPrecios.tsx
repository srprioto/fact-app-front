import { Input } from "../../../components/forms/Input"
import { RadioButton } from "../../../components/forms/RadioButton"

interface GestionPrecios {
    producto:any;
    handlerChangePrecio:Function;
    productoDetalles:any;
}

export const GestionPrecios = ({ producto, handlerChangePrecio, productoDetalles }:GestionPrecios) => {

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
            <div className="grid-2 gap mb-25">
                
                <div className="wrap-precios">
                    <RadioButton
                        label="Precios"
                        // grid="grid-3 gap10"
                        name="precio_venta"
                        values={strRadiobutton()}
                        onChange={handlerChangePrecio}
                        moneda
                    />
                </div>

                <div className="center">

                    <label htmlFor="descuento">
                        <p  className="mb-5">Incremento/Descuento</p>
                        <h5>Selecciona un precio</h5>
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

                    <h5 className="warning mt-5">Haz un descuento añadiendo una cantidad negativa</h5>

                </div>
            </div>
            <div className="grid-3 mt-15">
                <div></div>
                <span className="center">
                    <p className="info">Precio de venta</p>
                    <h1 className="info">S/. { productoDetalles.precio_parcial }</h1>
                </span>
                <div></div>    
            </div>
        </div>
    )
}
