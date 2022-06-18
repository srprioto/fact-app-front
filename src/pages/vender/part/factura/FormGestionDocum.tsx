import { Form, Formik } from "formik"
import { BiSearchAlt2 } from "react-icons/bi"
import { InputMk } from "../../../../components/forms/InputMk"
import { ParrafoForm } from "../../../../components/forms/ParrafoForm"
import { Select } from "../../../../components/forms/Select"
import { LoadingImg2 } from "../../../../components/loads/LoadingImg"
import { ValidDocumento } from "../../../../resources/validations/Clientes"

export const FormGestionDocum = ({ 
    serie, 
    handlerOnChangeGetCli, 
    getCliente, 
    handlerGetCliente, 
    loadCliente, 
    cliente 
}:any) => {
    return (

        <Formik
            initialValues={getCliente}
            validationSchema={ValidDocumento}
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
                            <p className="info center mb-8">Nro de documento *</p>
                            <div className="search-general">

                                <InputMk 
                                    // label="Nombre"
                                    type="text"
                                    name="documento"
                                    error={errors.nombre}
                                />

                                <button className="btn btn-info" type="submit">
                                    { loadCliente ? <LoadingImg2 size="23px" /> : <BiSearchAlt2 /> }
                                </button>
                            </div>
                        </div>

                        <ParrafoForm
                            label="Estado del cliente"
                            value={cliente.estadoCliente ? cliente.estadoCliente : "---"}
                            className={cliente.estadoCliente === "Registrado" ? "primary" : "success"}
                        />

                    </div>
                </Form>
            )}

        </Formik>
        
    )
}
