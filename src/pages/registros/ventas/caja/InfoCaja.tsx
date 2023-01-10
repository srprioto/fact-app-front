import { ToolTip } from "../../../../components/tooltip/ToolTip"
import { moneda } from "../../../../resources/func/moneda"

interface infoCaja {
    caja:any;
}

export const InfoCaja = ({ caja }:infoCaja) => {

    const totalEfectivo:number = 
        Number(caja.monto_apertura) +
        Number(caja.monto_efectivo)

    const montosOtrosMedios:number = 
        Number(caja.monto_deposito) +
        Number(caja.monto_tarjeta) +
        Number(caja.monto_pago_electronico);
        

    return (
        <>
            <div className="grid-4">
        
                <div className="center">
                    <p>Monto de apertura: </p>
                    <h2 className="">S/. { moneda(caja.monto_apertura) }</h2>
                </div>                   

                <div 
                    id="txt-mov-caja"
                    className="center"
                >
                    <p>Movimientos de caja: </p>
                    <h2 className="warning-i">S/. { moneda(caja.otros_montos) }</h2>
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
                    <h2 className="info-i">S/. { moneda(caja.monto_efectivo) }</h2>
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
                        <h4 className="info m-0 left">S/. { moneda(caja.monto_tarjeta) }</h4>
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
                        <h4 className="info m-0 left">S/. { moneda(caja.monto_pago_electronico) }</h4>
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
                        <h4 className="info m-0 left">S/. { moneda(caja.monto_deposito) }</h4>
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
        </>
    )
}
