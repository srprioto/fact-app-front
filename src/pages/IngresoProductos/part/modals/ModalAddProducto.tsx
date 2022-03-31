import { BiListPlus } from "react-icons/bi"
import { BtnOnOff } from "../../../../components/btns/BtnOnOff"
import { Input } from "../../../../components/forms/Input"
import { InputDisable } from "../../../../components/forms/InputDisable"
import { SelectSearch } from "../../../../components/forms/SelectSearch"
import { Modal } from "../../../../components/modals/Modal"
import { PRODUCTOS_SEARCH, PROVEEDORES_SEARCH } from "../../../../resources/routes"


interface ModalAddProducto{
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
}:ModalAddProducto) => {


    const handlerDataProductos = (value:any) => {
        setMovDetails({
            ... movDetails,
            producto: {
                id: (value.split('@'))[0],
                nombre: (value.split('@'))[1]
            }
        })
    }
    // informacion de proveedor desde select
    const handlerDataProveedor = (value:any) => { 
        setMovDetails({
            ... movDetails,
            proveedor: {
                id: (value.split('@'))[0],
                nombre: (value.split('@'))[1]
            }
        })
    }


    const validarBtnAñadir = () => { 
        if (
            movDetails.producto.id !== 0 &&
            Number(movDetails.cantidad) !== 0 && 
            Number(movDetails.precio_parcial) !== 0
        ) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <Modal
            modal={modal}
            setModal={setModal}
        >

            <div className="grid-1 gap">

                <h4 className="desc-form">Descripcion de ingreso del producto</h4>
                <div className="grid-2 gap">
                    
                    <SelectSearch
                        label="Producto"
                        type="text"
                        respuesta={handlerDataProductos}
                        urlData={PRODUCTOS_SEARCH}
                        repetidos={productosRepe}
                        link="/productos/crear-producto"
                        switchSelect={switchProductos}
                        setSwitchSelect={setSwitchProductos}
                        placeholder="Nombre o codigo ..."
                    />

                    <div>

                    </div>

                    <SelectSearch
                        label="Proveedor"
                        type="text"
                        respuesta={handlerDataProveedor}
                        urlData={PROVEEDORES_SEARCH}
                        link="/proveedores/nuevo"
                        switchSelect={switchProveedores}
                        setSwitchSelect={setSwitchProveedores}
                        placeholder="Nombre o razon social ..."
                    />

                    <div>

                    </div>

                </div>

                <div className="grid-4 gap">
                    
                    <Input
                        label="Cantidad de unidades"
                        type="number"
                        name="cantidad"
                        value={movDetails.cantidad}
                        onChange={handlerChangeMovimientoDetalles}
                    />
                    
                    <Input
                        label="Precio de compra del paquete"
                        type="number"
                        name="precio_parcial"
                        value={movDetails.precio_parcial}
                        onChange={handlerChangeMovimientoDetalles}
                        moneda
                    />

                    <InputDisable label="Precio por unidad" value={movDetails.precio_unidad} moneda/>

                    <Input
                        label="Detalles"
                        type="text"
                        name="descripcion"
                        value={movDetails.descripcion}
                        onChange={handlerChangeMovimientoDetalles}
                        placeholder="Informacion del producto"
                    />

                </div>

                <div className="grid-4 gap mt-15 mb-15">
                    <div></div>
                    {
                        <BtnOnOff
                            label="Añadir y continuar"
                            estado={validarBtnAñadir()}
                            onClick={() => handlerAddMovimientoDetalles()}
                            className="success"
                            icon={ <BiListPlus /> }
                        />
                    }

                    {
                        <BtnOnOff
                            label="Añadir y cerrar"
                            estado={validarBtnAñadir()}
                            onClick={() => {
                                handlerAddMovimientoDetalles()
                                setModal(!modal)
                            }}
                            className="info"
                            icon={ <BiListPlus /> }
                        />
                    }
                    <div></div>
                </div>
            </div>
        </Modal>
    )
}
