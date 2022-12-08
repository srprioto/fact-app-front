import { useEffect, useState } from "react";
import { clienteInfo } from "../../../../../resources/dtos/Cliente";
import { tipoVenta } from "../../../../../resources/dtos/VentasDto";
import { post } from "../../../../../resources/fetch";
import { CLIENTES } from "../../../../../resources/routes";
import { FormDocumBoletaCob } from "./FormDocumBoletaCob";
import { FormGeneralBoletaCob } from "./FormGeneralBoletaCob";


interface boleta {
    cliente:any;
    setCliente:Function;
    switchChange:boolean;
    setModalConfVenta:Function;
    modalConfVenta:any;
    setModalRechazVenta:Function;
    modalRechazVenta:any;
    venta:any;
    setVenta:Function;
    activarConfirmarVenta:Function;
    getCliente:any;
    setGetCliente:Function;
}

export const BoletaCobrar = ({ 
    cliente, 
    setCliente, 
    switchChange,
    setModalConfVenta, 
    modalConfVenta, 
    setModalRechazVenta, 
    modalRechazVenta,
    venta, 
    setVenta,
    activarConfirmarVenta,
    getCliente, 
    setGetCliente,
}:boleta) => {
    
    const tipo_venta:string = tipoVenta.boleta;
    const [loadCliente, setLoadCliente] = useState<boolean>(false);
    

    useEffect(() => {
        setVenta({
            ...venta,
            tipo_venta: tipo_venta
        })
    }, [])


    useEffect(() => {
        if (switchChange) { // revisar en caso de que de problemas
            setCliente(clienteInfo);
        }
        setGetCliente({
            ...getCliente,
            documento: cliente ? cliente.numero_documento : ""
        })
        if (getCliente.tipoDocumento === "noDocumento") {
            setGetCliente({
                ...getCliente,
                documento: ""
            })
        }
        setCliente({ // añade el tipo de documento cambiado a cliente
            ...cliente,
            tipoDocumento: getCliente.tipoDocumento
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

    // traer data
    const handlerGetCliente = async () => { 
        setLoadCliente(true);

        const updateData = {
            documento: getCliente.documento,
            tipoDocumento: getCliente.tipoDocumento
        }

        try {
            const response = await post(updateData, CLIENTES + "/padron/search");
            response.numero_documento = cliente.numero_documento;
            response.tipoDocumento = getCliente.tipoDocumento;
            setCliente(response);
            setLoadCliente(false);
        } catch (error) {
            setLoadCliente(true);
            console.log(error);
        }
    }


    return (
        <div className="boleta">

            <h3>Informacion general</h3>

            <FormDocumBoletaCob
                tipoVenta={tipo_venta}
                cliente={cliente}
                getCliente={getCliente}
                switchChange={switchChange}
                handlerOnChangeGetCli={handlerOnChangeGetCli}
                handlerGetCliente={handlerGetCliente}
                loadCliente={loadCliente}
            />

            <FormGeneralBoletaCob
                loadCliente={loadCliente}
                getCliente={getCliente}
                switchChange={switchChange}
                cliente={cliente}
                setCliente={setCliente}
                setModalConfVenta={setModalConfVenta}
                modalConfVenta={modalConfVenta}
                setModalRechazVenta={setModalRechazVenta}
                modalRechazVenta={modalRechazVenta}
                activarConfirmarVenta={activarConfirmarVenta}
            />

        </div>
    )
}
