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
// import { CobrarClienteRuc } from "../../../../components/factura/cliente/CobrarClienteRuc";


interface factura {
    cliente:any;
    setCliente:Function;
    switchChange:boolean;
}

export const FacturaCobrar = ({ cliente, setCliente, switchChange }:factura) => {

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
    

    // useEffect(() => {
    //     setGetCliente({
    //         ...getCliente,
    //         documento: cliente.numero_documento
    //     })
    // }, [])
    

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

            <div className="boleta-info-cliente grid-2 gap mb-20">

                <ParrafoForm
                    label="Serie"
                    value={ serie }
                    className="info strong"
                />

                <ParrafoForm
                    label="Estado del cliente"
                    value={cliente.estadoCliente ? cliente.estadoCliente : "---"}
                    className={cliente.estadoCliente === "Registrado" ? "primary" : "success"}
                />

                {
                    switchChange
                    ? (
                        <Select
                            label="Tipo de Documento"
                            name="tipoDocumento"
                            onChange={handlerOnChangeGetCli}
                            value={getCliente.tipoDocumento}
                        >
                            <option value="DNI">DNI</option>
                            <option value="RUC">RUC</option>
                        </Select>
                    ) : (
                        <InputDisable
                            label="Tipo de Documento"
                            value={getCliente.tipoDocumento}
                        />
                    )
                }
                {
                    switchChange
                    ? (
                        <div>
                            <p className="info center mb-8">Nro de documento</p>
                            <div className="search-general">

                                <Input
                                    // label="Nro de documento"
                                    type="text"
                                    name="documento"
                                    value={cliente.documento}
                                    onChange={handlerOnChangeGetCli}
                                />

                                <button className="btn btn-info" onClick={() => handlerGetCliente()}>
                                    { loadCliente ? <LoadingImg2 size="23px" /> : <BiSearchAlt2 /> }
                                </button>
                            </div>
                        </div>
                    ) : (
                        <InputDisable
                            label="Nro de documento"
                            value={getCliente.documento}
                        />
                    )
                }

            </div>

            {
                loadCliente
                ? <Loading />
                : (
                    <>
                        {
                            getCliente.tipoDocumento === "DNI"
                            && <CobrarClienteDni 
                                switchChange={switchChange}
                                cliente={cliente}
                                setCliente={setCliente} 
                            />
                        }
                        {
                            getCliente.tipoDocumento === "RUC"
                            && <CobrarClienteRuc 
                                switchChange={switchChange}
                                cliente={cliente} 
                                setCliente={setCliente} 
                            />
                        }
                    </>
                )
            }
        </div>
    )
}
