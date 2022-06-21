import { Form, Formik } from "formik";
import { Loading } from "../../../../components/loads/Loading"
import { ValidClienteDni, ValidClienteRuc } from "../../../../resources/validations/Clientes";
import { ClienteInexistente } from "../../../vender/part/factura/ClienteInexistente";
import { CobrarClienteDni } from "./CobrarClienteDni"
import { CobrarClienteRuc } from "./CobrarClienteRuc"
import { ConfirmarVenta } from "./ConfirmarVenta"

interface FormGeneralCobrar{
    loadCliente:boolean;
    getCliente:any
    switchChange:boolean;
    cliente:any
    setCliente:Function;

    setModalConfVenta:Function;
    modalConfVenta:any;
    setModalRechazVenta:Function;
    modalRechazVenta:any;
}

export const FormGeneralCobrar = ({ 
    loadCliente, getCliente, switchChange, cliente, setCliente,
    setModalConfVenta, modalConfVenta, setModalRechazVenta, modalRechazVenta 
}:FormGeneralCobrar) => {

    const handlerOnChangeCliente = (e:any) => { 
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }

    const clienteExist:boolean = !!cliente.estadoCliente;

    return (
        <div className="">

            { cliente.estadoCliente === "Inexistente"
            && <ClienteInexistente tipoDocumento={getCliente.tipoDocumento} /> }
            
            <Formik
                initialValues={cliente}
                // enableReinitialize={loadCliente} // deshabilitar en caso de que de problemas
                enableReinitialize={true}
                validationSchema={getCliente.tipoDocumento === "DNI" ? ValidClienteDni : ValidClienteRuc}
                
                onSubmit={(data, { resetForm }) => { 
                    setModalConfVenta(!modalConfVenta)
                }}
            >
                {({ errors }:any) => (
                    <Form 
                        className="boleta" 
                        onChange={handlerOnChangeCliente}
                    >
                        {
                            clienteExist
                            && (
                                <>
                                    {
                                        loadCliente
                                        ? <Loading />
                                        : (
                                            <>
                                                {
                                                    getCliente.tipoDocumento === "DNI"
                                                    && <CobrarClienteDni
                                                        errors={errors}
                                                        switchChange={switchChange}
                                                        cliente={cliente}
                                                    />
                                                }
                                                {
                                                    getCliente.tipoDocumento === "RUC"
                                                    && <CobrarClienteRuc 
                                                        errors={errors}
                                                        switchChange={switchChange}
                                                        cliente={cliente}
                                                        setCliente={setCliente} 
                                                    />
                                                }
                                            </>
                                        )
                                    }

                                    <div className="mt-15 bb bb-neutro" />
                                    <br />
                                </>
                            )
                        }
                        

                        <ConfirmarVenta
                            // setModalConfVenta={setModalConfVenta}
                            // modalConfVenta={modalConfVenta}
                            clienteExist={clienteExist}
                            setModalRechazVenta={setModalRechazVenta}
                            modalRechazVenta={modalRechazVenta}
                        />

                    </Form>
                )}
            </Formik>
        </div>
    )
}



