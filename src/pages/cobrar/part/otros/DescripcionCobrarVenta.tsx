import { Select2 } from "../../../../components/forms/Select2";
import { ToolTip } from "../../../../components/tooltip/ToolTip";
import { moneda } from "../../../../resources/func/moneda"

interface descripcionCobrarVenta {
    venta:any;
    setVenta:Function;
    listaPagosTarjeta:Function;
    showFormasPago:boolean;
    comisionTarjeta:number;
    tabbs:number;
}

export const DescripcionCobrarVenta = ({ 
    venta, 
    setVenta, 
    listaPagosTarjeta, 
    showFormasPago,
    comisionTarjeta,
    tabbs
}:descripcionCobrarVenta) => {

    const verificarTarjeta = () => { 
        if (
            (venta.forma_pago === "tarjeta" && showFormasPago === false) || 
            listaPagosTarjeta().length > 0
        ) {
            return true;
        } else {
            return false;
        }
    }


    const handlerChangeVenta = (e:any) => {
        setVenta({
            ...venta,
            [e.target.name]: e.target.value
        })
    }


    const classVerTarjet = (tipo:string):string => { 
        let returnTarjeta:string = "";
        if (verificarTarjeta()) {
            switch(tipo){
                case "pClass":
                    returnTarjeta += "mb-10 warning";
                    break;
                case "pText":
                    if (tabbs === 4) {
                        returnTarjeta += "Total";
                    } else {
                        returnTarjeta += "Total +5% com.";
                    }
                    
                    break;
                case "h1Class":
                    returnTarjeta += "mb-10 warning";
                    break;
            }
        } else {
            switch(tipo){
                case "pClass":
                    returnTarjeta += "mb-10 info";
                    break;
                case "pText":
                    returnTarjeta += "Total";
                    break;
                case "h1Class":
                    returnTarjeta += "mb-10 success";
                    break;
            }
        }
        return returnTarjeta;  
    }


    return (
        <div className={
            tabbs === 4
            ? "grid-5 gap"
            : "grid-4 gap"
        }>

            <div className="center">
                <p className="info">Subtotal</p>
                <h3 className="success">S/. { moneda(venta.subtotal) }</h3>
            </div>

            <div className="center">
                <p className="info">{
                    Number(venta.descuento_total) > 0
                    ? "Incremento total"
                    : Number(venta.descuento_total) === 0
                    ? "Inc/Desc total"
                    : "Descuento total"
                }</p>
                <h3 className={
                    Number(venta.descuento_total) < 0
                    ? "danger"
                    : Number(venta.descuento_total) === 0
                    ? "secundary"
                    : "success"
                }>S/. {moneda(venta.descuento_total)}</h3>
            </div>
            
            <span className="center" id="txt-total-con-tarjeta"> {/* pago total */}
                <p className={
                    tabbs !== 4
                    ? classVerTarjet("pClass")
                    : "center info"
                }>{classVerTarjet("pText")}</p>
                {
                    tabbs !== 4
                    ? (
                        <h1 className={classVerTarjet("h1Class")}>
                            S/.{ moneda(Number(venta.total) + comisionTarjeta) }
                        </h1>
                    ) : (
                        <h3 className="center">
                            S/.{ moneda(Number(venta.total)) }
                        </h3>
                    )
                }
                {
                    verificarTarjeta()
                    && <ToolTip
                        anchor="txt-total-con-tarjeta"
                        descripcion="Añade un 5% de comisión a todos los pagos realizados con tarjeta"
                    /> 
                }
            </span>

            {
                // monto pagado por credito o adelanto
                tabbs === 4
                && <span id="txt-monto-cred-adel">
                    <p className={
                        verificarTarjeta()
                        ? "center mb-10 warning"
                        : "center mb-10 info"
                    }>{
                        verificarTarjeta()
                        ? "Total P. +5%"
                        : "Cantidad pagada"
                    }</p>
                    <h1 className="center success mb-10">
                        S/. { 
                            Number(venta.totalPagado) !== 0
                            ? moneda(Number(venta.totalPagado) + comisionTarjeta) 
                            : moneda(0)
                        }
                    </h1>
                    <ToolTip
                        anchor="txt-monto-cred-adel"
                        descripcion={
                            "Monto pagado del credito o adelanto" +
                            (verificarTarjeta() && "<br/>Añade un 5% de comisión a todos los pagos realizados con tarjeta")
                        }
                    /> 

                </span> 
            }

            {
                !showFormasPago
                && (
                    <Select2
                        label="Forma de pago"
                        name="forma_pago"
                        onChange={handlerChangeVenta}
                        value={venta.forma_pago}
                    >
                        <option value="efectivo">Efectivo</option>
                        <option value="tarjeta">Tarjeta</option>
                        <option value="pago_electronico">Pago Electronico</option> 
                        <option value="deposito">Deposito</option>
                    </Select2>
                )
            }

        </div>
    )
}
