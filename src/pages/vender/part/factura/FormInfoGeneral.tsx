import { FormEventHandler } from "react";
import { Form, Formik } from "formik";
import { Loading } from "../../../../components/loads/Loading";
import { ValidClienteDni, ValidClienteRuc } from "../../../../resources/validations/Clientes";
import { AccionesVenta } from "./AccionesVenta";
import { VenderClienteDni } from "./VenderClienteDni";
import { VenderClienteRuc } from "./VenderClienteRuc";
import { ClienteInexistente } from "./ClienteInexistente";

interface formInfoGeneral {
    cliente:any;
    loadCliente:boolean;
    getCliente:any;
    loadVenta:boolean;
    setShowWindow:Function;
    // setCliente:Function;
    verificarCaja:Function;
    handlerVenta:Function;
    verificarVender:Function;
    handlerOnChangeCliente:FormEventHandler<HTMLFormElement>
    // serie:string;
    tipo_venta:string;
    labelBtn:string;
    tipoDoc?:string;
}

export const FormInfoGeneral = ({ 
    cliente, 
    loadCliente, 
    getCliente, 
    loadVenta,
    setShowWindow,
    verificarCaja,
    // setCliente,
    handlerVenta,
    verificarVender,
    handlerOnChangeCliente,
    // serie,
    tipo_venta,
    labelBtn,
    tipoDoc
}:formInfoGeneral) => {

    // useEffect(() => {
    //     setCliente({
    //         ...cliente,
    //         numero_documento: getCliente.documento
    //     })
    // }, [getCliente.documento])

    const validacionDoc = () => { 
        if (getCliente.tipoDocumento === "DNI") {
            return ValidClienteDni;
        } else if (getCliente.tipoDocumento === "RUC") {
            return ValidClienteRuc
        } else if (getCliente.tipoDocumento === "noDocumento") {
            return null
        }
    }

    const showFormsCliente:boolean = getCliente.documento.length === (getCliente.tipoDocumento === "RUC" ? 11 : 8);
    
    
    return (
        <div>

            { cliente.estadoCliente === "Inexistente"
            && <ClienteInexistente tipoDocumento={getCliente.tipoDocumento} /> }
            
            <Formik
                initialValues={cliente}
                // enableReinitialize={loadCliente} // deshabilitar en caso de que de problemas
                enableReinitialize={true}
                validationSchema={validacionDoc()}
                
                onSubmit={(data, { resetForm }) => { 
                    verificarCaja(handlerVenta, tipo_venta)
                }}
            >
                {({ errors }:any) => (
                    <Form 
                        className="boleta"
                        onChange={handlerOnChangeCliente}
                    >
                        {
                            showFormsCliente
                            && (
                                loadCliente
                                ? <Loading />
                                : (
                                    <>
                                        {
                                            getCliente.tipoDocumento === "DNI"
                                            && <VenderClienteDni errors={errors} />
                                        }
                                        {
                                            getCliente.tipoDocumento === "RUC"
                                            && <VenderClienteRuc errors={errors} cliente={cliente} />
                                        }
                                    </>
                                )
                            )
                        }

                        <AccionesVenta
                            loadVenta={loadVenta}
                            setShowWindow={setShowWindow}
                            verificarVender={verificarVender}
                            // estadoCliente={!!cliente.estadoCliente}
                            labelBtn={labelBtn}
                            tipoDoc={tipoDoc}
                            showFormsCliente={showFormsCliente}
                        />

                    </Form>
                )}
            </Formik>

        </div>

        
    )
}
