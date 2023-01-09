import { useState } from "react"
import { BiListPlus } from "react-icons/bi"
import { BtnOnOff } from "../../../../components/btns/BtnOnOff"
import { Input } from "../../../../components/forms/Input"
import { InputDisable } from "../../../../components/forms/InputDisable"
import { SelectSearch } from "../../../../components/forms/SelectSearch"
import { SelectSearchProd } from "../../../../components/forms/SelectSearchProd"
import { Modal } from "../../../../components/modals/Modal"
import { ModalNuevoProducto } from "../../../../components/modals/ModalNuevoProducto"
import { ModalNuevoProveedor } from "../../../../components/modals/ModalNuevoProveedor"
import { detalles } from "../../../../resources/dtos/MovimientoDetalles"
import { getOne } from "../../../../resources/fetch"
import { PRODUCTOS, PRODUCTOS_SEARCH, PROVEEDORES, PROVEEDORES_SEARCH } from "../../../../resources/routes"
import { BoxProducto } from "./BoxProducto"
import { BoxProveedor } from "./BoxProveedor"


interface modalAddProducto{
    modal:boolean;
    setModal:Function;
    movDetails:any;
    handlerAddMovimientoDetalles:Function;
    handlerChangeMovimientoDetalles:Function;
    setMovDetails:Function;
    productosRepe:any;
    switchProductos:any;
    setSwitchProductos:any;
    switchProveedores:any;
    setSwitchProveedores:any;
}

export const ModalAddProducto = ({ 
    modal, 
    setModal, 
    movDetails, 
    handlerAddMovimientoDetalles,
    handlerChangeMovimientoDetalles,
    setMovDetails,
    productosRepe,
    switchProductos,
    setSwitchProductos,
    switchProveedores,
    setSwitchProveedores
}:modalAddProducto) => {

    const [loadProducto, setLoadProducto] = useState<boolean>(false);
    const [productoSolo, setProductoSolo] = useState<any>({});

    const [loadProveedor, setLoadProveedor] = useState<boolean>(false);
    const [proveedorSolo, setProveedorSolo] = useState<any>({});

    const [modalCrearProducto, setModalCrearProducto] = useState<boolean>(false);
    const [modalCrearProveedor, setModalCrearProveedor] = useState<boolean>(false);

    // informacin del cliente desde select
    const handlerDataProductos = (value:any) => {
        setMovDetails({
            ...movDetails,
            producto: {
                id: (value.split('@'))[0],
                nombre: (value.split('@'))[1]
            }
        })
        getOneData((value.split('@'))[0], PRODUCTOS, setLoadProducto, setProductoSolo);

    }
    // informacion de proveedor desde select
    const handlerDataProveedor = (value:any) => { 
        setMovDetails({
            ...movDetails,
            proveedor: {
                id: (value.split('@'))[0],
                nombre: (value.split('@'))[1]
            }
        })
        getOneData((value.split('@'))[0], PROVEEDORES, setLoadProveedor, setProveedorSolo);
    }


    const validarBtnAñadir = () => { 
        if (
            movDetails.producto.id !== 0 &&
            // Number(movDetails.producto.id) !== 0 &&
            Number(movDetails.cantidad) !== 0 && 
            Number(movDetails.precio_parcial) !== 0
        ) {
            return true;
        } else {
            return false;
        }
    }


    const getOneData = async (id:number, endpoint:string, loading:Function, setData:Function) => { 
        loading(true);
        try {
            const response_productos = await getOne(id, endpoint);
            setData(response_productos);
            loading(false);
        } catch (error) {
            loading(true);
            console.log(error);
        }
    }

    // reinicios
    const reiniciarData = () => { // reinicia toda la data
        reinicioProducto()
        reinicioProveedor()
    }

    const reiniciarSelect = () => { // reinicia ambos select
        setSwitchProductos(false);
        setSwitchProveedores(false);
    }

    const reinicioProducto = () => { // reinicia solo producto
        setMovDetails({
            ...movDetails,
            producto: { id: 0, nombre: "" }
        })
        setProductoSolo({})
        setSwitchProductos(false);
    }

    const reinicioProveedor = () => { // reinicia solo proveedor
        setMovDetails({
            ...movDetails,
            proveedor: { id: 0, nombre: "" }
        })
        setProveedorSolo({})
        setSwitchProveedores(false);
    }

    const reiniciarTodo = () => { 
        reiniciarData()
        reiniciarSelect()
    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            width={80}
            btnClose={reiniciarSelect}
        >

            <div className="grid-1 gap">

                <h4 className="desc-form">Descripcion de ingreso del producto</h4>
                <div className="grid-2 gap-v align-center">
                    
                    <div className="mb-15">
                        <SelectSearchProd
                            label="Producto"
                            type="text"
                            respuesta={handlerDataProductos}
                            urlData={PRODUCTOS_SEARCH}
                            repetidos={productosRepe}
                            // link="/productos/crear-producto"
                            modal={setModalCrearProducto}
                            switchSelect={switchProductos}
                            setSwitchSelect={setSwitchProductos}
                            placeholder="Nombre o codigo ..."
                            reinicios={reinicioProducto}
                        />
                    </div>

                    <BoxProducto 
                        productoSolo={productoSolo} 
                        loading={loadProducto} 
                        handlerReset={reinicioProducto} 
                    />
                   
                    <div className="mb-15">
                        <SelectSearch
                            label="Proveedor"
                            type="text"
                            respuesta={handlerDataProveedor}
                            urlData={PROVEEDORES_SEARCH}
                            // link="/proveedores/nuevo"
                            modal={setModalCrearProveedor}
                            switchSelect={switchProveedores}
                            setSwitchSelect={setSwitchProveedores}
                            placeholder="Nombre o razon social ..."
                            reinicios={reinicioProveedor}
                        />
                    </div>          

                    <BoxProveedor 
                        proveedorSolo={proveedorSolo} 
                        loading={loadProveedor} 
                        handlerReset={reinicioProveedor} 
                    />

                </div>

                <div className="grid-4 gap">
                    
                    <Input
                        label="Cantidad de unidades"
                        type="number"
                        name="cantidad"
                        value={movDetails.cantidad}
                        onChange={handlerChangeMovimientoDetalles}
                        noMenos
                    />
                    
                    <Input
                        label="Precio de compra del paquete"
                        type="number"
                        name="precio_parcial"
                        value={movDetails.precio_parcial}
                        onChange={handlerChangeMovimientoDetalles}
                        moneda
                        noMenos
                        tooltip={{
                            anchor: "txt-comp-paquete",
                            descripcion: "Costo total de productos en este paquete",
                        }}
                    />

                    <InputDisable 
                        label="Precio por unidad" 
                        value={movDetails.precio_unidad} 
                        moneda
                        tooltip={{
                            anchor: "txt-precio-unid",
                            descripcion: "Precio por unidad del producto.<br/>Es calculado entre el precio de compra del paquete y la cantidad total de unidades.",
                        }}
                    />

                    <Input
                        label="Detalles"
                        type="text"
                        name="descripcion"
                        value={movDetails.descripcion}
                        onChange={handlerChangeMovimientoDetalles}
                        placeholder="Informacion del producto"
                    />

                </div>

                <div className="grid-4 gap mt-25 mb-15">
                    <div></div>
                    {
                        <BtnOnOff
                            label="Añadir y continuar"
                            estado={validarBtnAñadir()}
                            onClick={() => {
                                handlerAddMovimientoDetalles()
                                reiniciarTodo()
                                setMovDetails(detalles)
                            }}
                            className="success"
                            icon={ <BiListPlus /> }
                            tooltip={{
                                anchor: "btn-add-cont",
                                descripcion: "Requiere seleccionar un producto, establecer una cantidad de unidades y añadir el precio de compra del paquete",
                            }}
                        />
                    }
                    {
                        <BtnOnOff
                            label="Añadir y cerrar"
                            estado={validarBtnAñadir()}
                            onClick={() => {
                                handlerAddMovimientoDetalles()
                                reiniciarTodo()
                                setMovDetails(detalles)
                                setModal(!modal)
                            }}
                            className="info"
                            icon={ <BiListPlus /> }
                            tooltip={{
                                anchor: "btn-add-salir",
                                descripcion: "Requiere seleccionar un producto, establecer una cantidad de unidades y añadir el precio de compra del paquete",
                            }}
                        />
                    }
                    <div></div>
                </div>
            </div>

            <ModalNuevoProducto
                modal={modalCrearProducto}
                setModal={setModalCrearProducto}
                movDetails={movDetails}
                setMovDetails={setMovDetails}
                productoSolo={productoSolo}
                setProductoSolo={setProductoSolo}
            />

            <ModalNuevoProveedor
                modal={modalCrearProveedor}
                setModal={setModalCrearProveedor}
                movDetails={movDetails}
                setMovDetails={setMovDetails}
                // proveedorSolo={proveedorSolo}
                setProveedorSolo={setProveedorSolo}
            />

        </Modal>
    )
}



