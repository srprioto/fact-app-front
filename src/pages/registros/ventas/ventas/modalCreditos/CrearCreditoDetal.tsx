import { useEffect, useState } from "react";
import { Checkbox2 } from "../../../../../components/forms/Checkbox2";
import { Input } from "../../../../../components/forms/Input";
import { Select2 } from "../../../../../components/forms/Select2";
import { infoCreditoDto, infoCredito } from "../../../../../resources/dtos/CreditoDto";
import { moneda } from "../../../../../resources/func/moneda";

interface crearCreditoDetal {
    venta:any;
    cantidadRestante:number;
    localId:number;
    setValidarCredito:Function;
    setUpdateCredito:Function;
}

export const CrearCreditoDetal = ({ 
    venta, 
    cantidadRestante, 
    localId, 
    setValidarCredito, 
    setUpdateCredito 
}:crearCreditoDetal) => {

    const [infoCredito, setInfoCredito] = useState<infoCredito>({ 
        ...infoCreditoDto,
        ventas: venta.id, 
        estado_producto: venta.estado_producto,
        mod_estado_prod: false,
        localId: localId
    });


    useEffect(() => {
        if (infoCredito.estado_producto !== venta.estado_producto) {
            infoCredito.mod_estado_prod = true;
        }
    }, [infoCredito.estado_producto])


    useEffect(() => {

        setUpdateCredito(infoCredito);

        if (
            (infoCredito.estado_producto !== venta.estado_producto) ||
            (infoCredito.cantidad_pagada > 0)
        ) {
            setValidarCredito(true);
        } else {
            setValidarCredito(false);
        }
    }, [infoCredito])
    
    

    const handlerOnChange = (e:any) => {
        if (e.target.name === "cantidad_pagada") {
            const cantidadPag:number = Number(e.target.value) > cantidadRestante 
            ? cantidadRestante 
            : Number(e.target.value);
            setInfoCredito({
                ...infoCredito,
                [e.target.name]: Number(cantidadPag)
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


    const precioOperacion = ():number => { 
        if (infoCredito.forma_pago === "tarjeta") {
            const cincoPort:number = Number(infoCredito.cantidad_pagada) * 0.05;
            return Number(infoCredito.cantidad_pagada) + cincoPort;
        } else {
            return infoCredito.cantidad_pagada;
        }
    }


    return (
        <>
            <div className="grid-4 gap mb-10">
                <div></div>
                <div className="flex-space">
                    <p className="center m-0">Cantidad restante:</p>
                    <h3 className="center m-0 warning-i">
                        S/. { moneda(
                            cantidadRestante - 
                            Number(infoCredito.cantidad_pagada)) 
                        }
                    </h3>
                </div>
                <Checkbox2
                    classname={
                        !infoCredito.estado_producto
                        ? "warning"
                        : ""
                    }
                    label={
                        infoCredito.estado_producto
                        ? "Producto entregado"
                        : "Producto sin entregar"
                    }
                    name="switchChangeFact"
                    checked={infoCredito.estado_producto}
                    handlerCheck={handlerStateCheck}
                />
            </div>

            {
                cantidadRestante > 0
                && (
                    <div className="grid-3 gap mb-10">
            
                        <div className="relative">
                            <Input
                                label={
                                    infoCredito.forma_pago === "tarjeta"
                                    ? "Cantidad pagada + 5%"
                                    : "Cantidad pagada"
                                }
                                colorLabel={
                                    infoCredito.forma_pago === "tarjeta"
                                    ? "warning"
                                    : ""
                                }
                                type="number"
                                name="cantidad_pagada"
                                value={infoCredito.cantidad_pagada}
                                onChange={handlerOnChange}
                                moneda
                                noMenos
                            />
                            {
                                infoCredito.forma_pago === "tarjeta"
                                && (
                                    <h5 className="warning center absolute w100">
                                        Pago por operacion: S/.
                                        {moneda(precioOperacion())}
                                    </h5>
                                )
                            }
                        </div>

                        <Input
                            label="Nota de operacion"
                            type="text"
                            name="nota"
                            value={infoCredito.nota}
                            onChange={handlerOnChange}
                        />

                        <Select2
                            label="Forma de pago"
                            name="forma_pago"
                            onChange={handlerOnChange}
                            value={infoCredito.forma_pago}
                        >
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjeta">Tarjeta</option>
                            <option value="pago_electronico">Pago Electronico</option> 
                            <option value="deposito">Deposito</option>
                        </Select2>
                    </div>
                )
            }
        </>
    )
}
