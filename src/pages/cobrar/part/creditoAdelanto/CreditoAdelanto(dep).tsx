import { Form, Formik } from "formik";
import { useState } from "react";
import { BiCaretRight, BiX } from "react-icons/bi";
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
import { Checkbox3 } from "../../../../components/forms/Checkbox3";
import { Input } from "../../../../components/forms/Input";
import { InputMk } from "../../../../components/forms/InputMk";
import { SelectMk } from "../../../../components/forms/SelectMk";
import { moneda } from "../../../../resources/func/moneda";
import { ValidClienteCredito } from "../../../../resources/validations/Clientes";

interface creditoAdelanto {
    venta:any;
    modalRechazVenta:boolean;
    setModalRechazVenta:Function;
    setModalConfVenta:Function;
}

export const CreditoAdelanto = ({ venta, modalRechazVenta, setModalRechazVenta, setModalConfVenta }:creditoAdelanto) => {

    // const [Cliente, setCliente] = useState<any>({});
    const [infoCredito, setInfoCredito] = useState<any>({
        estado_producto: true,
        cantidad_pagada: 0,

        observaciones: "",
        nombre: "",
        tipo_documento: "DNI",
        numero_documento: "",
        telefono: "",
        direccion: "",
        email: ""
    });

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

    const validarVenta = () => { 
        if (infoCredito.estado_producto === false && Number(infoCredito.cantidad_pagada) === 0) {
            return false;
        } else {
            return true;
        }
    }


    return (
        <div className="credito-anticipo">
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

            <div className="cred-adel-info-cliente">
                <Formik
                    initialValues={{
                        observaciones: "",
                        nombre: "",
                        tipo_documento: "DNI",
                        numero_documento: "",
                        telefono: "",
                        direccion: "",
                        email: ""
                    }}
                    // enableReinitialize={true}
                    validationSchema={ValidClienteCredito}
                    onSubmit={(data, { resetForm }) => { 
                        console.log("*******");
                        console.log(infoCredito);
                        
                    }}
                >
                    {({ errors }:any) => (
                        <Form 
                            className="grid-1 gap mt-20"
                            onChange={handlerOnChange}
                        >

                            <div className="grid-1 gap">
                                <InputMk
                                    label={
                                        infoCredito.estado_producto
                                        ? "Nota del credito"
                                        : "Nota del adelanto"
                                    }
                                    type="text"
                                    name="observaciones"
                                    error={errors.observaciones}
                                />
                            </div>

                            <div className="grid-3 gap">

                                <InputMk 
                                    label="Nombre del cliente"
                                    type="text"
                                    name="nombre"
                                    error={errors.nombre}
                                />

                                <SelectMk
                                    label="Tipo de documento"
                                    type="text"
                                    name="tipo_documento"
                                    error={errors.tipo_documento}
                                >
                                    <option value="DNI">DNI</option>
                                    <option value="RUC">RUC</option>
                                </SelectMk>

                                <InputMk 
                                    label="Documento"
                                    type="text"
                                    name="numero_documento"
                                    error={errors.numero_documento}
                                />

                                <InputMk 
                                    label="Telefono"
                                    type="text"
                                    name="telefono"
                                    error={errors.telefono}
                                />

                                <InputMk 
                                    label="Direccion"
                                    type="text"
                                    name="direccion"
                                    error={errors.direccion}
                                />

                                <InputMk
                                    label="E-mail"
                                    type="text"
                                    name="email"
                                    error={errors.email}
                                />
                                
                            </div>
                            
                            <div className="wrap-confirmar-venta mb-10 mt-10 bt bt-neutro">
                                <div className="grid-3 gap mt-25">
                                    <BtnOnOff2
                                        label="Confirmar venta"
                                        estado={validarVenta()}
                                        icon={<BiCaretRight />}
                                    >
                                        <button
                                            className="btn btn-success"
                                            type="submit"
                                        ><BiCaretRight /> Confirmar venta</button>
                                    </BtnOnOff2>
                                    <div></div>
                                    <button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={() => setModalRechazVenta(!modalRechazVenta)}
                                    ><BiX /> Rechazar venta</button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}


