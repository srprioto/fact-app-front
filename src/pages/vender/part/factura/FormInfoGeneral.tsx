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
    handlerOnChangeCliente
}:formInfoGeneral) => {

    // useEffect(() => {
    //     setCliente({
    //         ...cliente,
    //         numero_documento: getCliente.documento
    //     })
    // }, [getCliente.documento])
    
    return (
        <div>

            { cliente.estadoCliente === "Inexistente" && <ClienteInexistente tipoDocumento={getCliente.tipoDocumento} /> }
            
            <Formik
                initialValues={cliente}
                // enableReinitialize={loadCliente} // deshabilitar en caso de que de problemas
                enableReinitialize={true}
                validationSchema={getCliente.tipoDocumento === "DNI" ? ValidClienteDni : ValidClienteRuc}
                
                onSubmit={(data, { resetForm }) => { 
                    verificarCaja(handlerVenta)
                }}
            >
                {({ errors }:any) => (
                    <Form 
                        className="boleta" 
                        onChange={handlerOnChangeCliente}
                    >
                        {
                            !!cliente.estadoCliente
                            && (
                                <>
                                    {
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
                                    }
                                    <div style={{height: "90px"}} />
                                </>
                            )
                        }


                        <AccionesVenta
                            loadVenta={loadVenta}
                            setShowWindow={setShowWindow}
                            verificarVender={verificarVender}
                            estadoCliente={!!cliente.estadoCliente}
                        />

                    </Form>
                )}
            </Formik>

        </div>

        
    )
}
