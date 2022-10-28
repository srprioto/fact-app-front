import { useEffect, useState } from "react";
import { clienteInfo } from "../../../../resources/dtos/Cliente";
import { post } from "../../../../resources/fetch";
import { CLIENTES } from "../../../../resources/routes";
import { FormInfoGeneral } from "./FormInfoGeneral";
import { FormGestionDocum } from "./FormGestionDocum";
import { tipoVenta } from "../../../../resources/dtos/VentasDto";


interface boleta {
    cliente:any;
    setCliente:Function;
    loadVenta:boolean;
    setShowWindow:Function;
    verificarCaja:Function;
    handlerVenta:Function;
    verificarVender:Function;
}

export const BoletaVenta = ({ 
    cliente, 
    setCliente,
    loadVenta, 
    setShowWindow, 
    verificarCaja, 
    handlerVenta,
    verificarVender
}:boleta) => {

    // const serie:string = "B003";
    const tipo_venta:string = tipoVenta.boleta;
    const clienteI = clienteInfo;
    const [loadCliente, setLoadCliente] = useState<boolean>(false);
    const [getCliente, setGetCliente] = useState<any>({ documento: "", tipoDocumento: "noDocumento", });

    
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
        if (e.target.name === "documento") {
            setCliente({
                ...cliente,
                numero_documento: e.target.value
            })    
        }
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
            response.numero_documento = cliente.numero_documento;
            setCliente(response);
            // if (response.estadoCliente === "Inexistente") {
            //     const numeroDocumento = cliente.numero_documento;
            //     setCliente({
            //         ... cliente,
            //         estadoCliente: response.estadoCliente
            //     });
            // } else {
            //     setCliente(response);
            // }
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
                // serie={serie}
                tipo_venta={tipo_venta}
                labelBtn="Venta con boleta"
                tipoDoc={getCliente.tipoDocumento}
            />

        </>
    )
}
