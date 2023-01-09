import { Form, Formik } from "formik";
import { useState } from "react";
import { LoadSwitchBtn } from "../../../../components/btns/LoadSwitchBtn";
import { Checkbox3 } from "../../../../components/forms/Checkbox3";
import { InputMk } from "../../../../components/forms/InputMk";
import { SelectMk } from "../../../../components/forms/SelectMk";
import { Modal } from "../../../../components/modals/Modal"
import { put } from "../../../../resources/fetch";
import { INGRESOS_EGRESOS } from "../../../../resources/routes";
import { ValidCreateIngresoEgreso } from "../../../../resources/validations/ingresosEgresos";

interface modalEditarIngresEgreso {
    modal:boolean;
    setModal:Function;
    ingresoEgreso:any;
    getData:Function;
    locales:Array<any>;
}

export const ModalEditarIngresEgreso = ({ 
    modal, 
    setModal, 
    ingresoEgreso, 
    getData, 
    locales 
}:modalEditarIngresEgreso) => {
    
    const [loadingPost, setLoadingPost] = useState<boolean>(false);
    const [switchLocal, setSwitchLocal] = useState<boolean>(!!ingresoEgreso.locales);

    return (
        <Modal
            modal={modal}
            setModal={setModal}
            titulo="Editar el ingreso o egreso"
            width={60}
        >
            <Formik
                initialValues={{
                    monto: ingresoEgreso.monto,
                    descripcion: ingresoEgreso.descripcion,
                    addLocal: switchLocal,
                    locales: ingresoEgreso.locales ? ingresoEgreso.locales.id : "2",
                }}
                validationSchema={ValidCreateIngresoEgreso}
                onSubmit={async (data, { resetForm }) => { 
                    setLoadingPost(true);
                    const dataUpdate:any = {
                        monto: data.monto,
                        descripcion: data.descripcion,
                        addLocal: switchLocal,
                        locales: Number(data.locales)
                    }
                    try {
                        await put(ingresoEgreso.id, dataUpdate, INGRESOS_EGRESOS);
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
                                tooltip={{
                                    anchor: "txt-monto-movim",
                                    descripcion: "El monto del movimiento puede ser negativo o positivo"
                                }}
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
                                    tooltip={{
                                        anchor: "btn-check-ligar",
                                        descripcion: "Permite establecer relación entre el movimiento y un local especifico"
                                    }}
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
                            <LoadSwitchBtn label="Editar movimiento" loading={loadingPost} />
                        </div>

                    </Form>
                )}

            </Formik>
        </Modal>
    )
}
