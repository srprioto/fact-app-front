import { Form, Formik } from "formik";
import { BiMailSend } from "react-icons/bi";
import { LoadSwitchBtn } from "../../../../components/btns/LoadSwitchBtn";
import { InputMk } from "../../../../components/forms/InputMk";
import { Modal } from "../../../../components/modals/Modal"
import { ValidVentaEmail } from "../../../../resources/validations/VentaEmail";

export const ModalCorreo = ({ modal, setModal, venta, registroFinal, loading }:any) => {
    
    return (
        <Modal
            title="Ingresa e-mail destino"
            modal={modal}
            setModal={setModal}
            width={40}
        >
            <Formik
                initialValues={{
                    email: venta.clientes.email ? venta.clientes.email : ""
                }}

                validationSchema={ValidVentaEmail}

                onSubmit={async (data, { resetForm }) => { 
                    await registroFinal("listo", data.email);
                    // await handlerFacturarCorreo(data.email)
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
                            <LoadSwitchBtn label="Confirmar" loading={loading} icon={ <BiMailSend /> }/>
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
