import { useState } from "react"
import { Loading } from "../../../../../../components/loads/Loading";
import { put } from "../../../../../../resources/fetch";
import { VENTAS } from "../../../../../../resources/routes";
import { TablaListaVentaProductos } from "../../../../../cobrar/part/TablaListaVentaProductos";
import { BoxModalVentaDetalles } from "../ModalVentaDetalles";
import { BoletaCred } from "./comprobantes/BoletaCred";
import { FacturaCred } from "./comprobantes/FacturaCred";
import { RapidoCred } from "./comprobantes/RapidoCred";
import { TabbsCompCredito } from "./comprobantes/TabbsCompCredito";
import { InfoGenralCostosVenta } from "./InfoGenralCostosVenta";
import { TablaInfoCredito } from "./TablaInfoCredito";


interface confirmCreditoAdelanto {
    venta:any;
    cantidadRestante:number;
}

interface boxConfirmCredito {
    venta:any;
    tabbs:number;
    setTabbs:Function;
    confirmarVenta:Function;
    loading:boolean;
    cantidadRestante:number;
}

export const ConfirmCreditoAdelanto = ({ venta, cantidadRestante }:confirmCreditoAdelanto) => {

    const [tabbs, setTabbs] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [resto, setResto] = useState<any>({});

    const confirmarVenta = async (tipo_venta:string) => { 
        setLoading(true);

        const updateVenta:any = {
            tipo_venta: tipo_venta
        }

        try {
            const resto:any = await put(venta.id, updateVenta, VENTAS + "/cambiar_tipo_venta");
            setResto(resto);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        } 
    }


    return (

        !resto.success
        ? <BoxConfirmCredito
            venta={venta}
            tabbs={tabbs}
            setTabbs={setTabbs}
            confirmarVenta={confirmarVenta}
            loading={loading}
            cantidadRestante={cantidadRestante}
        />
        // : <div></div>
        : <BoxModalVentaDetalles idVenta={resto.id} />

    )
}


const BoxConfirmCredito = ({ 
    venta, 
    tabbs, 
    setTabbs, 
    confirmarVenta, 
    loading, 
    cantidadRestante 
}:boxConfirmCredito) => { 
    return (
        <>
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

            {
                loading
                ? <Loading />
                : <>
                    <TablaInfoCredito
                        venta={venta}
                        cantidadRestante={cantidadRestante}
                    />
                </>
            }
        </>
    );
}
