import { useEffect, useState } from "react";
import { Checkbox2 } from "../../../components/forms/Checkbox2";
import { Input } from "../../../components/forms/Input"
import { RadioButton } from "../../../components/forms/RadioButton"

interface gestionPrecios {
    producto:any;
    handlerChangePrecio:Function;
    productoDetalles:any;
    descUnid:boolean;
    setDescUnid:Function;
    checkValue:any;
}

export const GestionPrecios = ({ 
    producto, 
    handlerChangePrecio, 
    productoDetalles, 
    descUnid, 
    checkValue,
    setDescUnid 
}:gestionPrecios) => {

    // const [precios, setPrecios] = useState<Array<any>>([
    //     {
    //         label: producto.productos.precio_venta_1,
    //         value: producto.productos.precio_venta_1,
    //         // checked: true
    //     },
    //     {
    //         label: producto.productos.precio_venta_2,
    //         value: producto.productos.precio_venta_2,
    //     },
    //     {
    //         label: producto.productos.precio_venta_3,
    //         value: producto.productos.precio_venta_3,
    //     }
    // ])

    

    // precios.map((e:any) => { 
    //     console.log(e);            
    //     // return (

    //     // )
    // })
    

    const strRadiobutton = () => { 

        let estructura_radiobutton:Array<any> = [];

        if (!(Object.keys(producto).length <= 0)) {

            estructura_radiobutton = [
                {
                    label: producto.productos.precio_venta_1,
                    value: producto.productos.precio_venta_1
                },
                {
                    label: producto.productos.precio_venta_2,
                    value: producto.productos.precio_venta_2
                },
                {
                    label: producto.productos.precio_venta_3,
                    value: producto.productos.precio_venta_3
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
                        checkValue={checkValue}
                        moneda
                    />
                </div>

                <div className="grid-3 gap mt-5">

                    <div className="center">

                        <Input
                            label="Incremento/Descuento"
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
                            ? "Inc/desc por unidad"
                            : "Inc/desc en bloque"
                        }</p>
                        <Checkbox2
                            name="por_unidad"
                            checked={descUnid}
                            handlerCheck={ () => setDescUnid(!descUnid) }
                        />
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
