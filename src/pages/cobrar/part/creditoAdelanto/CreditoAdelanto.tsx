import { Form, Formik } from "formik";
import { useState } from "react";
import { BiCaretRight, BiX } from "react-icons/bi";
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
import { Input } from "../../../../components/forms/Input";
import { InputMk } from "../../../../components/forms/InputMk";
import { ValidClienteCredito } from "../../../../resources/validations/Clientes";
import { BuscarCliente } from "./BuscarCliente";
import { FormsClienteCred } from "./FormsClienteCred";
import { PagosCreditoAdel } from "./PagosCreditoAdel";


interface creditoAdelanto {
    venta:any;
    modalRechazVenta:boolean;
    setModalRechazVenta:Function;
    setModalConfVenta:Function;
}

export const CreditoAdelanto = ({ 
    venta, 
    modalRechazVenta, 
    setModalRechazVenta, 
    setModalConfVenta 
}:creditoAdelanto) => {

    const clienteDto = {
        nombre: "",
        tipoDocumento: "DNI",
        numero_documento: "",
        telefono: "",
        direccion: "",
        email: ""
    }

    const infoCreditoDto = {
        estado_producto: true,
        cantidad_pagada: 0,
        observaciones: "",
    }


    const [cliente, setCliente] = useState<any>(clienteDto);
    const [infoCredito, setInfoCredito] = useState<any>(infoCreditoDto);


    const handlerOnChange = (e:any) => { 
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }


    const handlerOnChangeInfo = (e:any) => { 
        setInfoCredito({
            ...infoCredito,
            [e.target.name]: e.target.value
        })
    }


    const validarVenta = () => { 
        if (infoCredito.estado_producto === false && Number(infoCredito.cantidad_pagada) === 0) {
            return false;
        } else {
            return true;
        }
    }


    return (
        <div className="credito-anticipo grid-1 gap">
            
            <PagosCreditoAdel
                infoCredito={infoCredito}
                setInfoCredito={setInfoCredito}
                venta={venta}
            />

            <div className="grid-1 gap mt-20">
                <Input
                    label={
                        infoCredito.estado_producto
                        ? "Nota del credito"
                        : "Nota del adelanto"
                    }
                    type="text"
                    name="observaciones"
                    value={infoCredito.observaciones}
                    onChange={handlerOnChangeInfo}
                />
            </div>

            <Formik
                initialValues={cliente}
                enableReinitialize={true}
                validationSchema={ValidClienteCredito}
                onSubmit={(data, { resetForm }) => { 
                    // setModalConfVenta(!modalConfVenta)
                    console.log("*******");
                    console.log(cliente);
                    console.log(infoCredito);
                    
                }}
            >
                {({ errors }:any) => (
                    <Form onChange={handlerOnChange} >

                        <BuscarCliente
                            cliente={cliente}
                            setCliente={setCliente}
                            errors={errors}
                        />

                        <FormsClienteCred
                            errors={errors}
                        />

                        <div className="wrap-confirmar-venta mb-10 mt-25 bt bt-neutro">
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
    )
}


