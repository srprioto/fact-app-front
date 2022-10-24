import { useState } from "react"
import { put } from "../../../../../resources/fetch";
import { VENTAS } from "../../../../../resources/routes";
import { TablaListaVentaProductos } from "../../../../cobrar/part/TablaListaVentaProductos";
import { BoletaCred } from "./comprobantes/BoletaCred";
import { FacturaCred } from "./comprobantes/FacturaCred";
import { RapidoCred } from "./comprobantes/RapidoCred";
import { TabbsCompCredito } from "./comprobantes/TabbsCompCredito";
import { InfoGenralCostosVenta } from "./InfoGenralCostosVenta";

export const ConfirmCreditoAdelanto = ({ venta }:any) => {

    const [tabbs, setTabbs] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const confirmarVenta = async (tipo_venta:string) => { 
        setLoading(true);
        // tipoVenta.factura
        // tipoVenta.boleta
        // tipoVenta.venta_rapida

        const updateVenta:any = {
            tipo_venta: tipo_venta
        }

        try {
            await put(venta.id, updateVenta, VENTAS + "/cambiar_tipo_venta");
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        } 
    }

    return (
        <div className="box box-par m-0 confirm-credito-venta">

            <TablaListaVentaProductos venta={venta} />

            <h1 className="center danger m-0">¡Cancelado!</h1>
            <h5 className="center warning m-0">Continue el proceso confirmando un tipo de venta</h5>

            <TabbsCompCredito
                tabbs={tabbs}
                setTabbs={setTabbs}
            />

            <InfoGenralCostosVenta
                venta={venta}
            />

            <div className="mt-20">

                {
                    tabbs === 1
                    && <RapidoCred 
                        confirmarVenta={confirmarVenta} 
                        loading={loading}
                        venta={venta}
                    />
                }
                {
                    tabbs === 2
                    && <BoletaCred />
                }
                {
                    tabbs === 3
                    && <FacturaCred />
                }
                
            </div>

        </div>
    )
}
