import { Form, Formik } from "formik";
import { BiSearchAlt2 } from "react-icons/bi";
import { InputMk } from "../../../../../../../components/forms/InputMk";
import { ParrafoForm } from "../../../../../../../components/forms/ParrafoForm";
import { LoadingImg2 } from "../../../../../../../components/loads/LoadingImg";
import { ValidDocumento } from "../../../../../../../resources/validations/Clientes";

export const FormGetFacturaConv = ({ 
    clienteConv, 
    selectTipoComp,
    getCliente,
    loadCliente,
    handlerOnChangeGetCli,
    handlerGetCliente
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
                handlerGetCliente();
            }}
        >
            {({ errors }:any) => (
                <Form onChange={handlerOnChangeGetCli}>

                    <h3>Informacion general</h3>

                    <div className="boleta-info-cliente grid-4 gap mb-20">

                        <ParrafoForm
                            label="Tipo de venta"
                            value={ selectTipoComp }
                            className="info strong capitalize"
                        />

                        <ParrafoForm
                            label="Tipo de Documento"
                            value={getCliente.tipoDocumento}
                            className="info strong"
                        />
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
