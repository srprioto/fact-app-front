import { Form, Formik } from "formik";
import { useState } from "react";
import { useAuth } from "../../../auth/useAuth";
import { LoadSwitchBtn } from "../../../components/btns/LoadSwitchBtn";
import { Checkbox3 } from "../../../components/forms/Checkbox3";
import { InputMk } from "../../../components/forms/InputMk";
import { SelectMk } from "../../../components/forms/SelectMk";
import { Modal } from "../../../components/modals/Modal"
import { post } from "../../../resources/fetch";
import { INGRESOS_EGRESOS } from "../../../resources/routes";
import { ValidCreateIngresoEgreso } from "../../../resources/validations/ingresosEgresos";


interface modalAddIngresoEgreso {
    modal:boolean;
    setModal:Function;
    getData:Function;
    locales:Array<any>;
}


export const ModalAddIngresoEgreso = ({ modal, setModal, getData, locales }:modalAddIngresoEgreso) => {

    const auth = useAuth();

    const [loadingPost, setLoadingPost] = useState<boolean>(false);
    const [switchLocal, setSwitchLocal] = useState<boolean>(true);


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            titulo="Añade un nuevo ingreso o egreso"
            width={60}
        >
            <Formik
                initialValues={{
                    monto: "",
                    descripcion: "",
                    addLocal: switchLocal,
                    locales: 2,
                    usuarios: auth.userInfo.sub
                }}
                validationSchema={ValidCreateIngresoEgreso}
                onSubmit={async (data, { resetForm }) => { 
                    setLoadingPost(true);
                    const dataUpdate:any = {
                        monto: data.monto,
                        descripcion: data.descripcion,
                        addLocal: switchLocal,
                        locales: Number(data.locales),
                        usuarios: Number(data.usuarios)
                    }
                    try {
                        await post(dataUpdate, INGRESOS_EGRESOS);
                        setLoadingPost(false);
                    } catch (error) {
                        setLoadingPost(true);
                        console.log(error);
                    } finally {
                        getData();
                        setModal(false);
                    }
                }}
            >
                {({ values, errors }:any) => (
                    <Form className="box m-0 grid-1 gap">
                        <div className="grid-2 gap">
                            <InputMk
                                label={
                                    values.monto > 0
                                    ? "Monto de ingreso"
                                    : values.monto < 0
                                    ? "Monto de egreso"
                                    : "Monto del movimiento"
                                }
                                type="number"
                                name="monto"
                                color={
                                    values.monto > 0
                                    ? "success-i"
                                    : values.monto < 0
                                    ? "danger-i"
                                    : "secundary"
                                }
                                colorLabel={
                                    values.monto > 0
                                    ? "success"
                                    : values.monto < 0
                                    ? "danger"
                                    : "info"
                                }
                                error={errors.monto}
                            />

                            <InputMk 
                                label="Descripcion"
                                type="text"
                                name="descripcion"
                                error={errors.descripcion}
                            />

                            <div className="pb-20">
                                <Checkbox3
                                    label="¿Ligar a un local?"
                                    name="switchLocal"
                                    checked={switchLocal}
                                    handlerCheck={ () => setSwitchLocal(!switchLocal) }
                                />
                            </div>

                            {
                                switchLocal
                                && (
                                    <SelectMk
                                        label="Local afectado"
                                        name="locales"
                                        error={errors.locales}
                                    >
                                        {
                                            locales.map((e:any) => {
                                                return (
                                                    <option key={e.id} value={e.id}>{ e.nombre }</option>
                                                )
                                            })
                                        }
                                    </SelectMk>
                                )
                            }
                        </div>

                        <div className="grid-3 gap">
                            <div />
                            <LoadSwitchBtn label="Añadir movimiento" loading={loadingPost} />
                        </div>
                    </Form>
                )}

            </Formik>

        </Modal>
    )
}
