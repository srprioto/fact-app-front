import { useEffect, useState } from "react";
import { clienteInfo } from "../../../../../../../resources/dtos/Cliente";
import { post } from "../../../../../../../resources/fetch";
import { CLIENTES } from "../../../../../../../resources/routes";
import { FormGetBoletaConv } from "./FormGetBoletaConv";
import { FormInfoBoletaConv } from "./FormInfoBoletaConv";


interface convertirBoleta {
    clienteConv:any;
    setClienteConv:Function;
    selectTipoComp:string;
    getCliente:any;
    setGetCliente:Function;
    loadingPost:boolean;
    enviarVenta:Function;
}

export const ConvertirBoleta = ({ 
    clienteConv, 
    setClienteConv, 
    selectTipoComp, 
    getCliente, 
    setGetCliente,
    loadingPost,
    enviarVenta
}:convertirBoleta) => {

    const [loadCliente, setLoadCliente] = useState<boolean>(false);


    useEffect(() => {
        setClienteConv({
            ...clienteInfo
        });
        setGetCliente({
            ...getCliente,
            documento: ""
        })
    }, [getCliente.tipoDocumento])

    
    const handlerOnChangeCliente = (e:any) => { 
        setClienteConv({
            ...clienteConv,
            [e.target.name]: e.target.value
        })
    }


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


    const handlerGetCliente = async () => { 
        setLoadCliente(true);
        const updateData = {
            documento: getCliente.documento,
            tipoDocumento: getCliente.tipoDocumento
        }
        try {
            const response = await post(updateData, CLIENTES + "/padron/search");
            // console.log(response);
            // response.numero_documento = getCliente.numero_documento;
            // response.numero_documento = getCliente.documento;
            setClienteConv(response);
            setLoadCliente(false);
        } catch (error) {
            setLoadCliente(true);
            console.log(error);
        }
    }


    return (
        <div>
            <FormGetBoletaConv
                handlerGetCliente={handlerGetCliente}
                clienteConv={clienteConv}
                handlerOnChangeGetCli={handlerOnChangeGetCli}
                getCliente={getCliente}
                loadCliente={loadCliente}
                selectTipoComp={selectTipoComp}
            />

            <FormInfoBoletaConv
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
