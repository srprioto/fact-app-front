import { useEffect, useState } from "react";
import { clienteInfo } from "../../../../resources/dtos/Cliente";
import { post } from "../../../../resources/fetch";
import { CLIENTES } from "../../../../resources/routes";
import { FormInfoGeneral } from "./FormInfoGeneral";
import { FormGestionDocum } from "./FormGestionDocum";


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

    const serie:string = "B001";
    const clienteI = clienteInfo(serie);
    const [loadCliente, setLoadCliente] = useState<boolean>(false);
    const [getCliente, setGetCliente] = useState<any>({ documento: "", tipoDocumento: "DNI", });

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


    // traer data
    const handlerGetCliente = async () => { 
        setLoadCliente(true);

        const updateData = {
            documento: getCliente.documento,
            tipoDocumento: getCliente.tipoDocumento
        }

        try {
            const response = await post(updateData, CLIENTES + "/padron/search");
            response.serie_documento = serie;
            setCliente(response);
            setLoadCliente(false);
        } catch (error) {
            setLoadCliente(true);
            console.log(error);
        }
    }

    // console.log(cliente);

    return (
        <>
            
            <FormGestionDocum
                serie={serie} 
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
                setCliente={setCliente}
                handlerOnChangeCliente={handlerOnChangeCliente}
                loadVenta={loadVenta}
                setShowWindow={setShowWindow}
                verificarCaja={verificarCaja}
                handlerVenta={handlerVenta}
                verificarVender={verificarVender}
            />

        </>
    )
}
