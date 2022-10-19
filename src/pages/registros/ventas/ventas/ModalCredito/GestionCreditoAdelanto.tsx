import { useEffect, useState } from "react"
import { BiCheck, BiLayerPlus } from "react-icons/bi";
import { BtnOnOff2 } from "../../../../../components/btns/BtnOnOff2";
import { Checkbox2 } from "../../../../../components/forms/Checkbox2";
import { Input } from "../../../../../components/forms/Input";
import { Select2 } from "../../../../../components/forms/Select2";
import { infoCreditoDto, infoCredito } from "../../../../../resources/dtos/CreditoDto";
import { post } from "../../../../../resources/fetch";
import { moneda } from "../../../../../resources/func/moneda";
import { CREDITO_DETALLES } from "../../../../../resources/routes";

interface gestionCreditoAdelanto {
    venta:any;
    getDataOne:Function;
    getData:Function;
}

export const GestionCreditoAdelanto = ({ venta, getDataOne, getData }:gestionCreditoAdelanto) => {
    
    const [tabbs, setTabbs] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [infoCredito, setInfoCredito] = useState<infoCredito>({ 
        ...infoCreditoDto,
        ventas: venta.id, 
        estado_producto: venta.estado_producto,
        mod_estado_prod: false
    });

    const cantidadRestante:number = Number(venta.total) - Number(venta.totalPagado);


    useEffect(() => {
        if (infoCredito.estado_producto !== venta.estado_producto) {
            infoCredito.mod_estado_prod = true;
        }
    }, [infoCredito.estado_producto])
    

    const handlerOnChange = (e:any) => {
        if (e.target.name === "cantidad_pagada") {
            setInfoCredito({
                ...infoCredito,
                [e.target.name]: e.target.value > cantidadRestante ? cantidadRestante : e.target.value
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


    const validarCredito = ():boolean => { 
        if (infoCredito.cantidad_pagada > 0) {
            return true;
        } else {
            return false;
        }
    }


    const handlerCreditoDetalles = async () => { 
        setLoading(true);
        try {
            await post(infoCredito, CREDITO_DETALLES);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        } finally {
            setInfoCredito({
                ...infoCreditoDto,
                ventas: 0,
                estado_producto: false,
                mod_estado_prod: false
            })
            getDataOne();
            getData();
        }

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
        <div className="box box-par m-0 gestion-credito-venta">
            <div className="grid-4 gap mb-25">

                <button 
                    className={"btn2 btn2-info " + (tabbs === 1 && "btn2-sub-info")}
                    onClick={() => {setTabbs(1)}}
                > <BiLayerPlus /> Gestionar pagos
                </button>
            </div>

            <div className="box-content-tabbs">
                {
                    tabbs === 1
                    && (
                        <div className="grid-1 gap">

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

                            <div className="grid-3 gap">
                                <div></div>
                                <BtnOnOff2
                                    label="Añadir pago"
                                    estado={validarCredito()}
                                    icon={<BiCheck />}
                                >
                                    <button
                                        onClick={handlerCreditoDetalles}
                                        className="btn btn-success"
                                    ><BiCheck /> Añadir pago</button>
                                </BtnOnOff2>
                            </div>

                        </div>
                    )
                }
            </div>

        </div>
    )
}
