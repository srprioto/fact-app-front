import { Checkbox3 } from "../../../../components/forms/Checkbox3"
import { Input } from "../../../../components/forms/Input"
import { moneda } from "../../../../resources/func/moneda"

interface pagosCreditoAdel {
    infoCredito:any
    setInfoCredito:Function;
    venta:any
    setVenta:Function;
}

export const PagosCreditoAdel = ({ 
    infoCredito, 
    setInfoCredito,
    venta,
    setVenta,
}:pagosCreditoAdel) => {

    const handlerOnChange = (e:any) => { 
        // setInfoCredito({
        //     ...infoCredito,
        //     [e.target.name]: e.target.value
        // })
        if (e.target.name === "cantidad_pagada") {            
            const total_pagado:number = Number(e.target.value) > Number(venta.total) 
            ? Number(venta.total) 
            : Number(e.target.value);
            setVenta({
                ...venta,
                totalPagado: total_pagado
            })
            setInfoCredito({
                ...infoCredito,
                cantidad_pagada: total_pagado
            })
        } else {
            setInfoCredito({
                ...infoCredito,
                [e.target.name]: e.target.value
            })
        }
    }

    const handlerStateCheck = (e:any) => { 
        setInfoCredito({
            ...infoCredito,
            estado_producto: !infoCredito.estado_producto
        })
    }

    const totalRestante = () => {
        const restante:number = Number(venta.total) - infoCredito.cantidad_pagada;
        if (infoCredito.cantidad_pagada > Number(venta.total)) {
            setInfoCredito({
                ...infoCredito,
                cantidad_pagada: Number(venta.total)
            })
            return Number(venta.total);
        } else if (restante <= 0) {
            return 0;
        } else {
            return restante;
        }
    }
    

    return (
        <div>

            <div className="grid-3 gap">
                <div></div>
                <div 
                    title="Monto restante para que la venta se cancele"
                    className="box-descripcion center"
                >
                    <p className="center">Pago pendiente:</p>
                    <h4 className={
                        "center " + 
                        (
                            totalRestante() > 0
                            ? "warning-i"
                            : totalRestante() < 0
                            ? "danger-i"
                            : "success-i"
                        )
                    }>S/. { moneda(totalRestante()) }</h4>
                </div>
            </div>

            <div className="grid-3 gap">
                
                <Checkbox3
                    title="
                        Alterna el tipo de operación.
                        Si el producto se entrega correctamente, la operación es un crédito.
                        Si el producto no se entrega, la operación sera un adelanto para reserva de producto.
                    "
                    className={
                        infoCredito.estado_producto
                        ? "info"
                        : "warning"
                    }
                    label={
                        infoCredito.estado_producto
                        ? "Entregar producto"
                        : "NO entregar producto"
                    }
                    name="estado_producto"
                    checked={infoCredito.estado_producto}
                    handlerCheck={handlerStateCheck}
                />
                
                <Input
                    title="Monto pagado por el cliente como parte del crédito o adelanto"
                    label="Cantidad pagada"
                    type="number"
                    name="cantidad_pagada"
                    value={venta.totalPagado}
                    onChange={handlerOnChange}
                    msgErr={
                        (venta.totalPagado <= 0 && !infoCredito.estado_producto)
                        ? "Requiere monto pagado"
                        : ""
                    }
                    moneda
                    noMenos
                />

                <Input
                    label={
                        infoCredito.estado_producto
                        ? "Descripcion del credito"
                        : "Descripcion del adelanto"
                    }
                    type="text"
                    name="observaciones"
                    value={infoCredito.observaciones}
                    onChange={handlerOnChange}
                    // msgErr={}
                />

         

            </div>
        </div>
    )   
}
