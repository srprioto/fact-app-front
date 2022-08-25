import { useEffect, useState } from "react";
import { InputMk } from "../../../../components/forms/InputMk";
import { LoadingImg3 } from "../../../../components/loads/LoadingImg";
import { post } from "../../../../resources/fetch";
import { CLIENTES } from "../../../../resources/routes";

export const BuscarDocum = ({ cliente, validarCrear, setValidarCrear, errors }:any) => {

    const [loadVerCliente, setLoadVerCliente] = useState<boolean>(false);

    
    useEffect(() => {
        validarDocCliente();
    }, [cliente.numero_documento])

    
    const validarDocCliente = async () => { 

        let response:any = { activarBtn: false, activarMsg: false };

        if (cliente.tipoDocumento === "DNI") {
            if (cliente.numero_documento.length === 8) {
                response = await postVerificarCliente("DNI", cliente.numero_documento);
                setValidarCrear(response);
            } else {
                setValidarCrear({ activarBtn: false, activarMsg: false });
            }
        } else if (cliente.tipoDocumento === "RUC"){
            if (cliente.numero_documento.length === 11) {
                response = await postVerificarCliente("RUC", cliente.numero_documento);
                setValidarCrear(response);
            } else {
                setValidarCrear({ activarBtn: false, activarMsg: false });
            }
        }
    }


    const postVerificarCliente = async (tipoDoc:string, doc:string) => {
        setLoadVerCliente(true);
        let response:any;
        const dataCli:any = {
            tipoDocumento: tipoDoc,
            numero_documento: doc
        }

        try {
            response = await post(dataCli, CLIENTES + "/verificar/cliente");
            setLoadVerCliente(false);
        } catch (error) {
            setLoadVerCliente(true);
            console.log(error);
        }

        return response;
    }

    return (
        <div>
            {
                validarCrear.activarMsg
                ? validarCrear.activarBtn
                ? <label 
                    htmlFor="numero_documento" 
                    className="label-documento center success w100"
                >
                    <span className="mr-5">El cliente no se encuentra registrado</span>
                    <IcoLoading load={loadVerCliente} />
                </label>
                : <label 
                    htmlFor="numero_documento" 
                    className="label-documento center warning w100"
                >
                    <span className="mr-5">El cliente ya esta registrado</span>
                    <IcoLoading load={loadVerCliente} />
                </label>
                : <label 
                    htmlFor="numero_documento" 
                    className="label-documento center info w100"
                >
                    <span className="mr-5">Documento</span>
                    <IcoLoading load={loadVerCliente} />
                </label>
            }
            <InputMk 
                // label="Documento"
                type="text"
                name="numero_documento"
                error={errors.numero_documento}
            />
        </div>
    )
}


const IcoLoading = ({ load }:any) => {
    return (
        load
        && <LoadingImg3 size="14px" />
    )
}

