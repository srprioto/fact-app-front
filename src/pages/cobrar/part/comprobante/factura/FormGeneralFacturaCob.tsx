import { Form, Formik } from "formik";
import { Loading } from "../../../../../components/loads/Loading"
import { ValidClienteRuc } from "../../../../../resources/validations/Clientes";
import { ClienteInexistente } from "../../../../vender/part/factura/ClienteInexistente";
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

    const stateCliente:string = cliente ? cliente.estadoCliente : "";
    const showFormsCliente:boolean = getCliente.documento.length === 11;
    
    const handlerOnChangeCliente = (e:any) => { 
        setCliente({
            ...cliente, [e.target.name]: e.target.value
        })
    }


    return (
        <div>

            { stateCliente === "Inexistente"
            && <ClienteInexistente tipoDocumento={getCliente.tipoDocumento} /> }
            
            <Formik
                initialValues={cliente}
                enableReinitialize={true}
                validationSchema={ValidClienteRuc}
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
                                    <CobrarClienteRuc 
                                        errors={errors}
                                        switchChange={switchChange}
                                        cliente={cliente}
                                    />
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

// const validacionDoc = () => { 
//     if (getCliente.tipoDocumento === "DNI") {
//         return ValidClienteDni;
//     } else if (getCliente.tipoDocumento === "RUC") {
//         return ValidClienteRuc;
//     } else if (getCliente.tipoDocumento === "noDocumento") {
//         return null;
//     }
// }