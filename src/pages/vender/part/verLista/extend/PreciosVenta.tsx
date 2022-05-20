import { Input } from "../../../../../components/forms/Input"

export const PreciosVenta = ({ venta, alertaDescuento, handlerOnChange }:any) => {
    return (
        <div className="info-venta grid-4 gap mb-25">

            <span className="center">
                <p className="mb-5 info">Subtotal</p>
                <h3 className="secundary m-0">S/. {venta.subtotal}</h3>
            </span>

            <span>
                {
                    alertaDescuento()
                    ? (
                        <p className="mb-10 danger center strong">
                            ¡Descuentos activos!
                        </p>
                    )
                    : (
                        <p className="mb-10 info center">
                            Incr/Desc. total
                        </p>
                    )
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
            </span>
        
            <span className="center">
                <p className="mb-5 info">Total</p>
                <h1 className="success strong">S/. {venta.total}</h1>
            </span>

            <Input 
                label="Observaciones"
                type="text"
                name="observaciones"
                value={venta.observaciones}
                onChange={handlerOnChange}
            />

        </div>
    )
}
