import { Formik, Form, } from 'formik';
import { BiBrush } from 'react-icons/bi';

import { InputMk } from '../../../components/forms/InputMk';
import { LoadSwitchBtn } from '../../../components/LoadSwitchBtn';
import { ValidCreateProduct } from '../../../resources/validations/Productos';

interface FormsCrearProducto {
    handlerCreateProducto:Function;
    loading:boolean;
}

export const FormsCrearProducto = ({ handlerCreateProducto, loading }:FormsCrearProducto) => {

    return (
        <Formik
            initialValues={{
                codigo:"",
                nombre:"",
                descripcion:"",
                marca:"",
                color:"",
                talla:"",
                // precio_compra:"",
                precio_venta_1:"",
                precio_venta_2:"",
                precio_venta_3:"",
                usuarioId: 1, 
                categoriasId: 1 
            }}

            validationSchema={ValidCreateProduct}

            onSubmit={(data, { resetForm }) => { 
                handlerCreateProducto(data)
                resetForm();                
            }}
        >
            
            {({ errors }) => (

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
                            label="Precio venta 1"
                            type="number"
                            name="precio_venta_1"
                            error={errors.precio_venta_1}
                        />
                        <InputMk 
                            label="Precio venta 2"
                            type="number"
                            name="precio_venta_2"
                            error={errors.precio_venta_2}
                        />
                        <InputMk 
                            label="Precio venta 3"
                            type="number"
                            name="precio_venta_3"
                            error={errors.precio_venta_3}
                        />

                    </div>



                    <div className="grid-4 gap mt-15">
                        <div />

                        <LoadSwitchBtn label="Crear producto" loading={loading} />

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
};
