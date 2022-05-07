import { useState } from "react"
import { BiGroup } from "react-icons/bi"
import { Input } from "../../../components/forms/Input"
import { SelectSearch } from "../../../components/forms/SelectSearch"
import { CLIENTES_SEARCH } from "../../../resources/routes"

export const AnadirClientes = ({ handlerCliente, venta, setVenta, handlerChangeVenta }:any) => {

    const [switchSelectClientes, setSwitchSelectClientes] = useState<boolean>(false); // handler select

    const [tabState, setTabState] = useState<number>(1);

    const handlerTab = (index:number) => { 
        setTabState(index);
        setVenta({
            ...venta,
            nombre_cliente: "",
            clienteId: 0
        })
        setSwitchSelectClientes(false);
    }


    return (
        <div className="wrap-cliente">

            <div className="tabbs grid-2 gap mb-25">

                <button 
                    className={"btn2 btn2-warning " + (tabState === 1 && "btn2-sub-warning")}
                    onClick={() => handlerTab(1)}
                >
                    <BiGroup /> Cliente rapido
                </button>

                <button 
                    className={"btn2 btn2-success " + (tabState === 2 && "btn2-sub-success")}
                    onClick={() => handlerTab(2)}
                >
                    <BiGroup /> Cliente existente
                </button>

            </div>

            <div className="wrap-items-tabbs">

                {
                    tabState === 1 
                    && (
                        <div className="item-tabbs">
                            <Input 
                                label="Nombre del cliente rapido *"
                                type="text"
                                name="nombre_cliente"
                                value={venta.nombre_cliente}
                                onChange={handlerChangeVenta}
                                placeholder="Añade el nombre del cliente"
                            />
                        </div>
                    )
                }
                {
                    tabState === 2 
                    && (
                        <div className="item-tabbs">
                            <SelectSearch
                                label="Buscar en nuestros clientes *"
                                urlData={CLIENTES_SEARCH}
                                respuesta={handlerCliente}
                                switchSelect={switchSelectClientes}
                                setSwitchSelect={setSwitchSelectClientes}
                                placeholder="Busca el nombre de cliente existente"
                                // link={`/clientes/nuevo`}
                            />
                        </div>
                    )
                }
                
                
            </div>



        </div>
    )
}
