import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { clienteInfo } from "../../resources/dtos/Cliente";
import { post } from "../../resources/fetch";
import { CLIENTES } from "../../resources/routes";
import { Input } from "../forms/Input";
import { ParrafoForm } from "../forms/ParrafoForm";
import { Select } from "../forms/Select";
import { Loading } from "../loads/Loading";
import { LoadingImg2 } from "../loads/LoadingImg";
import { ClienteDni } from "./cliente/ClienteDni";
import { ClienteRuc } from "./cliente/ClienteRuc";


export const Boleta = ({ cliente, setCliente }:any) => {

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


    return (
        <div className="boleta">
            <h3>Informacion del general</h3>

            <div className="boleta-info-general mb-30">

                <div className="wrap-info-producto">
                    <div className="wrap-descripcion grid-2 gap">
                        <div>
                            <span>
                                <h4>Serie: </h4>
                                <p>{serie}</p>
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            <h3>Informacion del cliente</h3>

            <div className="boleta-info-cliente grid-3 gap mb-20">

                <Select
                    label="Tipo de Documento"
                    name="tipoDocumento"
                    onChange={handlerOnChangeGetCli}
                    value={getCliente.tipoDocumento}
                >
                    <option value="DNI">DNI</option>
                    <option value="RUC">RUC</option>
                </Select>

                <div>
                    <p className="info center mb-8">Nro de documento</p>
                    <div className="search-general">

                        <Input
                            // label="Nro de documento"
                            type="text"
                            name="documento"
                            value={getCliente.documento}
                            onChange={handlerOnChangeGetCli}
                        />

                        <button className="btn btn-info" onClick={() => handlerGetCliente()}>
                            { loadCliente ? <LoadingImg2 size="23px" /> : <BiSearchAlt2 /> }
                        </button>
                    </div>
                </div>

                <ParrafoForm
                    label="Estado del cliente"
                    value={cliente.estadoCliente ? cliente.estadoCliente : "---"}
                    className={cliente.estadoCliente === "Nuevo" ? "success" : "info"}
                />

            </div>

            {
                loadCliente
                ? <Loading />
                : (
                    <>
                        {
                            getCliente.tipoDocumento === "DNI"
                            && <ClienteDni cliente={cliente} handlerOnChangeCliente={handlerOnChangeCliente} />
                        }
                        {
                            getCliente.tipoDocumento === "RUC"
                            && <ClienteRuc cliente={cliente} handlerOnChangeCliente={handlerOnChangeCliente} />
                        }
                    </>
                )
            }
        </div>
    )
}
