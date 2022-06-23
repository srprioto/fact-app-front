import { useEffect, useState } from "react";
import { Checkbox2 } from "../../../../components/forms/Checkbox2";
import { Input } from "../../../../components/forms/Input";
import { RadioButton } from "../../../../components/forms/RadioButton"
import { moneda } from "../../../../resources/func/moneda";
import { redondeo } from "../../../../resources/func/redondeo";

export const GestionPrecios = ({ 
    producto, 
    setVentaDetalle, 
    ventaDetalle, 
    handlerOnChange, 
    calcularStock,
    tipoDescuento, 
    setTipoDescuento
}:any) => {

    const [selectPrecio, setSelectPrecio] = useState<number>(0);

    const precios:Array<number> = [
        producto.precio_venta_1,
        producto.precio_venta_2,
        producto.precio_venta_3,
    ]


    useEffect(() => { // tambien se usa para añadir codigo y precio

        // cantidad negativa
        const cantidadStock:number = calcularStock();

        // precios
        let precioVenta:number = precios[selectPrecio];
        let precioSubventa:number = 0

        if (tipoDescuento) {
            // descuento a cada producto
            precioSubventa = (
                (Number(precioVenta) + 
                Number(ventaDetalle.descuento)) * 
                Number(ventaDetalle.cantidad_venta)
            )
        } else {
            // descuento a bloque de venta
            precioSubventa = ( 
                (Number(precioVenta) * 
                Number(ventaDetalle.cantidad_venta)) + 
                Number(ventaDetalle.descuento)
            )
        }

        setVentaDetalle({
            ...ventaDetalle,
            productosId: producto.id,
            codigo_producto: producto.codigo,
            nombre_producto: producto.nombre,
            precio_venta: precioVenta,
            precio_parcial: redondeo(precioSubventa),
            venta_negativa: cantidadStock <= 0 ? Number(cantidadStock) : 0
        })

    }, [
        producto, 
        selectPrecio,
        tipoDescuento,
        ventaDetalle.cantidad_venta, 
        ventaDetalle.descuento
    ])


    const handlerPrecio = (e:any) => setSelectPrecio(e.target.value);


    const strRadiobutton = () => { 
        let estructura_radiobutton:Array<any> = [];
        if (!(Object.keys(producto).length <= 0)) {
            estructura_radiobutton = [
                { label: moneda(precios[0]), value: redondeo(precios[0]) },
                { label: moneda(precios[1]), value: redondeo(precios[1]) },
                { label: moneda(precios[2]), value: redondeo(precios[2]) }
            ]
        }
        return estructura_radiobutton;
    }
   

    return (
        <div className="gestion-precios">
            <h3>Gestion de precios</h3>
            <div className="grid-1 gap">
                <div>
                    <div className="grid-3 gap center">
                        <p className="info mb-5">Precio por unidad</p>
                        <p className="info mb-5">Precio por menor</p>
                        <p className="info mb-5">Precio por mayor</p>
                    </div>

                    <RadioButton
                        grid="grid-3 gap"
                        name="precio_venta"
                        values={strRadiobutton()}
                        onChange={handlerPrecio}
                        checkValue={selectPrecio}
                        moneda
                    />
                </div>
                <div className="grid-3 gap">
                    
                    <Input
                        label="Incremento/Descuento"
                        type="number"
                        name="descuento"
                        value={ventaDetalle.descuento}
                        onChange={handlerOnChange}
                        color={ventaDetalle.descuento < 0 ? "danger-i" : ""}
                        moneda
                    />

                    <div>
                        <p className="center info">{
                            tipoDescuento
                            ? "Inc/desc por unidad"
                            : "Inc/desc en bloque"
                        }</p>
                        <Checkbox2
                            name="por_unidad"
                            checked={tipoDescuento}
                            handlerCheck={ () => setTipoDescuento(!tipoDescuento) }
                        />
                    </div>

                    <div className="center">
                        <p className="mb-10 info">Total Subventa</p>
                        <h2 className="m-0 success strong">S/. { moneda(ventaDetalle.precio_parcial) }</h2>
                    </div>

                </div>
            </div>
        </div>
    )
}
