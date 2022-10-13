import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BiCaretRight, BiX } from "react-icons/bi";
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
import { tipoVenta } from "../../../../resources/dtos/VentasDto";
import { copy } from "../../../../resources/func/deepCopy";
import { ValidClienteCredito } from "../../../../resources/validations/Clientes";
import { BuscarCliente } from "./BuscarCliente";
import { FormsClienteCred } from "./FormsClienteCred";
import { PagosCreditoAdel } from "./PagosCreditoAdel";


interface creditoAdelanto {
    venta:any;
    setVenta:Function;
    modalRechazVenta:boolean;
    setModalRechazVenta:Function;
    modalConfVenta:boolean;
    setModalConfVenta:Function;
    activarConfirmarVenta:Function;
}

export const CreditoAdelanto = ({ 
    venta,
    setVenta,
    modalRechazVenta, 
    setModalRechazVenta, 
    modalConfVenta,
    setModalConfVenta,
    activarConfirmarVenta
}:creditoAdelanto) => {

    const infoCreditoDto = {
        estado_producto: true,
        cantidad_pagada: venta.totalPagado,
        observaciones: "",

        nombre: "",
        tipoDocumento: "DNI",
        numero_documento: "",
        telefono: "",
        direccion: "",
        email: ""
    }

    const [infoCredito, setInfoCredito] = useState<any>(infoCreditoDto);

    useEffect(() => {
        setVenta({
            ...venta,
            tipo_venta: infoCredito ? tipoVenta.credito : tipoVenta.adelanto
        })
    }, [])

    
    const handlerOnInfoChange = (e:any) => { 
        setInfoCredito({
            ...infoCredito,
            [e.target.name]: e.target.value
        })
    }


    const validarVenta = () => { 
        if (
            ((infoCredito.estado_producto === false) && 
            (Number(infoCredito.cantidad_pagada) === 0)) ||
            !activarConfirmarVenta()
        ) {
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
                setVenta={setVenta}
            />

            <Formik
                initialValues={infoCredito}
                enableReinitialize={true}
                validationSchema={ValidClienteCredito}
                onSubmit={(data, { resetForm }) => { 

                    const ventaUpdate = copy(venta);
                    const clientesUpdt:any = copy(venta.clientes);
                    const creditoUpdate:any = {};
                    const creditoDetalles:Array<any> = [];
                    
                    // actualizacion cliente
                    clientesUpdt.nombre = infoCredito.nombre;
                    clientesUpdt.tipoDocumento = infoCredito.tipoDocumento;
                    clientesUpdt.numero_documento = infoCredito.numero_documento;
                    clientesUpdt.telefono = infoCredito.telefono;
                    clientesUpdt.direccion = infoCredito.direccion;
                    clientesUpdt.email = infoCredito.email;
                    
                    // actualizacion credito
                    creditoUpdate.cantidad_pagada = Number(infoCredito.cantidad_pagada);
                    creditoUpdate.nota = infoCredito.observaciones;
                    creditoUpdate.fecha_estimada = new Date();
                    creditoDetalles.push(creditoUpdate);

                    // actualizacion venta
                    ventaUpdate.tipo_venta = infoCredito.estado_producto 
                    ? tipoVenta.credito 
                    : tipoVenta.adelanto;
                    ventaUpdate.estado_producto = infoCredito.estado_producto;
                    ventaUpdate.cliente = clientesUpdt;
                    ventaUpdate.creditoDetalles = creditoDetalles;

                    setVenta(ventaUpdate);
                    setModalConfVenta(!modalConfVenta);

                }}
            >
                {({ errors }:any) => (
                    <Form onChange={handlerOnInfoChange} >

                        <BuscarCliente
                            infoCredito={infoCredito}
                            setInfoCredito={setInfoCredito}
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


