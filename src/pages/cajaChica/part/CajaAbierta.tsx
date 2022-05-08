import { useState } from "react";
import { BiChevronDown, BiChevronUp, BiLock, BiPlus } from "react-icons/bi"
import { Input } from "../../../components/forms/Input";

export const CajaAbierta = ({ data, caja, setCaja, setModalCerrarCaja, setModalAddMonto, montoApertura }:any) => {

    const [showObserv, setShowObserv] = useState<boolean>(false);
    
    const otrosIngresos:any = data.caja ? data.caja.otros_montos : null;
    const totalIngresos:number = data.totalIngresos ? data.totalIngresos : 0;
    
    const handlerCerrarCaja = () => { 
        setCaja({
            ...caja,
            estado_caja: false,
            monto_cierre: totalIngresos
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
        <div className="box">
            <div className="box grid-1 gap box-par m-0">
    
                <div className="box-descripcion center mb-5">
                    <p className="right m-0">Estado de caja: </p>
                    <h2 className="strong left success">Abierto</h2>
                </div>
    
                <div className="grid-4 gap">
    
                    <div className="center">
                        <p>Monto de apertura: </p>
                        <h2 className="strong">S/.{montoApertura}</h2>
                    </div>
    
                    <div className="center">
                        <p>Ingresos del día: </p>
                        <h2 className="strong info-i">S/.{data.totalIngresos}</h2>
                    </div>
    
                    <div className="center">
                        <p>Otros ingresos: </p>
                        <h2 className="strong warning-i">S/.{otrosIngresos}</h2>
                    </div>
    
                    <div className="center">
                        <p>Monto total: </p>
                        <h2 className="strong success-i">
                            S/.{montoApertura + totalIngresos + otrosIngresos}
                        </h2>
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