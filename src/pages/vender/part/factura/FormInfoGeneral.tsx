import { Form, Formik } from "formik";
import { Loading } from "../../../../components/loads/Loading";
import { ValidClienteDni } from "../../../../resources/validations/Clientes";
import { AccionesVenta } from "./AccionesVenta";
import { VenderClienteDni } from "./VenderClienteDni";
import { VenderClienteRuc } from "./VenderClienteRuc";

export const FormInfoGeneral = ({ 
    cliente, 
    loadCliente, 
    getCliente, 
    setCliente, 
    handlerOnChangeCliente,
    loadVenta,
    setShowWindow,
    verificarCaja,
    handlerVenta,
    verificarVender
}:any) => {

    return (
        <Formik
            initialValues={cliente}
            enableReinitialize={true}
            validationSchema={ValidClienteDni}
            
            onSubmit={(data, { resetForm }) => { 
                verificarCaja(handlerVenta)
            }}
        >
            {({ errors }:any) => (
                <Form className="boleta">
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

                    <AccionesVenta
                        loadVenta={loadVenta}
                        setShowWindow={setShowWindow}
                        verificarCaja={verificarCaja}
                        handlerVenta={handlerVenta}
                        verificarVender={verificarVender}
                    />

                </Form>
            )}
        </Formik>
    )
}
