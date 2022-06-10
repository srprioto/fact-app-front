import { Form, Formik } from "formik";
import { useState } from "react"
import { BiMailSend } from "react-icons/bi";
import { LoadSwitchBtn } from "../../../../components/btns/LoadSwitchBtn";
import { InputMk } from "../../../../components/forms/InputMk";
import { Modal } from "../../../../components/modals/Modal"
import { post } from "../../../../resources/fetch";
import { copy } from "../../../../resources/func/deepCopy";
import { FACTURA } from "../../../../resources/routes";
import { ValidVentaEmail } from "../../../../resources/validations/VentaEmail";

export const ModalCorreo = ({ modal, setModal, venta, confirmarVenta }:any) => {

    // const [correo, setCorreo] = useState<string>("");
    const [loadEmail, setLoadEmail] = useState<boolean>(false);

    const handlerFacturarCorreo = async (correo:string) => {
        
        setLoadEmail(true);

        const localId = venta.locales.id;
        const usuarioId = venta.usuarios.id;
        const updateVenta = copy(venta)

        updateVenta.correo_cliente = correo;
        delete updateVenta.locales
        delete updateVenta.usuarios
        delete updateVenta.created_at
        delete updateVenta.updated_at

        updateVenta.localId = localId
        updateVenta.usuarioId = usuarioId
    
        try {
            await post(updateVenta, FACTURA + "/enviar-correo");
            setLoadEmail(false);
        } catch (error) {
            setLoadEmail(false);
            console.log(error);
        } finally {
            // setModal(false);
            await confirmarVenta("listo");    
        }        
        
    }

    return (
        <Modal
            title="Ingresa e-mail destino"
            modal={modal}
            setModal={setModal}
            width={40}
        >
            <Formik
                initialValues={{
                    email: ""
                }}

                validationSchema={ValidVentaEmail}

                onSubmit={async (data, { resetForm }) => { 
                    await handlerFacturarCorreo(data.email)
                    resetForm();
                }}
            >
                {({ errors }:any) => ( 
                    <Form className="grid-1 gap mt-25 mb-25">

                        <InputMk 
                            label="Email cliente"
                            type="text"
                            name="email"
                            error={errors.email}
                        />

                        <div className="grid-3 gap mt-25">
                            <div></div>
                            <LoadSwitchBtn label="Confirmar" loading={loadEmail} icon={ <BiMailSend /> }/>
                            {/* <button className="btn btn-success" onClick={() => { handlerFacturarCorreo() }}>
                                <BiMailSend /> Confirmar
                            </button> */}
                            <div></div>
                        </div>

                    </Form>
                )}


            </Formik>

        </Modal>
    )
}
