import { Form, Formik } from "formik"
import { useEffect, useState } from "react";
import { BiReply } from "react-icons/bi";

import { InputMk } from "../../../../components/forms/InputMk";
import { Loading } from "../../../../components/Loading";
import { LoadSwitchBtn } from "../../../../components/LoadSwitchBtn";

import { getOne } from "../../../../resources/fetch";
import { PRODUCTOS } from "../../../../resources/routes";
import { ValidCreateProduct } from "../../../../resources/validations/Productos";

export const FormEditProducto = ({ id, handlerEdit, loadingUpdate }:any) => {

    const [loadingGetOne, setLoadingGetOne] = useState<boolean>(false);
    const [producto, setProducto] = useState<any>({
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
        usuarioId: 1, 
        categoriasId: 1
    });

    useEffect(() => {
        getDataOne();
    }, []);
    
    const getDataOne = async () => { 
        setLoadingGetOne(true);
        try {
            const response_productos = await getOne(id, PRODUCTOS);
            setProducto(response_productos);
            setLoadingGetOne(false);
        } catch (error) {
            setLoadingGetOne(true);
            console.log(error);     
        }
    }


    return (
        <Formik
            enableReinitialize={true}
            initialValues={producto}
            validationSchema={ValidCreateProduct}
            onSubmit={(data, { resetForm }) => { 
                handlerEdit({
                    codigo: data.codigo,
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    marca: data.marca,
                    color: data.color,
                    talla: data.talla,
                    // precio_compra: data.precio_compra,
                    precio_venta_1: data.precio_venta_1,
                    precio_venta_2: data.precio_venta_2,
                    precio_venta_3: data.precio_venta_3,
                    usuarioId: data.usuarioId,
                    categoriasId: data.categoriasId
                });
                    
            }}
        >

            {({ errors }) => (

                loadingGetOne
                ? <Loading />
                : (
                    <Form className="grid-1 gap mt-25 mb-25">

                        <div className="grid-2 gap">

                            <InputMk 
                                label="Codigo del producto"
                                type="text"
                                name="codigo"
                                error={errors.codigo}
                            />
                            <InputMk 
                                label="Nombre del producto"
                                type="text"
                                name="nombre"
                                error={errors.nombre}
                            />

                        </div>

                        <div className="grid-1 gap">

                            <InputMk 
                                label="Descripcion"
                                type="text"
                                name="descripcion"
                                error={errors.descripcion}
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

                            {/* <InputMk 
                                label="Precio de compra"
                                type="number"
                                name="precio_compra"
                                error={errors.precio_compra}
                            /> */}

                            <InputMk 
                                label="Precio por unidad"
                                type="number"
                                name="precio_venta_1"
                                error={errors.precio_venta_1}
                            />
                            <InputMk 
                                label="Precio al por menor"
                                type="number"
                                name="precio_venta_2"
                                error={errors.precio_venta_2}
                            />
                            <InputMk 
                                label="Precio al por mayor"
                                type="number"
                                name="precio_venta_3"
                                error={errors.precio_venta_3}
                            />

                        </div>



                        <div className="grid-4 gap mt-15">
                            <div />

                            <LoadSwitchBtn label="Editar cliente" loading={loadingUpdate} />

                            <button className="btn btn-primary" type="reset">
                                <BiReply />
                                Restablecer valores
                            </button>

                            <div />
                        </div>

                    </Form>
                )

                


            )}

        </Formik>
    )
}
