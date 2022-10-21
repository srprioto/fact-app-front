import { moneda } from "../../../../../resources/func/moneda";

export const InfoGeneralCredito = ({ venta }:any) => {

    return (
        <div className="grid-4 gap mt-25">
            <div></div>
            <span>
                <p className="center mb-10 info">Total general</p>
                <h2 className="center secundary m-0">
                    S/. { moneda(venta.total) }
                </h2>
            </span>
            <span>
                <p className="center mb-10 info">Cantidad pagada</p>
                <h2 className="center success m-0">
                    S/. { moneda(venta.totalPagado) }
                </h2>
            </span>
        </div>
    )
}
