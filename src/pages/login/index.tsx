import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { BiLock, BiSubdirectoryRight, BiUser } from "react-icons/bi"
import { useAuth } from "../../auth/useAuth";
import { LoadSwitchBtn2 } from "../../components/btns/LoadSwitchBtn2";
import { InputMk } from "../../components/forms/InputMk";
import { ValidLogin } from "../../resources/validations/Login";


export const IndexLogin = () => {

    const auth = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<boolean>(false);

    useEffect(() => {
        document.title = "FactApp - AddidSsport";
    }, [])

    return (
        <div className="index-login">

            <Formik
                initialValues={{
                    email: "",
                    password: ""
                }}

                validationSchema={ValidLogin}

                onSubmit={async (data, { resetForm }) => { 
                    setLoading(true);
                    setErrorMessage(false);
                    const resto:boolean = await auth.login(data)
                    if (!resto) {
                        setErrorMessage(true);
                        setLoading(false);
                    } 
                    resetForm();
                }}
            >

                {({ errors }:any) => (
                    <Form className="box-login grid-1 gap">
                        
                        <h3 className="">Acceder</h3>

                        <div className="grid-2 gap">
                            <div className="content-input">
                                <div className="item-input">
                                    <label htmlFor="email"><BiUser /></label>
                                    <InputMk 
                                        type="text"
                                        name="email"
                                        error={errors.email}
                                        placeholder="Usuario o E-mail" 
                                    />
                                </div>
                            </div>
                            <div className="content-input">
                                <div className="item-input">
                                    <label htmlFor="password"><BiLock /></label>
                                    <InputMk 
                                        type="password"
                                        name="password"
                                        error={errors.password}
                                        placeholder="Contraseña"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="login-acceder grid-2 gap">

                            <LoadSwitchBtn2
                                loading={loading}
                                className="btn btn-success"
                            >
                                Acceder
                                <BiSubdirectoryRight />
                            </LoadSwitchBtn2>

                        </div>

                        <div className="msg-error-login">
                            {
                                errorMessage && <h5 className="warning center">Correo o contraseña incorrecto</h5>
                            }
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
