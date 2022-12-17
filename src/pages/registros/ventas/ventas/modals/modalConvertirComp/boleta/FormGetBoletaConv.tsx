import { Form, Formik } from "formik"
import { BiSearchAlt2 } from "react-icons/bi";
import { InputMk } from "../../../../../../../components/forms/InputMk";
import { ParrafoForm } from "../../../../../../../components/forms/ParrafoForm";
import { Select2 } from "../../../../../../../components/forms/Select2";
import { LoadingImg2 } from "../../../../../../../components/loads/LoadingImg";
import { ValidDocumento } from "../../../../../../../resources/validations/Clientes";

export const FormGetBoletaConv = ({ 
    handlerGetCliente, 
    clienteConv, 
    handlerOnChangeGetCli, 
    getCliente, 
    loadCliente,
    selectTipoComp
}:any) => {
    

    const estadoCliente = () => { 
        let text:string = "";
        
        if (!!clienteConv.estadoCliente) {
            text += clienteConv.estadoCliente;
        } else {
            text += "---";
        }

        if (!!clienteConv.estado_cliente) {
            text += " | " + clienteConv.estado_cliente;
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
                            label="Tipo de comprobante"
                            value={ selectTipoComp }
                            className="info strong capitalize"
                        />

                        <Select2
                            label="Tipo de Documento"
                            name="tipoDocumento"
                            onChange={handlerOnChangeGetCli}
                            value={getCliente.tipoDocumento}
                            defaultValue="noDocumento"
                        >
                            <option value="noDocumento">Sin documento</option>
                            <option value="DNI">DNI</option>
                            <option value="RUC">RUC</option>
                        </Select2>
                        {
                            getCliente.tipoDocumento !== "noDocumento"
                            && (
                                <>
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
                                            clienteConv.estadoCliente === "Registrado" 
                                            ? "primary" 
                                            : clienteConv.estadoCliente === "Inexistente"
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
