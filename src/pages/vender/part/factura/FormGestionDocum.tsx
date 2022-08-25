import { FormEventHandler } from "react"
import { Form, Formik } from "formik"
import { BiSearchAlt2 } from "react-icons/bi"
import { InputMk } from "../../../../components/forms/InputMk"
import { ParrafoForm } from "../../../../components/forms/ParrafoForm"
import { LoadingImg2 } from "../../../../components/loads/LoadingImg"
import { ValidDocumento } from "../../../../resources/validations/Clientes"


interface formGestionDocum {
    serie:string;
    handlerOnChangeGetCli:FormEventHandler<HTMLFormElement>;
    getCliente:any;
    handlerGetCliente:Function;
    loadCliente:boolean;
    cliente:any;
}

export const FormGestionDocum = ({ 
    serie, 
    handlerOnChangeGetCli, 
    getCliente, 
    handlerGetCliente, 
    loadCliente, 
    cliente,
}:formGestionDocum) => {

    const estadoCliente = () => { 
        let text:string = "";
        
        if (!!cliente.estadoCliente) {
            text += cliente.estadoCliente;
        } else {
            text += "---";
        }

        if (!!cliente.estado_cliente) {
            text += " | " + cliente.estado_cliente;
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

                    <h3>Informacion general</h3>

                    <div className="boleta-info-cliente grid-4 gap mb-20">

                        <ParrafoForm
                            label="Serie"
                            value={ serie }
                            className="info strong"
                        />

                        <ParrafoForm
                            label="Tipo de documento"
                            value={ getCliente.tipoDocumento }
                            className="info strong"
                        />

                        {/* <Select
                            label="Tipo de Documento"
                            name="tipoDocumento"
                            onChange={handlerOnChangeGetCli}
                            value={getCliente.tipoDocumento}
                        >
                            <option value="DNI">DNI</option>
                            <option value="RUC">RUC</option>
                        </Select> */}

                        <div>
                            <p className="info center mb-8">Nro de documento *</p>
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

                        <ParrafoForm
                            label="Estado del cliente"
                            value={estadoCliente()}
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
