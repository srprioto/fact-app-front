import { Input } from "../../../../../components/forms/Input";
import { ToolTip } from "../../../../../components/tooltip/ToolTip";
// import { Select2 } from "../../../../../components/forms/Select2";
import { moneda } from "../../../../../resources/func/moneda";


export const PreciosVenta = ({ venta, alertaDescuento, handlerOnChange }:any) => {
    return (
        <div className="info-venta grid-4 gap mb-25">

            {/* <span className="center">
                <p className="mb-5 info">Total Unidades</p>
                <h3 className="secundary m-0">{ totalUnid }</h3>
            </span> */}

            <span className="center">
                <p className="mb-5 info">Subtotal</p>
                <h3 className="secundary m-0">S/. { moneda(venta.subtotal) }</h3>
            </span>

            <span id="imp-descuento-total">
                {
                    alertaDescuento()
                    ? <p className="mb-10 danger center strong">¡Descuentos activos!</p>
                    : <p className="mb-10 info center">Incr/Desc. total</p>
                }
                <Input 
                    // label="Incr/Desc. total"
                    type="number"
                    name="descuento_total"
                    value={venta.descuento_total}
                    onChange={handlerOnChange}
                    moneda
                    color={(venta.descuento_total < 0) ? "danger-i" : ""}
                />
                <ToolTip
                    anchor="imp-descuento-total"
                    descripcion="Incremento o descuento a la venta total"
                /> 
            </span>
        
            <span className="center">
                <p className="mb-5 info">Monto total</p>
                <h1 className="success strong">S/. { moneda(venta.total) }</h1>
            </span>

            <Input 
                label="Observaciones"
                type="text"
                name="observaciones"
                value={venta.observaciones}
                onChange={handlerOnChange}
            />

            {/* {
                tabbs !== 4
                && (
                    <>
                        <Select2
                            label="Forma de pago"
                            name="forma_pago"
                            onChange={handlerOnChange}
                            value={venta.forma_pago}
                        >
                            <option value="efectivo">Efectivo</option>
                            <option value="tarjeta">Tarjeta</option>
                            <option value="pago_electronico">Pago electronico</option>
                            <option value="deposito">Deposito</option>
                        </Select2>
                        
                        <Input 
                            label="Observaciones"
                            type="text"
                            name="observaciones"
                            value={venta.observaciones}
                            onChange={handlerOnChange}
                        />
                    </>
                )
            } */}
            

        </div>
    )
}

/* <MetodosPago
    label="Forma de pago"
    name="forma_pago"
    onChange={handlerOnChange}
    value={venta.forma_pago}
/> */