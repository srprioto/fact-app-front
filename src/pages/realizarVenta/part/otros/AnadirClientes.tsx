import { useEffect, useState } from "react"
import { BiGroup } from "react-icons/bi"
import { Checkbox2 } from "../../../../components/forms/Checkbox2"
import { Input } from "../../../../components/forms/Input"
import { InputDisable } from "../../../../components/forms/InputDisable"
import { SelectSearch } from "../../../../components/forms/SelectSearch"
import { generateRandomString } from "../../../../resources/func/generarString"
import { CLIENTES_SEARCH } from "../../../../resources/routes"

export const AnadirClientes = ({ handlerCliente, venta, setVenta, handlerChangeVenta }:any) => {

    const [switchSelectClientes, setSwitchSelectClientes] = useState<boolean>(false); // handler select
    const [tabState, setTabState] = useState<number>(1);
    const [codigoVenta, setCodigoVenta] = useState<boolean>(false);

    
    useEffect(() => {
        setCodigoVenta(true);
    }, [])
    

    useEffect(() => {
        if (codigoVenta) {
            setVenta({ 
                ...venta,
                codigo_venta: generateRandomString()
            })
        } else {
            setVenta({ 
                ...venta,
                codigo_venta: ""
            })    
        }
    }, [codigoVenta])
        

    const handlerTab = (index:number) => { 
        setTabState(index);
        setVenta({
            ...venta,
            codigo_venta: "",
            clienteId: 0
        })
        setSwitchSelectClientes(false);
        setVenta({ 
            ...venta,
            codigo_venta: generateRandomString()
        })
        setCodigoVenta(true);
    }


    return (
        <div className="wrap-cliente">

            <div className="tabbs grid-3 gap mb-25">

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
                        <div className="item-tabbs grid-41">
                            {
                                codigoVenta
                                ? (
                                    <InputDisable 
                                        label="Codigo de venta"
                                        name="codigo_venta"
                                        value={venta.codigo_venta}
                                    />
                                ) : (
                                    <Input 
                                        label="Nombre del cliente rapido *"
                                        type="text"
                                        name="codigo_venta"
                                        value={venta.codigo_venta}
                                        onChange={handlerChangeVenta}
                                        placeholder="Añade el nombre del cliente"
                                    />
                                )
                            }

                            <div className="middle">
                                <Checkbox2
                                    name="codigoVenta"
                                    checked={codigoVenta}
                                    handlerCheck={ () => setCodigoVenta(!codigoVenta) }
                                />
                            </div>
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
