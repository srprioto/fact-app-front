import { Form, Formik } from "formik";
import { Loading } from "../../../../../components/loads/Loading"
import { ValidClienteDni, ValidClienteRuc } from "../../../../../resources/validations/Clientes";
import { ClienteInexistente } from "../../../../vender/part/factura/ClienteInexistente";
import { CobrarClienteDni } from "../CobrarClienteDni"
import { CobrarClienteRuc } from "../CobrarClienteRuc"
import { ConfirmarVenta } from "../ConfirmarVenta"

interface formGeneralCobrar{
    loadCliente:boolean;
    getCliente:any
    switchChange:boolean;
    cliente:any
    setCliente:Function;
    setModalConfVenta:Function;
    modalConfVenta:any;
    setModalRechazVenta:Function;
    modalRechazVenta:any;
    activarConfirmarVenta:Function;
}

export const FormGeneralFacturaCob = ({ 
    loadCliente, getCliente, switchChange, cliente, setCliente,
    setModalConfVenta, modalConfVenta, setModalRechazVenta, modalRechazVenta,
    activarConfirmarVenta
}:formGeneralCobrar) => {

    const handlerOnChangeCliente = (e:any) => { 
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }


    const stateCliente:string = cliente ? cliente.estadoCliente : "";


    const validacionDoc = () => { 
        if (getCliente.tipoDocumento === "DNI") {
            return ValidClienteDni;
        } else if (getCliente.tipoDocumento === "RUC") {
            return ValidClienteRuc;
        } else if (getCliente.tipoDocumento === "noDocumento") {
            return null;
        }
    }


    const showFormsCliente:boolean = getCliente.documento.length === (getCliente.tipoDocumento === "RUC" ? 11 : 8);


    return (
        <div className="">

            { stateCliente === "Inexistente"
            && <ClienteInexistente tipoDocumento={getCliente.tipoDocumento} /> }
            
            <Formik
                initialValues={cliente}
                // enableReinitialize={loadCliente} // deshabilitar en caso de que de problemas
                enableReinitialize={true}
                validationSchema={validacionDoc()}
                
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
                            showFormsCliente
                            && (
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
                                            />
                                        }
                                    </>
                                )
                            )
                        }

                        <ConfirmarVenta
                            setModalRechazVenta={setModalRechazVenta}
                            modalRechazVenta={modalRechazVenta}
                            activarConfirmarVenta={activarConfirmarVenta}
                            getCliente={getCliente}
                            showFormsCliente={showFormsCliente}
                        />

                    </Form>
                )}
            </Formik>
        </div>
    )
}



