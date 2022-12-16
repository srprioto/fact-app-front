import { FormEventHandler } from "react";
import { Form, Formik } from "formik";
import { BiCheck } from "react-icons/bi";
import { BtnOnOff2 } from "../../../../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../../../../components/btns/LoadSwitchBtn2";
import { Loading } from "../../../../../../../components/loads/Loading";
import { ValidClienteDni, ValidClienteRuc } from "../../../../../../../resources/validations/Clientes";
import { ClienteInexistente } from "../../../../../../vender/part/factura/ClienteInexistente";
import { VenderClienteDni } from "../../../../../../vender/part/factura/VenderClienteDni";
import { VenderClienteRuc } from "../../../../../../vender/part/factura/VenderClienteRuc";

interface formInfoBoletaConv {
    clienteConv:any;
    getCliente:any
    handlerOnChangeCliente:FormEventHandler<HTMLFormElement>;
    loadCliente:boolean;
    selectTipoComp:string;
    loadingPost:boolean;
    enviarVenta:Function
}

export const FormInfoBoletaConv = ({ 
    clienteConv, 
    getCliente, 
    handlerOnChangeCliente, 
    loadCliente,
    selectTipoComp,
    loadingPost,
    enviarVenta
}:formInfoBoletaConv) => {

    const showFormsCliente:boolean = getCliente.documento.length === (getCliente.tipoDocumento === "RUC" ? 11 : 8);

    const validacionDoc = () => { 
        if (getCliente.tipoDocumento === "DNI") {
            return ValidClienteDni;
        } else if (getCliente.tipoDocumento === "RUC") {
            return ValidClienteRuc
        } else if (getCliente.tipoDocumento === "noDocumento") {
            return null
        }
    }


    const validarPost = () => { 
        if (
            (!!selectTipoComp && getCliente.tipoDocumento === "noDocumento") || 
            (!!selectTipoComp && showFormsCliente)
        ) {
            return true;  
        } else {
            return false;
        }
    }


    return (
        <div>

            { clienteConv.estadoCliente === "Inexistente"
            && <ClienteInexistente tipoDocumento={getCliente.tipoDocumento} /> }
            
            <Formik
                initialValues={clienteConv}
                enableReinitialize={true}
                validationSchema={validacionDoc()}
                onSubmit={(data, { resetForm }) => { 
                    enviarVenta();
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
                                            && <VenderClienteRuc errors={errors} cliente={clienteConv} />
                                        }
                                    </>
                                )
                            )
                        }

                        <div className="grid-3 gap mt-35">
                            <div></div>
                            <BtnOnOff2
                                estado={validarPost()}
                                icon={<BiCheck />}
                                label="Confirmar"
                            >
                                <LoadSwitchBtn2
                                    loading={loadingPost}
                                    className="btn btn-success"
                                    // handler={enviarVenta}
                                >
                                    <BiCheck /> Confirmar
                                </LoadSwitchBtn2>
                            </BtnOnOff2>

                        </div>

                    </Form>
                )}
            </Formik>

        </div>
    )
}
