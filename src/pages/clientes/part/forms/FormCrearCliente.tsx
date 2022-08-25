import { useState } from "react";
import { Form, Formik } from "formik"
import { BiBrush, BiCheck } from "react-icons/bi";
import { InputMk } from "../../../../components/forms/InputMk";
import { LoadSwitchBtn } from "../../../../components/btns/LoadSwitchBtn";
import { ValidRegistroClienteDni, ValidRegistroClienteRuc } from "../../../../resources/validations/Clientes";
import { SelectMk } from "../../../../components/forms/SelectMk";
import { initialCrearCliente } from "../../../../resources/dtos/Cliente";
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2";
import { BuscarDocum } from "./BuscarDocum";


export const FormCrearCliente = ({ handlerCreate, loading }:any) => {

    const [cliente, setCliente] = useState<any>(initialCrearCliente);
    const [validarCrear, setValidarCrear] = useState<any>({ activarBtn: false, activarMsg: false });


    const handlerOnChange = (e:any) => { 
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        })
    }


    return (
        <Formik        
            initialValues={initialCrearCliente}
            validationSchema={cliente.tipoDocumento === "DNI" ? ValidRegistroClienteDni : ValidRegistroClienteRuc}
            onSubmit={(data, { resetForm }) => { 
                handlerCreate(data);
                resetForm();
            }}
        >
            
            {({ errors }) => (

                <Form className="grid-1 gap mt-25 mb-25" onChange={handlerOnChange}>

                    <h4 className="desc-form">Informacion de registro</h4>
                    <div className="grid-2 gap">

                        <SelectMk
                            label="Tipo de documento"
                            type="text"
                            name="tipoDocumento"
                            error={errors.tipoDocumento}
                        >
                            <option value="DNI">DNI</option>
                            <option value="RUC">RUC</option>
                        </SelectMk>

                        <BuscarDocum
                            cliente={cliente}
                            validarCrear={validarCrear}
                            setValidarCrear={setValidarCrear}
                            errors={errors}
                        />

                    </div>

                    <h4 className="desc-form">Informacion del cliente</h4>
                    <div className="grid-1 gap">

                        <div className="grid-3 gap">

                            <InputMk 
                                label="Razon social"
                                type="text"
                                name="razonSocial"
                                error={errors.razonSocial}
                            />

                            <InputMk 
                                label="Nombre comercial"
                                type="text"
                                name="nombreComercial"
                                error={errors.nombreComercial}
                            />

                            <InputMk 
                                label="Nombre del cliente"
                                type="text"
                                name="nombre"
                                error={errors.nombre}
                            />

                        </div>

                        <div className="grid-3 gap">
                            <InputMk 
                                label="Telefono"
                                type="text"
                                name="telefono"
                                error={errors.telefono}
                            />
                            <InputMk 
                                label="Email"
                                type="text"
                                name="email"
                                error={errors.email}
                            />
                            <SelectMk
                                label="Codigo del país"
                                type="text"
                                name="codigo_pais"
                                error={errors.estado_cliente}
                            >
                                <option value="Normal">Normal</option>
                                <option value="Recurrente">Recurrente</option>
                                <option value="Mayorista">Mayorista</option>
                            </SelectMk>
                        </div>

                    </div>

                    <h4 className="desc-form">Ubicacion</h4>
                    <div className="grid-3 gap">

                        <InputMk 
                            label="Direccion"
                            type="text"
                            name="direccion"
                            error={errors.direccion}
                        />

                        <SelectMk
                            label="Codigo del país"
                            type="text"
                            name="codigo_pais"
                            error={errors.codigo_pais}
                        >
                            <option value="PE">Perú</option>
                        </SelectMk>

                        <InputMk 
                            label="Ubigeo"
                            type="text"
                            name="ubigeo"
                            error={errors.ubigeo}
                        />
                        <InputMk 
                            label="Departamento"
                            type="text"
                            name="departamento"
                            error={errors.departamento}
                        />
                        <InputMk 
                            label="Provincia"
                            type="text"
                            name="provincia"
                            error={errors.provincia}
                        />
                        <InputMk 
                            label="Distrito"
                            type="text"
                            name="distrito"
                            error={errors.distrito}
                        />

                    </div>

                    <div className="grid-4 gap mt-15">
                        <div />

                        <BtnOnOff2
                            label="Registrar cliente"
                            estado={validarCrear.activarBtn}
                            icon={<BiCheck />}
                        >
                            <LoadSwitchBtn label="Registrar cliente" loading={loading} />
                        </BtnOnOff2>
                        
                        <button className="btn btn-primary" type="reset">
                            <BiBrush />
                            Limpiar
                        </button>

                        <div />
                    </div>

                </Form>

            )}
            
        </Formik>
    )
}
