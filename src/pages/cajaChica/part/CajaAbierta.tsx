import { useState } from "react";
import { BiChevronDown, BiChevronUp, BiLock, BiPlus } from "react-icons/bi"
import { Input } from "../../../components/forms/Input";
import { ToolTip } from "../../../components/tooltip/ToolTip";
import { moneda } from "../../../resources/func/moneda";
import { CajaDetalles } from "./CajaDetalles";

interface cajaAbierta {
    data:any;
    caja:any;
    setCaja:Function;
    setModalCerrarCaja:Function;
    setModalAddMonto:Function;
    handlerEliminar:Function;
}

export const CajaAbierta = ({ 
    data, 
    caja, 
    setCaja, 
    setModalCerrarCaja, 
    setModalAddMonto, 
    handlerEliminar 
}:cajaAbierta) => {

    const [showObserv, setShowObserv] = useState<boolean>(false);

    const cajaDetalles = !!data.caja ? data.caja.cajaDetalles : [];
    const infoCaja:any = data.caja && data.caja;
    const totalEfectivo:number = 
        Number(infoCaja.monto_apertura) +
        Number(infoCaja.monto_efectivo)
    const montosOtrosMedios:number = 
        Number(infoCaja.monto_deposito) +
        Number(infoCaja.monto_tarjeta) +
        Number(infoCaja.monto_pago_electronico);
    
    const handlerCerrarCaja = () => { 
        setCaja({
            ...caja,
            estado_caja: false,
            // monto_efectivo: totalIngresos
        })
        setModalCerrarCaja(true);
    }

    const handlerOnChange = (e:any) => { 
        setCaja({
            ...caja,
            [e.target.name]: e.target.value
        })
    }


    return (
        <>
            <div className="box">
                <div className="box grid-1 gap box-par m-0">
        
                    <div className="box-descripcion center mb-5">
                        <p className="right m-0">Estado de caja: </p>
                        <h2 className="strong left success">Abierto</h2>
                    </div>
        
                    <div className="grid-4">
        
                        <div className="center">
                            <p>Monto de apertura: </p>
                            <h2 className="">S/. { moneda(infoCaja.monto_apertura) }</h2>
                        </div>                   

                        <div 
                            id="txt-mov-caja"
                            className="center"
                        >
                            <p>Movimientos de caja: </p>
                            <h2 className="warning-i">S/. { moneda(infoCaja.otros_montos) }</h2>
                            <ToolTip
                                anchor="txt-mov-caja"
                                descripcion="Calcular el total de ingresos y egresos de caja"
                            /> 
                        </div>

                        <div
                            id="txt-ingreso-rec"
                            className="center"
                        >
                            <p>Monto recaudados: </p>
                            <h2 className="info-i">S/. { moneda(infoCaja.monto_efectivo) }</h2>
                            <ToolTip
                                anchor="txt-ingreso-rec"
                                descripcion="Suma el total de ventas y los movimientos de caja"
                            /> 
                        </div>

                        <div
                            id="txt-monto-caja"
                            className="center"
                        >
                            <p>Monto total en caja: </p>
                            <h2 className="strong success-i">S/. { moneda(totalEfectivo) }</h2>
                            <ToolTip
                                anchor="txt-monto-caja"
                                descripcion="
                                    Suma el total de los ingresos recaudados<br/>
                                    y el monto de apertura de caja
                                "
                            /> 
                        </div>
        
                    </div>

                    <div className="grid-121">

                        <div></div>

                        <div className="pago-otros-ingresos right">
                            <span
                                id="txt-pag-tarjeta"
                                className="grid-2 gap"
                            >
                                <p className="m-0">Tarjeta: </p>
                                <h4 className="info m-0 left">S/. { moneda(infoCaja.monto_tarjeta) }</h4>
                                <ToolTip
                                    anchor="txt-pag-tarjeta"
                                    descripcion="Pagos realizados con tarjeta"
                                /> 
                            </span>
                            <span 
                                id="txt-pag-elec"
                                className="grid-2 gap"
                            >
                                <p className="m-0">P. Electronico: </p>
                                <h4 className="info m-0 left">S/. { moneda(infoCaja.monto_pago_electronico) }</h4>
                                <ToolTip
                                    anchor="txt-pag-elec"
                                    descripcion="
                                        Pagos realizados por otros medios electrónicos<br/>
                                        Yape, Plin, etc.                                
                                    "
                                /> 
                            </span>
                            <span 
                                id="txt-pag-deposito"
                                className="grid-2 gap"
                            >
                                <p className="m-0">Deposito: </p>
                                <h4 className="info m-0 left">S/. { moneda(infoCaja.monto_deposito) }</h4>
                                <ToolTip
                                    anchor="txt-pag-deposito"
                                    descripcion="Pagos realizados por depósito bancario"
                                /> 
                            </span>
                        </div>
        
                        <div 
                            id="txt-pag-otro-ingresos"
                            className="center"
                        >
                            <p>Otros ingresos: </p>
                            <h2 className="strong success-i">
                                S/. { moneda(montosOtrosMedios) }
                            </h2>
                            <ToolTip
                                anchor="txt-pag-otro-ingresos"
                                descripcion="
                                    Calcula el total de pagos realizados 
                                    por medios distintos al efectivo
                                "
                            /> 
                        </div>
                    </div>

                    <div className="grid-4">

                        <div></div>
                        <div></div>
                        <div></div>
        
                        <div
                            id="txt-mont-tot"
                            className="center"
                        >
                            <p>Monto total: </p>
                            <h1 className="strong success-i">
                                S/. { moneda(Number(totalEfectivo) + Number(montosOtrosMedios)) }
                            </h1>
                            <ToolTip
                                anchor="txt-mont-tot"
                                descripcion="Suma el total del monto total en caja y otros ingresos"
                            /> 
                        </div>

                    </div>
        
                    <div className="grid-3 gap mt-15">
                        <button 
                            id="btn-ing-egr-mov-caja"
                            className="btn btn-info" 
                            onClick={() => setModalAddMonto(true)}
                        >
                            <BiPlus />
                            Ingresar o retirar monto
                        </button>
                        <button
                            id="btn-no-coincide"
                            onClick={() => setShowObserv(!showObserv)}
                            className="btn-show red-text"
                        >
                            ¿Los montos no coinciden?
                            {
                                showObserv
                                ? <BiChevronUp />
                                : <BiChevronDown />
                            }
                        </button>
                        {
                            !showObserv
                            && <BtnCerrarCaja handler={handlerCerrarCaja} />
                        }

                        <ToolTip
                            anchor="btn-ing-egr-mov-caja"
                            descripcion="Añade un ingreso o egreso a los movimientos de caja"
                        /> 
                        <ToolTip
                            anchor="btn-no-coincide"
                            descripcion="
                                Despliega un formulario que permite establecer un monto y observación en caso de que los montos de caja y los montos en efectivo u otros montos no empaten.<br/>
                                Esta acción no afecta el estado de caja actual.
                            "
                        /> 
        
                    </div>
                    {
                        showObserv
                        && (
                            <div className="grid-2 gap mt-15">
                                <Input
                                    label="Monto de diferencia"
                                    type="number"
                                    name="cantidad_diferencia"
                                    value={caja.cantidad_diferencia}
                                    onChange={handlerOnChange}
                                    color={caja.cantidad_diferencia < 0
                                        ? "danger-i"
                                        : ""}
                                    moneda 
                                    tooltip={{
                                        anchor: "txt-monto-dif",
                                        descripcion: "Monto diferencial en el que el monto total en caja y el monto en efectivo no coinciden",
                                    }}
                                />
                                <Input
                                    label="Observación"
                                    type="string"
                                    name="nota_observacion"
                                    value={caja.nota_observacion}
                                    onChange={handlerOnChange} 
                                    tooltip={{
                                        anchor: "txt-monto-dif-obs",
                                        descripcion: "Nota de observación de la operación",
                                    }}
                                />
                            </div>
                        )
                    }
        
                    {   
                        showObserv
                        && (
                            <div className="grid-3 gap mt-15">
                                <div></div>
                                <div></div>
                                <BtnCerrarCaja handler={handlerCerrarCaja} />
                            </div>
                        )
                    }
                </div>
            </div>
            {
                cajaDetalles.length > 0
                && <CajaDetalles 
                    cajaDetalles={data.caja.cajaDetalles}
                    handlerEliminar={handlerEliminar} 
                />
            }
        </>
    )
}




const BtnCerrarCaja = ({ handler }:any) => { 
    return (
        <>
            <button 
                id="btn-cerrar-caja"
                onClick={() => handler()} 
                className="btn btn-warning"
            >
                <BiLock />
                Cerrar caja
            </button>
            <ToolTip
                anchor="btn-cerrar-caja"
                descripcion="Cierra la caja actual y elimina todas las ventas pendientes o rechazadas"
            /> 
        </>
    )
}