import { Form, Formik } from "formik"
import { useEffect } from "react"
import { BiSearchAlt2 } from "react-icons/bi"
import { InputDisable } from "../../../../components/forms/InputDisable"
import { InputMk } from "../../../../components/forms/InputMk"
import { ParrafoForm } from "../../../../components/forms/ParrafoForm"
import { Select } from "../../../../components/forms/Select"
import { LoadingImg2 } from "../../../../components/loads/LoadingImg"
import { clienteInfo } from "../../../../resources/dtos/Cliente"
import { tipoVenta as tipVenta } from "../../../../resources/dtos/VentasDto";
import { ValidDocumento } from "../../../../resources/validations/Clientes"

interface formDocumCobrar{
    // serie:string;
    tipoVenta:string;
    cliente:any;
    getCliente:any;
    switchChange:boolean;
    handlerOnChangeGetCli:any;
    handlerGetCliente:Function;
    loadCliente:boolean;

    switchChangeFact:boolean;
    setTabbs:Function;
    tipoSerie:Function;
    data:any
    tabbs:number;
    setCliente:Function;
    setGetCliente:Function;

    venta:any
    setVenta:Function;
}

export const FormDocumCobrar = ({ 
    // serie, 
    tipoVenta,
    cliente, 
    getCliente, 
    switchChange, 
    handlerOnChangeGetCli, 
    handlerGetCliente,
    loadCliente,

    switchChangeFact, setTabbs, data, tipoSerie, tabbs, setCliente, setGetCliente,

    venta, setVenta
}:formDocumCobrar) => {

    // const tipDocument = data.clientes && data.clientes.tipoDocumento;
    // const documento = data.clientes && data.clientes.numero_documento;

    const tipDocument = () => { 
        if (!!data.clientes) {
            if (!!data.clientes.tipoDocumento) {
                return data.clientes.tipoDocumento
            } else {
                return "noDocumento"
            }
        } else {
            return "noDocumento"
        }
    }

    const documento = () => { 
        if (!!data.clientes) {
            if (!!data.clientes.numero_documento) {
                return data.clientes.numero_documento
            } else {
                return ""
            }
        } else {
            return ""
        }
    }


    const stateCliente:string = cliente ? cliente.estadoCliente : "";
    const state_cliente:string = cliente ? cliente.estado_cliente : "";
    

    useEffect(() => {
        if (!switchChangeFact) {
            setTabbs(tipoSerie())
            setCliente(data.clientes)
            setGetCliente({
                documento: documento(), tipoDocumento: tipDocument()
            })
        } else {
            setCliente(clienteInfo)
        }
        // if (tabbs !== 4) {
        //     console.log("AQUI ESTOY");
        //     setVenta({
        //         ...venta,
        //         totalPagado: 0
        //     })
        // }
    }, [switchChangeFact, tabbs])


    const estadoCliente = () => { 
        let text:string = "";
        
        if (!!stateCliente) {
            text += stateCliente;
        } else {
            text += "---";
        }

        if (!!state_cliente) {
            text += " | " + state_cliente;
        } else {
            text += "";
        }

        return text;
    }

    
    return (
        
        <Formik
            initialValues={getCliente}
            validationSchema={ValidDocumento(getCliente.tipoDocumento)}
            enableReinitialize={true}
            onSubmit={(data, { resetForm }) => { 
                handlerGetCliente()
            }}
        >
            {({ errors }:any) => (
                
                <Form onChange={handlerOnChangeGetCli}>
               
                    <div className="boleta-info-cliente grid-2 gap mb-20">

                        <ParrafoForm
                            label="Tipo de venta"
                            value={ tipoVenta }
                            className="info strong capitalize"
                        />

                        {
                            tipoVenta === tipVenta.factura
                            ? (
                                <ParrafoForm
                                    label="Tipo de Documento"
                                    value={getCliente.tipoDocumento}
                                    className="info strong"
                                />
                            ) : (
                                switchChange
                                ? (
                                    <Select
                                        label="Tipo de Documento"
                                        name="tipoDocumento"
                                        onChange={handlerOnChangeGetCli}
                                        value={getCliente.tipoDocumento}
                                    >
                                        <option value="noDocumento">Sin documento</option>
                                        <option value="DNI">DNI</option>
                                        <option value="RUC">RUC</option>
                                    </Select>
                                ) : (
                                    <InputDisable
                                        label="Tipo de Documento"
                                        value={
                                            getCliente.tipoDocumento === "noDocumento" 
                                            ? "Sin documento"
                                            : getCliente.tipoDocumento
                                        }
                                    />
                                )
                            )
                        }
                        
                        {
                            getCliente.tipoDocumento !== "noDocumento"
                            && (
                                <>
                                    {
                                        switchChange
                                        ? (
                                            <div>
                                                <p className="info center mb-8">Nro de documento</p>
                                                <div className="search-general">

                                                    <InputMk
                                                        // label="Nombre"
                                                        type="text"
                                                        name="documento"
                                                        error={errors.documento}
                                                    />

                                                    <button className="btn btn-info" type="submit">
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

                                    <ParrafoForm
                                        label="Estado del cliente"
                                        value={estadoCliente()}
                                        className={
                                            stateCliente === "Registrado" 
                                            ? "primary" 
                                            : stateCliente === "Inexistente"
                                            ? "danger"
                                            : "success"
                                        }
                                    />
                                </>
                            )
                        }

                        


                    </div>
                </Form>
            )} 
        </Formik>

    )
}



/* {
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
}  */


