import { useEffect, useState } from "react"
import { Loading } from "../../../../../../components/loads/Loading";
import { clienteInfo } from "../../../../../../resources/dtos/Cliente";
import { tipoVenta } from "../../../../../../resources/dtos/VentasDto";
import { TablaListaVentaProductos } from "../../../../../cobrar/part/TablaListaVentaProductos";
import { ConvertirBoleta } from "../modalConvertirComp/boleta/ConvertirBoleta";
import { ConvertirFactura } from "../modalConvertirComp/factura/ConvertirFactura";
import { RapidoCred } from "./comprobantes/RapidoCred";
import { TabbsCompCredito } from "./comprobantes/TabbsCompCredito";
import { InfoGenralCostosVenta } from "./InfoGenralCostosVenta";
import { TablaInfoCredito } from "./TablaInfoCredito";


interface confirmCreditoAdelanto {
    venta:any;
    cantidadRestante:number;
    // confirmarVenta:Function;
    loading:boolean;

    clienteConv:any;
    setClienteConv:Function;
    getCliente:any;
    setGetCliente:Function;
    loadingPost:boolean;
    enviarVenta:Function;
    selectTipoComp:string;
    setSelectTipoComp:Function;
}

// interface boxConfirmCredito {
//     venta:any;
//     tabbs:number;
//     setTabbs:Function;
//     confirmarVenta:Function;
//     loading:boolean;
//     cantidadRestante:number;
// }

export const ConfirmCreditoAdelanto = ({ 
    venta, 
    cantidadRestante, 
    // confirmarVenta, 
    loading,
    clienteConv,
    setClienteConv,
    getCliente,
    setGetCliente,
    loadingPost,
    enviarVenta,
    selectTipoComp,
    setSelectTipoComp
}:confirmCreditoAdelanto) => {

    const [tabbs, setTabbs] = useState<number>(1);

    useEffect(() => {
        setClienteConv(clienteInfo);
        setGetCliente({ 
            documento: "", 
            tipoDocumento: selectTipoComp === tipoVenta.factura ? "RUC" : "noDocumento"
        });
    }, [selectTipoComp])


    return (
        <>
            <div className="box box-par m-0 confirm-credito-venta">

                <TablaListaVentaProductos venta={venta} />

                <h1 className="center danger m-0">¡Cancelado!</h1>
                <h5 className="center warning m-0">Continue el proceso confirmando un tipo de venta</h5>

                <TabbsCompCredito
                    tabbs={tabbs}
                    setTabbs={setTabbs}
                    setSelectTipoComp={setSelectTipoComp}
                />

                <InfoGenralCostosVenta
                    venta={venta}
                />

                <div className="mt-20">

                    {
                        tabbs === 1
                        && <RapidoCred 
                            enviarVenta={enviarVenta} 
                            loading={loading}
                        />
                    }
                    {
                        tabbs === 2
                        && <ConvertirBoleta 
                            clienteConv={clienteConv}
                            setClienteConv={setClienteConv}
                            selectTipoComp={selectTipoComp}
                            getCliente={getCliente}
                            setGetCliente={setGetCliente}
                            loadingPost={loadingPost}
                            enviarVenta={enviarVenta}
                        />
                    }
                    {
                        tabbs === 3
                        && <ConvertirFactura 
                            clienteConv={clienteConv}
                            setClienteConv={setClienteConv}
                            selectTipoComp={selectTipoComp}
                            getCliente={getCliente}
                            setGetCliente={setGetCliente}
                            loadingPost={loadingPost}
                            enviarVenta={enviarVenta}
                        />
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

