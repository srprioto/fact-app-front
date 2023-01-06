import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BiCaretRight, BiX } from "react-icons/bi";
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
import { ToolTip } from "../../../../components/tooltip/ToolTip";
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
    setCliente:Function;
    setCreditoDetalles:Function;
    setListaPrecios:Function;
    showFormasPago:boolean;
    setGetCliente:Function;
}

export const CreditoAdelanto = ({ 
    venta,
    setVenta,
    modalRechazVenta, 
    setModalRechazVenta, 
    modalConfVenta,
    setModalConfVenta,
    activarConfirmarVenta,
    setCliente,
    setCreditoDetalles,
    setListaPrecios,
    showFormasPago,
    setGetCliente
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

                    // const ventaUpdate = copy(venta);
                    const ventaUpdate = venta;
                    const clientesUpdt:any = copy(venta.clientes);
                    const infoDocum:any = {};
                    const creditoUpdate:any = {};
                    const creditoDetalles:Array<any> = [];
                    
                    // actualizacion cliente
                    clientesUpdt.nombre = infoCredito.nombre;
                    clientesUpdt.telefono = infoCredito.telefono;
                    clientesUpdt.direccion = infoCredito.direccion;
                    clientesUpdt.email = infoCredito.email;

                    // info comprobante
                    infoDocum.documento = infoCredito.numero_documento;
                    infoDocum.tipoDocumento = infoCredito.tipoDocumento;
                    
                    // actualizacion credito
                    creditoUpdate.cantidad_pagada = Number(infoCredito.cantidad_pagada);
                    creditoUpdate.nota = infoCredito.observaciones;
                    creditoUpdate.fecha_estimada = new Date();
                    creditoUpdate.estado = true;
                    creditoDetalles.push(creditoUpdate);

                    // actualizacion venta
                    ventaUpdate.tipo_venta = infoCredito.estado_producto 
                    ? tipoVenta.credito
                    : tipoVenta.adelanto;
                    ventaUpdate.estado_producto = infoCredito.estado_producto;
                    // ventaUpdate.creditoDetalles = creditoDetalles;
                    // ventaUpdate.cliente = clientesUpdt;

                    if (!showFormasPago) {
                        setListaPrecios([ {   
                            forma_pago: venta.forma_pago, 
                            precio_parcial: infoCreditoDto.cantidad_pagada 
                        } ]);    
                    }
                    setCreditoDetalles(creditoDetalles);
                    setCliente(clientesUpdt);
                    setGetCliente(infoDocum);
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

                        <FormsClienteCred errors={errors} />

                        <div className="wrap-confirmar-venta mb-10 mt-25 bt bt-neutro">
                            <div className="grid-3 gap mt-25">
                                <BtnOnOff2
                                    label="Confirmar venta"
                                    estado={validarVenta()}
                                    icon={<BiCaretRight />}
                                    tooltipDisable={{
                                        anchor: "btn-conf-venta-cob",
                                        descripcion: "Los adelantos para reserva de producto requieren un monto mínimo",
                                    }}
                                >
                                    <button
                                        className="btn btn-success"
                                        type="submit"
                                    ><BiCaretRight /> Confirmar venta</button>
                                </BtnOnOff2>
                                <div></div>
                                <button
                                    id="btn-rechazar-venta"
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => setModalRechazVenta(!modalRechazVenta)}
                                ><BiX /> Rechazar venta</button>
                                <ToolTip
                                    anchor="btn-rechazar-venta"
                                    descripcion="Rechaza la venta actual"
                                /> 
                            </div>
                        </div>

                    </Form>
                )} 
            </Formik>
        </div>
    )
}


