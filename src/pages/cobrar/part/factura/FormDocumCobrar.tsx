import { Form, Formik } from "formik"
import { useEffect } from "react"
import { BiSearchAlt2 } from "react-icons/bi"
import { InputDisable } from "../../../../components/forms/InputDisable"
import { InputMk } from "../../../../components/forms/InputMk"
import { ParrafoForm } from "../../../../components/forms/ParrafoForm"
import { LoadingImg2 } from "../../../../components/loads/LoadingImg"
import { clienteInfo } from "../../../../resources/dtos/Cliente"
import { ValidDocumento } from "../../../../resources/validations/Clientes"

interface formDocumCobrar{
    serie:string;
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
}

export const FormDocumCobrar = ({ 
    serie, 
    cliente, 
    getCliente, 
    switchChange, 
    handlerOnChangeGetCli, 
    handlerGetCliente,
    loadCliente,

    switchChangeFact, setTabbs, data, tipoSerie, tabbs, setCliente, setGetCliente
}:formDocumCobrar) => {

    const tipDocument = data.clientes && data.clientes.tipoDocumento
    const documento = data.clientes && data.clientes.numero_documento

    useEffect(() => {
        if (!switchChangeFact) {
            setTabbs(tipoSerie())
            setCliente(data.clientes)
            setGetCliente({
                documento: documento, tipoDocumento: tipDocument
            })
        } else {
            setCliente(clienteInfo(""))
        }
    }, [switchChangeFact, tabbs])


    return (
        
        <Formik
            initialValues={getCliente}
            validationSchema={ValidDocumento(getCliente.tipoDocumento)}
            // enableReinitialize={true}
            onSubmit={(data, { resetForm }) => { 
                handlerGetCliente()
            }}
        >
            {({ errors }:any) => (
                
                <Form onChange={handlerOnChangeGetCli}>
               
                    <div className="boleta-info-cliente grid-2 gap mb-20">

                        <ParrafoForm
                            label="Serie"
                            value={ serie }
                            className="info strong"
                        />

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
                            label="Tipo de Documento"
                            value={getCliente.tipoDocumento}
                            className="info strong"
                        />

                        <ParrafoForm
                            label="Estado del cliente"
                            value={cliente.estadoCliente ? cliente.estadoCliente : "---"}
                            className={
                                cliente.estadoCliente === "Registrado" 
                                ? "primary" 
                                : cliente.estadoCliente === "Inexistente"
                                ? "danger"
                                : "success"
                            }
                        />

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


