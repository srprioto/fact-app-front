import { Checkbox3 } from "../../../../components/forms/Checkbox3"
import { Input } from "../../../../components/forms/Input"
import { moneda } from "../../../../resources/func/moneda"

interface pagosCreditoAdel {
    infoCredito:any
    setInfoCredito:Function;
    venta:any
}

export const PagosCreditoAdel = ({ infoCredito, setInfoCredito, venta }:pagosCreditoAdel) => {

    const handlerOnChange = (e:any) => { 
        setInfoCredito({
            ...infoCredito,
            [e.target.name]: e.target.value
        })
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
                <div className="box-descripcion center">
                    <p className="center">Por pagar:</p>
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

            <div className="box-credito-anticipo">
                <div></div>
                <div className="grid-1 gap">
                    <div className="grid-2 gap10">
                        
                        <Checkbox3
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
                            name="checkEntregarProd"
                            checked={infoCredito.estado_producto}
                            handlerCheck={handlerStateCheck}
                        />
                        <Input
                            label="Cantidad pagada"
                            type="number"
                            name="cantidad_pagada"
                            value={
                                (Number(venta.total) - infoCredito.cantidad_pagada) > Number(venta.total)
                                ? Number(venta.total)
                                : infoCredito.cantidad_pagada
                            }
                            onChange={handlerOnChange}
                            msgErr={
                                (infoCredito.cantidad_pagada <= 0 && !infoCredito.estado_producto)
                                ? "Requiere monto pagado"
                                : ""
                            }
                            moneda
                            noMenos
                        />
                    </div>

                </div>
            </div>

        </div>
    )   
}
