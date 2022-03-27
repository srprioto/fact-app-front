import { useState } from "react"

import { BtnShow } from "../../../../components/forms/BtnShow";
import { SelectSearch } from "../../../../components/forms/SelectSearch";
import { Loading } from "../../../../components/Loading";
import { getOne } from "../../../../resources/fetch";
import { CLIENTES_SEARCH, CLIENTES } from "../../../../resources/routes";

export const DescripcionCliente = ({ clienteExistente, clienteNuevo, updateCliente, modalCliente }:any) => {

    const [switchSelectClientes, setSwitchSelectClientes] = useState<boolean>(false);
    const [loadingOne, setLoadingOne] = useState<boolean>(false);

    const [toggleAddCliente, setToggleAddCliente] = useState<any>(false);

    // console.log(venta);

    const handlerCliente = async (cliente:any) => { 

        setLoadingOne(true);
        try {
            const response = await getOne(Number((cliente.split('@'))[0]), CLIENTES);
            updateCliente(response);
            setLoadingOne(false);
        } catch (error) {
            setLoadingOne(true);
            console.log(error);
        } finally {
            setToggleAddCliente(false);
            setSwitchSelectClientes(false);
        }

        
    }
    
    return (
        <div>

            {
                loadingOne
                ? (
                    <div style={{ height: "115px" }}>
                        <Loading />
                    </div>
                )
                : (
                    <div className="info-cliente">
                        <h3>Informacion del cliente</h3>
                        {
                            clienteExistente
                            ? (
                                <DescripcionClienteExistente    
                                    clienteExistente={clienteExistente}
                                    addCliente={toggleAddCliente}
                                    setAddCliente={setToggleAddCliente}
                                />
                            ) : (
                                <DescripcionClienteNuevo
                                    clienteNuevo={clienteNuevo}
                                    addCliente={toggleAddCliente}
                                    setAddCliente={setToggleAddCliente}
                                />
                            )
                        }
                    </div>
                )
            }
            {
                toggleAddCliente
                && (
                    <div className="seleccionar-cliente mt-15">
                        <SelectSearch
                            label="Nuestros clientes *"
                            urlData={CLIENTES_SEARCH}
                            respuesta={handlerCliente}
                            switchSelect={switchSelectClientes}
                            setSwitchSelect={setSwitchSelectClientes}
                            placeholder="Busca el nombre de cliente existente"
                            // link="/clientes/nuevo"
                            modal={modalCliente}
                        />
                    </div>
                )
            }
            

        </div>
    )
}


const DescripcionClienteExistente = ({ clienteExistente, addCliente, setAddCliente }:any) => {

    return (
        <>
            <div className="grid-2 gap wrap-descripcion">
                <div>
                    <span>
                        <h4>Nombre: </h4>
                        <p>{ clienteExistente.nombre }</p>
                    </span>

                    <span>
                        <h4>Direccion: </h4>
                        <p>{ clienteExistente.direccion }</p>
                    </span>

                    <span>
                        <h4>Documento: </h4>
                        <p>{ clienteExistente.documento }</p>
                    </span>
                </div>

                <div>
                    <span>
                        <h4>Email: </h4>
                        <p>{ clienteExistente.email }</p>
                    </span>

                    <span>
                        <h4>Telefono: </h4>
                        <p>{ clienteExistente.telefono }</p>
                    </span>
                </div>
                
            </div>
            <div className="grid-3 gap">
                <div></div>
                <BtnShow 
                    label="Cambiar cliente existente" 
                    state={addCliente}
                    setState={setAddCliente}
                />
                <div></div>
            </div>
        </>
        
    )
}


const DescripcionClienteNuevo = ({ clienteNuevo, addCliente, setAddCliente  }:any) => {

    return (
        <>
            <div className="grid-2 gap wrap-descripcion">
                <div>
                    <span>
                        <h4>Nombre: </h4>
                        <p>{ clienteNuevo }</p>
                    </span>
                </div>
                <div>
                    <span>
                        <h4>Tipo de cliente: </h4>
                        <p className="warning">Cliente rápido</p>
                    </span>
                </div>
                
            </div>
            <div className="grid-3 gap">
                <div></div>
                <BtnShow 
                    label="Añadir cliente existente"
                    state={addCliente}
                    setState={setAddCliente}
                />
                <div></div>
            </div>
        </>
        
    )
}