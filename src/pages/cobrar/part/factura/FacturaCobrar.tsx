import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { post } from "../../../../resources/fetch";
import { CLIENTES } from "../../../../resources/routes";
import { Input } from "../../../../components/forms/Input";
import { InputDisable } from "../../../../components/forms/InputDisable";
import { ParrafoForm } from "../../../../components/forms/ParrafoForm";
import { Select } from "../../../../components/forms/Select";
import { Loading } from "../../../../components/loads/Loading";
import { LoadingImg2 } from "../../../../components/loads/LoadingImg";
import { CobrarClienteDni } from "./CobrarClienteDni";
import { CobrarClienteRuc } from "./CobrarClienteRuc";
import { ConfirmarVenta } from "./ConfirmarVenta";
import { FormDocumCobrar } from "./FormDocumCobrar";
import { FormGeneralCobrar } from "./FormGeneralCobrar";
// import { CobrarClienteRuc } from "../../../../components/factura/cliente/CobrarClienteRuc";


interface factura {
    cliente:any;
    setCliente:Function;
    switchChange:boolean;

    setModalConfVenta:Function;
    modalConfVenta:any;
    setModalRechazVenta:Function;
    modalRechazVenta:any;
}

export const FacturaCobrar = ({ 
    cliente, setCliente, switchChange,
    setModalConfVenta, modalConfVenta, setModalRechazVenta, modalRechazVenta
}:factura) => {

    const serie:string = "F001";
    // const clienteI = clienteInfo(serie);
    const [loadCliente, setLoadCliente] = useState<boolean>(false);
    const [getCliente, setGetCliente] = useState<any>({ documento: "", tipoDocumento: "RUC", });

    
    useEffect(() => {
        // setCliente(clienteI);
        setGetCliente({
            ...getCliente,
            documento: cliente.numero_documento
        })
    }, [getCliente.tipoDocumento])
    

    const handlerOnChangeGetCli = (e:any) => { 
        setGetCliente({
            ...getCliente,
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
            response.serie_documento = serie;
            setCliente(response);
            setLoadCliente(false);
        } catch (error) {
            setLoadCliente(true);
            console.log(error);
        }
    }
    

    return (
        <div className="factura">

            <h3>Informacion general</h3>

            <FormDocumCobrar
                serie={serie}
                cliente={cliente}
                getCliente={getCliente}
                switchChange={switchChange}
                handlerOnChangeGetCli={handlerOnChangeGetCli}
                handlerGetCliente={handlerGetCliente}
                loadCliente={loadCliente}
            />

            <FormGeneralCobrar
                loadCliente={loadCliente}
                getCliente={getCliente}
                switchChange={switchChange}
                cliente={cliente}
                setCliente={setCliente}
                setModalConfVenta={setModalConfVenta}
                modalConfVenta={modalConfVenta}
                setModalRechazVenta={setModalRechazVenta}
                modalRechazVenta={modalRechazVenta}
            />

        </div>
    )
}
