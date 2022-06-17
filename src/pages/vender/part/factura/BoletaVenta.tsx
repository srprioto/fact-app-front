import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { clienteInfo } from "../../../../resources/dtos/Cliente";
import { post } from "../../../../resources/fetch";
import { CLIENTES } from "../../../../resources/routes";
import { Input } from "../../../../components/forms/Input";
import { ParrafoForm } from "../../../../components/forms/ParrafoForm";
import { Select } from "../../../../components/forms/Select";
import { Loading } from "../../../../components/loads/Loading";
import { LoadingImg2 } from "../../../../components/loads/LoadingImg";
import { VenderClienteDni } from "./VenderClienteDni";
import { VenderClienteRuc } from "./VenderClienteRuc";
import { AccionesVenta } from "./AccionesVenta";
// import { CobrarClienteDni } from "../cliente/CobrarClienteDni";
// import { CobrarClienteRuc } from "../cliente/CobrarClienteRuc";


interface boleta {
    cliente:any;
    setCliente:Function;
    loadVenta:boolean;
    setShowWindow:Function;
    verificarCaja:Function;
    handlerVenta:Function;
}

export const BoletaVenta = ({ 
    cliente, 
    setCliente,

    loadVenta, setShowWindow, verificarCaja, handlerVenta
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

            <h3>Informacion general</h3>

            <div className="boleta-info-cliente grid-4 gap mb-20">

                <ParrafoForm
                    label="Serie"
                    value={ serie }
                    className="info strong"
                />

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
                    className={cliente.estadoCliente === "Registrado" ? "primary" : "success"}
                />

            </div>

            {
                loadCliente
                ? <Loading />
                : (
                    <>
                        {
                            getCliente.tipoDocumento === "DNI"
                            && <VenderClienteDni cliente={cliente} setCliente={setCliente} />
                        }
                        {
                            getCliente.tipoDocumento === "RUC"
                            && <VenderClienteRuc cliente={cliente} setCliente={setCliente} />
                        }
                    </>
                )
            }

            <div style={{height: "90px"}} />

            <AccionesVenta
                loadVenta={loadVenta}
                setShowWindow={setShowWindow}
                verificarCaja={verificarCaja}
                handlerVenta={handlerVenta}
            />

        </div>
    )
}
