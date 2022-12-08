import { Form, Formik } from "formik"
import { BiSearchAlt2 } from "react-icons/bi"
import { InputDisable } from "../../../../components/forms/InputDisable"
import { InputMk } from "../../../../components/forms/InputMk"
import { ParrafoForm } from "../../../../components/forms/ParrafoForm"
import { Select } from "../../../../components/forms/Select"
import { LoadingImg2 } from "../../../../components/loads/LoadingImg"
import { tipoVenta as tipVenta } from "../../../../resources/dtos/VentasDto";
import { ValidDocumento } from "../../../../resources/validations/Clientes"

interface formDocumCobrar{
    tipoVenta:string;
    cliente:any;
    getCliente:any;
    switchChange:boolean;
    handlerOnChangeGetCli:any;
    handlerGetCliente:Function;
    loadCliente:boolean;
}

export const FormDocumCobrar = ({ 
    tipoVenta,
    cliente, 
    getCliente, 
    switchChange, 
    handlerOnChangeGetCli, 
    handlerGetCliente,
    loadCliente,
}:formDocumCobrar) => {

    const stateCliente:string = cliente ? cliente.estadoCliente : "";
    const state_cliente:string = cliente ? cliente.estado_cliente : "";

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


