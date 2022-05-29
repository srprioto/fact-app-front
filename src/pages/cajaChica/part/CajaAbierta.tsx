import { useState } from "react";
import { BiChevronDown, BiChevronUp, BiLock, BiPlus } from "react-icons/bi"
import { Input } from "../../../components/forms/Input";

export const CajaAbierta = ({ data, caja, setCaja, setModalCerrarCaja, setModalAddMonto, user }:any) => {

    const [showObserv, setShowObserv] = useState<boolean>(false);

    const infoCaja:any = data.caja && data.caja;
    
    // const totalIngresos:number = data.totalIngresos ? data.totalIngresos : 0;
    
    const totalEfectivo:number = infoCaja.monto_apertura + infoCaja.monto_efectivo + infoCaja.otros_montos;
    
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

    // console.log(infoCaja);

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
                        <h2 className="">S/. {infoCaja.monto_apertura}</h2>
                    </div>                   

                    <div className="center">
                        <p>Otros movimientos: </p>
                        <h2 className="warning-i">S/. {infoCaja.otros_montos}</h2>
                    </div>

                    <div className="center">
                        <p>Ingresos en efectivo: </p>
                        <h2 className="info-i">S/. {infoCaja.monto_efectivo}</h2>
                    </div>

                    <div className="center">
                        <p>Monto total en caja: </p>
                        <h2 className="strong success-i">
                            S/. {totalEfectivo}
                        </h2>
                    </div>
    
                </div>

                <div className="grid-4 gap">

                    <div></div>
                    <div></div>

                    <div className="center">
                        <p>Ingresos otros medios: </p>
                        <h2 className="primary-i">S/. {infoCaja.monto_otros_medios}</h2>
                    </div>
    
                    <div className="center">
                        <p>Ingresos totales: </p>
                        <h1 className="strong success-i">
                            S/. {totalEfectivo + infoCaja.monto_otros_medios}
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