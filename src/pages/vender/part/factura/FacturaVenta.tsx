import { useEffect, useState } from "react";
import { clienteInfo } from "../../../../resources/dtos/Cliente";
import { tipoVenta } from "../../../../resources/dtos/VentasDto";
import { post } from "../../../../resources/fetch";
import { CLIENTES } from "../../../../resources/routes";
import { FormGestionDocum } from "./FormGestionDocum";
import { FormInfoGeneral } from "./FormInfoGeneral";


interface factura {
    cliente:any;
    setCliente:Function;
    loadVenta:boolean;
    setShowWindow:Function;
    verificarCaja:Function;
    handlerVenta:Function;
    verificarVender:Function;
}

export const FacturaVenta = ({ 
    cliente, 
    setCliente, 
    loadVenta, 
    setShowWindow, 
    verificarCaja, 
    handlerVenta,
    verificarVender
}:factura) => {

    // const serie:string = "F003";
    const tipo_venta:string = tipoVenta.factura;
    const clienteI = clienteInfo;
    const [loadCliente, setLoadCliente] = useState<boolean>(false);
    const [getCliente, setGetCliente] = useState<any>({ documento: "", tipoDocumento: "RUC", });

    useEffect(() => {
        setCliente(clienteI);
        setGetCliente({
            ...getCliente,
            documento: ""
        })
    }, [getCliente.tipoDocumento])
    

    const handlerOnChangeGetCli = (e:any) => { 
        setGetCliente({
            ...getCliente,
            [e.target.name]: e.target.value
        })
    }
    

    const handlerOnChangeCliente = (e:any) => { 
        setCliente({
            ...cliente,
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
            const response = await post(updateData, CLIENTES + "/padron/search");
            // response.serie_documento = serie;
            setCliente(response);
            setLoadCliente(false);
        } catch (error) {
            setLoadCliente(true);
            console.log(error);
        }
    }

    
    return (
        <>
            
            <FormGestionDocum
                // serie={serie} 
                tipo_venta={tipo_venta}
                handlerOnChangeGetCli={handlerOnChangeGetCli} 
                getCliente={getCliente} 
                handlerGetCliente={handlerGetCliente} 
                loadCliente={loadCliente} 
                cliente={cliente} 
            />

            <FormInfoGeneral
                cliente={cliente}
                loadCliente={loadCliente}
                getCliente={getCliente}
                // setCliente={setCliente}
                handlerOnChangeCliente={handlerOnChangeCliente}
                loadVenta={loadVenta}
                setShowWindow={setShowWindow}
                verificarCaja={verificarCaja}
                handlerVenta={handlerVenta}
                verificarVender={verificarVender}
                tipo_venta={tipo_venta}
                // serie={serie}
                labelBtn="Venta con factura"
            />

        </>
    )
  }