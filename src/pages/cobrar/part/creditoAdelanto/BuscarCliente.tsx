import { useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { InputMk } from "../../../../components/forms/InputMk";
import { ParrafoForm } from "../../../../components/forms/ParrafoForm";
import { LoadingImg2 } from "../../../../components/loads/LoadingImg";
import { post } from "../../../../resources/fetch";
import { CLIENTES } from "../../../../resources/routes";

interface buscarCliente {
    infoCredito:any;
    setInfoCredito:Function;
    errors:any;
}   

export const BuscarCliente = ({ infoCredito, setInfoCredito, errors }:buscarCliente) => {

    const [loadCliente, setLoadCliente] = useState<boolean>(false);
    const [estadoCliente, setEstadoCliente] = useState<boolean>(true);

    
    const handlerGetCliente = async () => { 
        setLoadCliente(true);

        const updateData = {
            documento: infoCredito.numero_documento,
            tipoDocumento: infoCredito.tipoDocumento
        }

        try {
            const response = await post(updateData, CLIENTES + "/padron/search");
            if (response.estadoCliente === "Inexistente") {
                setEstadoCliente(false);
                setInfoCredito({
                    ...infoCredito,
                    tipoDocumento: "DNI",
                    numero_documento: infoCredito.numero_documento,
                    nombre: "",
                    telefono: "",
                    direccion: "",
                    email: "",
                })
            } else {
                setEstadoCliente(true);
                setInfoCredito({
                    ...infoCredito,
                    tipoDocumento: response.tipoDocumento,
                    numero_documento: response.numero_documento,
                    nombre: response.nombre,
                    telefono: response.telefono,
                    direccion: response.direccion,
                    email: response.email,
                })
            }
            setLoadCliente(false);
        } catch (error) {
            setLoadCliente(true);
            console.log(error);
        }
    }


    // const validarDocumento = () => { 
    //     if (!!cliente.numero_documento) {
    //         if (cliente.numero_documento.length === 8) {
    //             return false
    //         } else {
    //             return true
    //         }
    //     } else {
    //         return false
    //     }
    // }
    

    return (
        <div className="buscar-cliente">

            {
                !estadoCliente
                && <div className="mb-25 center">
                    <p className="warning m-0">No se puede identificar al cliente</p>
                    <p className="warning m-0">Regístralo manualmente</p>
                </div>
            }

            <div className="grid-2 gap mt-20">

                <div>
                    <p className="info center mb-8">Nro de documento</p>
                    <div className="search-general">

                        <InputMk
                            type="text"
                            name="numero_documento"
                            error={errors.numero_documento}
                        />

                        <button 
                            className="btn btn-info" 
                            type="button"
                            onClick={handlerGetCliente}
                        >
                            { loadCliente ? <LoadingImg2 size="23px" /> : <BiSearchAlt2 /> }
                        </button>

                    </div>
                </div>

                <ParrafoForm
                    label="Tipo de Documento"
                    value="DNI"
                    className="strong info"
                />

            </div>
        </div>
    )
}
