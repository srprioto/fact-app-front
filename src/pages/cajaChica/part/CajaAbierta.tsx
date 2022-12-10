import { useState } from "react";
import { BiChevronDown, BiChevronUp, BiLock, BiPlus } from "react-icons/bi"
import { Input } from "../../../components/forms/Input";
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

                        <div className="center">
                            <p>Movimientos de caja: </p>
                            <h2 className="warning-i">S/. { moneda(infoCaja.otros_montos) }</h2>
                        </div>

                        <div className="center">
                            <p>Ingresos recaudados: </p>
                            <h2 className="info-i">S/. { moneda(infoCaja.monto_efectivo) }</h2>
                        </div>

                        <div className="center">
                            <p>Monto total en caja: </p>
                            <h2 className="strong success-i">
                                S/. { moneda(totalEfectivo) }
                            </h2>
                        </div>
        
                    </div>

                    <div className="grid-121">

                        <div></div>

                        <div className="pago-otros-ingresos right">
                            <span className="grid-2 gap">
                                <p className="m-0">Tarjeta: </p>
                                <h4 className="info m-0 left">S/. { moneda(infoCaja.monto_tarjeta) }</h4>
                            </span>
                            <span className="grid-2 gap">
                                <p className="m-0">P. Electronico: </p>
                                <h4 className="info m-0 left">S/. { moneda(infoCaja.monto_pago_electronico) }</h4>
                            </span>
                            <span className="grid-2 gap">
                                <p className="m-0">Deposito: </p>
                                <h4 className="info m-0 left">S/. { moneda(infoCaja.monto_deposito) }</h4>
                            </span>
                        </div>
        
                        <div className="center">
                            <p>Otros ingresos: </p>
                            <h2 className="strong success-i">
                                S/. { moneda(montosOtrosMedios) }
                            </h2>
                        </div>
                    </div>

                    <div className="grid-4">

                        <div></div>
                        <div></div>
                        <div></div>
        
                        <div className="center">
                            <p>Ingresos totales: </p>
                            <h1 className="strong success-i">
                                S/. { moneda(Number(totalEfectivo) + Number(montosOtrosMedios)) }
                            </h1>
                        </div>

                    </div>
        
                    <div className="grid-3 gap mt-15">
                        <button className="btn btn-info" onClick={() => setModalAddMonto(true)}>
                            <BiPlus />
                            Ingresar o retirar monto
                        </button>
                        <button
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
                                    moneda />
                                <Input
                                    label="Observación"
                                    type="string"
                                    name="nota_observacion"
                                    value={caja.nota_observacion}
                                    onChange={handlerOnChange} />
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
        <button onClick={() => handler()} className="btn btn-warning">
            <BiLock />
            Cerrar caja
        </button>
    )
}