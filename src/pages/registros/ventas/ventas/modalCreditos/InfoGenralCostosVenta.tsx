import { moneda } from "../../../../../resources/func/moneda"

export const InfoGenralCostosVenta = ({ venta }:any) => {
    return (
        <div className="grid-3 gap mt-25">
            <div className="center">
                <p className="info">Subtotal</p>
                <h3 className="success">S/. { moneda(venta.subtotal) }</h3>
            </div>
            <div className="center">
                <p className="info">Inc/Desc total</p>
                <h3 className="secundary">S/. { moneda(venta.descuento_total) }</h3>
            </div>
            <div className="center">
                <p className="info">Total</p>
                <h1 className="success">S/. { moneda(venta.total) }</h1>
            </div>
        </div>
    )
}
