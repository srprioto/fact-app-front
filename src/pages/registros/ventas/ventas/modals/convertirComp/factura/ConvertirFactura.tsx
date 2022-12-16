import { useState } from "react";
import { post } from "../../../../../../../resources/fetch";
import { CLIENTES } from "../../../../../../../resources/routes";
import { FormGetFacturaConv } from "./FormGetFacturaConv";
import { FormInfoFacturaConv } from "./FormInfoFacturaConv";


interface convertirFactura {
    clienteConv:any;
    setClienteConv:Function;
    selectTipoComp:string;
    getCliente:any;
    setGetCliente:Function;
    loadingPost:boolean;
    enviarVenta:Function;
}

export const ConvertirFactura = ({ 
    clienteConv, 
    setClienteConv, 
    selectTipoComp,
    getCliente, 
    setGetCliente,
    loadingPost,
    enviarVenta
}:convertirFactura) => {

    const [loadCliente, setLoadCliente] = useState<boolean>(false);


    const handlerOnChangeGetCli = (e:any) => { 
        setGetCliente({
            ...getCliente,
            [e.target.name]: e.target.value
        })
        if (e.target.name === "documento") {
            setClienteConv({
                ...clienteConv,
                numero_documento: e.target.value
            })    
        }
    }
    

    const handlerOnChangeCliente = (e:any) => { 
        setClienteConv({
            ...clienteConv,
            [e.target.name]: e.target.value
        })
    }


    const handlerGetCliente = async () => { 
        setLoadCliente(true);

        const updateData = {
            documento: getCliente.documento,
            tipoDocumento: getCliente.tipoDocumento
        }

        try {
            let response = await post(updateData, CLIENTES + "/padron/search");
            // response.numero_documento = cliente.numero_documento;
            setClienteConv(response);
            setLoadCliente(false);
        } catch (error) {
            setLoadCliente(true);
            console.log(error);
        }
    }


    return (
        <div>

            <FormGetFacturaConv
                handlerGetCliente={handlerGetCliente}
                clienteConv={clienteConv}
                handlerOnChangeGetCli={handlerOnChangeGetCli}
                getCliente={getCliente}
                loadCliente={loadCliente}
                selectTipoComp={selectTipoComp}
            />

            <FormInfoFacturaConv
                clienteConv={clienteConv}
                getCliente={getCliente}
                handlerOnChangeCliente={handlerOnChangeCliente}
                loadCliente={loadCliente}
                selectTipoComp={selectTipoComp}
                loadingPost={loadingPost}
                enviarVenta={enviarVenta}
            />

        </div>
    )
}
