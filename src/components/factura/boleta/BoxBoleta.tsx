import { useEffect, useState } from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import { clienteGet } from "../../../resources/dtos/Cliente";
import { post } from "../../../resources/fetch";
import { CLIENTES } from "../../../resources/routes";
import { Input } from "../../forms/Input";
import { ParrafoForm } from "../../forms/ParrafoForm";
import { Select } from "../../forms/Select";
import { Loading } from "../../loads/Loading";
import { LoadingImg2 } from "../../loads/LoadingImg";

export const BoxBoleta = () => {

    const [loadCliente, setLoadCliente] = useState<boolean>(false);
    const [getCliente, setGetCliente] = useState<any>({ documento: "", tipoDocumento: "DNI", });
    const [cliente, setCliente] = useState<any>(clienteGet);

    useEffect(() => {
        setCliente(clienteGet);
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
            setCliente(response);
            setLoadCliente(false);
        } catch (error) {
            setLoadCliente(true);
            console.log(error);
        }
    }


    return (
        <div className="">

            <h3>Informacion del general</h3>

            <div className="boleta-info-general grid-3 gap mb-30">

                <Input
                    label="Nombre del cliente"
                    type="text"
                    name="precio_parcial"
                    value={1}
                    onChange={handlerOnChangeGetCli}
                />

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
                    label="Tipo de cliente"
                    value={cliente.estadoCliente ? cliente.estadoCliente : "---"}
                    className={cliente.estadoCliente === "Nuevo" ? "warning" : "success"}
                />

            </div>

            {
                loadCliente
                ? <Loading />
                : (
                    <>
                        {
                            getCliente.tipoDocumento === "DNI"
                            && (
                                <div className="grid-1 gap">
                                    <div className="grid-2 gap">
                                        <Input
                                            label="Nombre del cliente"
                                            type="text"
                                            name="nombre"
                                            value={cliente.nombre}
                                            onChange={handlerOnChangeCliente}
                                        />
                                        <Input
                                            label="Telefono"
                                            type="text"
                                            name="telefono"
                                            value={cliente.telefono}
                                            onChange={handlerOnChangeCliente}
                                        />
                                        <Input
                                            label="Direccion"
                                            type="text"
                                            name="direccion"
                                            value={cliente.direccion}
                                            onChange={handlerOnChangeCliente}
                                        />
                                        <Input
                                            label="E-mail"
                                            type="text"
                                            name="email"
                                            value={cliente.email}
                                            onChange={handlerOnChangeCliente}
                                        />
                                    </div>
                                </div>
                            )
                        }
                        {
                            getCliente.tipoDocumento === "RUC"
                            && (
                                <div className="grid-1 gap">
                                    <Input
                                        label="Razon social"
                                        type="text"
                                        name="nombre"
                                        value={cliente.razonSocial}
                                        onChange={handlerOnChangeCliente}
                                    />
                                    <Input
                                        label="Direccion"
                                        type="text"
                                        name="direccion"
                                        value={cliente.direccion}
                                        onChange={handlerOnChangeCliente}
                                    />
                                    <div className="grid-2 gap">
                                        <Input
                                            label="Telefono"
                                            type="text"
                                            name="telefono"
                                            value={cliente.telefono}
                                            onChange={handlerOnChangeCliente}
                                        />
                                        <Input
                                            label="E-mail"
                                            type="text"
                                            name="email"
                                            value={cliente.email}
                                            onChange={handlerOnChangeCliente}
                                        />
                                    </div>
                                    <div className="grid-3 gap">
                                        <Input
                                            label="Departamento"
                                            type="text"
                                            name="departamento"
                                            value={cliente.departamento}
                                            onChange={handlerOnChangeCliente}
                                        />
                                        <Input
                                            label="Provincia"
                                            type="text"
                                            name="provincia"
                                            value={cliente.provincia}
                                            onChange={handlerOnChangeCliente}
                                        />
                                        <Input
                                            label="Distrito"
                                            type="text"
                                            name="distrito"
                                            value={cliente.distrito}
                                            onChange={handlerOnChangeCliente}
                                        />
                                    </div>
                                    <div className="grid-3 gap">
                                        <Input
                                            label="Estado del Contribuyente"
                                            type="text"
                                            name="estado"
                                            value={cliente.estado}
                                            onChange={handlerOnChangeCliente}
                                        />
                                        <Input
                                            label="Condición del Contribuyente"
                                            type="text"
                                            name="condom"
                                            value={cliente.condom}
                                            onChange={handlerOnChangeCliente}
                                        />
                                        <Input
                                            label="Ubigeo"
                                            type="text"
                                            name="ubigeo"
                                            value={cliente.ubigeo}
                                            onChange={handlerOnChangeCliente}
                                        />
                                    </div>

                                </div>
                            )
                        }
                    </>
                )
            }
            
        </div>
    )
}

