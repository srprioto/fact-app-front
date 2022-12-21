import { Form, Formik } from "formik";
import { BiCaretRight } from "react-icons/bi";
import { BtnOnOff2 } from "../../../../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../../../../components/btns/LoadSwitchBtn2";
import { Loading } from "../../../../../../../components/loads/Loading";
import { ValidClienteRuc } from "../../../../../../../resources/validations/Clientes";
import { ClienteInexistente } from "../../../../../../vender/part/factura/ClienteInexistente";
import { VenderClienteRuc } from "../../../../../../vender/part/factura/VenderClienteRuc";

export const FormInfoFacturaConv = ({ 
    clienteConv,
    getCliente,
    handlerOnChangeCliente,
    loadCliente,
    selectTipoComp,
    loadingPost,
    enviarVenta
}:any) => {

    // const showFormsCliente:boolean = getCliente.documento.length === (getCliente.tipoDocumento === "RUC" ? 11 : 8);
    const showFormsCliente:boolean = getCliente.documento.length === 11;

    // const validacionDoc = () => { 
    //     if (getCliente.tipoDocumento === "DNI") {
    //         return ValidClienteDni;
    //     } else if (getCliente.tipoDocumento === "RUC") {
    //         return ValidClienteRuc
    //     } else if (getCliente.tipoDocumento === "noDocumento") {
    //         return null
    //     }
    // }


    return (
        <div>

            { clienteConv.estadoCliente === "Inexistente"
            && <ClienteInexistente tipoDocumento={getCliente.tipoDocumento} /> }
            
            <Formik
                initialValues={clienteConv}
                enableReinitialize={true}
                validationSchema={ValidClienteRuc}
                onSubmit={(data, { resetForm }) => { 
                    enviarVenta()
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
                                    <VenderClienteRuc 
                                        errors={errors} 
                                        cliente={clienteConv} 
                                    />
                                )
                            )
                        }

                        <div className="grid-3 gap mt-35">
                            <div></div>
                            <BtnOnOff2
                                estado={(!!selectTipoComp && showFormsCliente)}
                                icon={<BiCaretRight />}
                                label="Confirmar"
                            >
                                <LoadSwitchBtn2
                                    loading={loadingPost}
                                    className="btn btn-success"
                                    // handler={enviarVenta}
                                >
                                    <BiCaretRight /> Confirmar
                                </LoadSwitchBtn2>
                            </BtnOnOff2>

                        </div>

                    </Form>
                )}
            </Formik>

        </div>
    )
}
