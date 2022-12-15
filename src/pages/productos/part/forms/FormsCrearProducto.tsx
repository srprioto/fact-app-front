import { Formik, Form, } from 'formik';
import { BiBrush } from 'react-icons/bi';
import { InputMk } from '../../../../components/forms/InputMk';
import { LoadSwitchBtn } from '../../../../components/btns/LoadSwitchBtn';
import { ValidCreateProduct, ValidCreateProductCompleto } from '../../../../resources/validations/Productos';
import { useState } from 'react';
import { Checkbox2 } from '../../../../components/forms/Checkbox2';


interface formsCrearProducto {
    handlerCreateProducto:Function;
    loading:boolean;
    clearInput:boolean;
    setClearInput:Function;
}

export const FormsCrearProducto = ({ 
    handlerCreateProducto, 
    loading, 
    clearInput, 
    setClearInput 
}:formsCrearProducto) => {

    const [switchCrear, setSwitchCrear] = useState<boolean>(false);

    return (
        <div>
            <Formik
                initialValues={{
                    switchCrear: switchCrear,
                    codigo:"",
                    nombre:"",
                    descripcion:"",
                    marca:"",
                    color:"",
                    talla:"",
                    precio_compra:"",
                    precio_venta_1:"",
                    precio_venta_2:"",
                    precio_venta_3:"",
                    categoriasId: null
                }}

                validationSchema={switchCrear ? ValidCreateProductCompleto : ValidCreateProduct}

                onSubmit={(data, { resetForm }) => { 
                    data.switchCrear = switchCrear;
                    handlerCreateProducto(data)
                    !clearInput && resetForm();
                }}
            >
                
                {({ errors }) => (

                    <Form className="grid-1 gap mb-25">
                        <div className="check-crear-producto">
                            <div className="check-form">
                                <label htmlFor="switchCrear">
                                    { !switchCrear ? "Producto rápido" : "Producto completo" }
                                </label>
                                <Checkbox2
                                    name="switchCrear"
                                    checked={switchCrear}
                                    handlerCheck={ () => setSwitchCrear(!switchCrear) }
                                />
                            </div>
                        </div>
                        {
                            switchCrear
                            && (
                                <div className="grid-1 gap">
                                    <InputMk 
                                        label="Codigo del producto"
                                        type="text"
                                        name="codigo"
                                        error={errors.codigo}
                                    />
                                </div>
                            )
                        }
                        <div className="grid-3 gap ">
                            
                            <InputMk 
                                label="Nombre del producto"
                                type="text"
                                name="nombre"
                                error={errors.nombre}
                            />
                            <InputMk 
                                label="Descripcion"
                                type="text"
                                name="descripcion"
                                error={errors.descripcion}
                            />

                            <InputMk 
                                label="Precio de compra"
                                type="number"
                                name="precio_compra"
                                error={errors.precio_compra}
                                moneda
                            />

                        </div>

                        <div className="grid-3 gap">

                            <InputMk 
                                label="Marca"
                                type="text"
                                name="marca"
                                error={errors.marca}
                            />
                            <InputMk 
                                label="Color"
                                type="text"
                                name="color"
                                error={errors.color}
                            />
                            <InputMk 
                                label="Talla"
                                type="text"
                                name="talla"
                                error={errors.talla}
                            />

                        </div>

                        <div className="grid-3 gap">
                            <InputMk 
                                label="Precio por unidad"
                                type="number"
                                name="precio_venta_1"
                                error={errors.precio_venta_1}
                                moneda
                            />
                            <InputMk 
                                label="Precio al por menor"
                                type="number"
                                name="precio_venta_2"
                                error={errors.precio_venta_2}
                                moneda
                            />
                            <InputMk 
                                label="Precio al por mayor"
                                type="number"
                                name="precio_venta_3"
                                error={errors.precio_venta_3}
                                moneda
                            />

                        </div>

                        <div className="grid-4 gap mt-25">
                            <div className="middle">
                                <Checkbox2
                                    label='Mantener informacion'
                                    name="clearInput"
                                    checked={clearInput}
                                    handlerCheck={ () => setClearInput(!clearInput) }
                                />
                            </div>

                            <LoadSwitchBtn label="Crear producto" loading={loading} />

                            <button className="btn btn-primary" type="reset">
                                <BiBrush />
                                Limpiar
                            </button>

                        </div>

                    </Form>


                )}


            </Formik>
        </div>
    )
};
