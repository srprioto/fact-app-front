import { useEffect, useState } from "react";
import { BiBrush, BiCheck, BiListPlus, BiX } from "react-icons/bi";

import { LoadSwitchBtn } from "../../../components/btns/LoadSwitchBtn";
import { Input } from "../../../components/forms/Input";
import { SelectSearch } from "../../../components/forms/SelectSearch";
import { InputDisable } from "../../../components/forms/InputDisable";

import { MovimientosDto, movProd } from "../../../resources/dtos/Movimientos";
import { detalles, MovimientoDetallesDto } from "../../../resources/dtos/MovimientoDetalles";
import { redondeo } from "../../../resources/func/redondeo";
        import { PRODUCTOS_SEARCH, PROVEEDORES_SEARCH } from "../../../resources/routes";
import { Select } from "../../../components/forms/Select";
import { SelectLocal } from "./SelectLocal";
import { useNavigate } from "react-router-dom";
import { BtnOnOff } from "../../../components/btns/BtnOnOff";
import { ModalAddProducto } from "./modals/ModalAddProducto";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { TextoRelleno } from "../../../components/TextoRelleno";


export const FormIngresoProductos = ({ 
    handlerCreate, 
    loading, 

    // loadingProductos, 
    // searchProductos, 
    // productos,

    // loadingProveedores,
    // searchProveedor,
    // proveedores

}:any) => {

    const navigate = useNavigate();

    const [switchProductos, setSwitchProductos] = useState<boolean>(false);
    const [switchProveedores, setSwitchProveedores] = useState<boolean>(false);

    const [movimientos, setMovimientos] = useState<MovimientosDto>(movProd);
    
    const [movimientoDetalles, setMovimientoDetalles] = useState<any>([]); // lista los datos
    const [movDetails, setMovDetails] = useState<MovimientoDetallesDto>(detalles); // añadir los datos al objeto
    const [productosRepe, setProductosRepe] = useState<Array<number>>([]); // almacena ids de productos en lista

    const [modalAdd, setModalAdd] = useState<boolean>(true);

    // calculo precio parcial
    // useEffect(() => {
    //     setMovDetails({
    //         ...movDetails,
    //         precio_parcial: redondeo(
    //             Number(movDetails.precio_unidad) * Number(movDetails.cantidad)
    //         )// .toString()
    //     })
    // }, [movDetails.precio_unidad, movDetails.cantidad])

    // calcular precio unidad
    useEffect(() => {
        if (movDetails.precio_parcial !== 0 && movDetails.cantidad !== 0) {
            setMovDetails({
                ...movDetails,
                precio_unidad: redondeo(
                    Number(movDetails.cantidad) == 0
                    ? Number(movDetails.precio_parcial) / 1
                    : Number(movDetails.precio_parcial) / Number(movDetails.cantidad)                    
                )// .toString()
            })    
        } 
    }, [movDetails.precio_parcial, movDetails.cantidad])
    
    // calculo precio total
    useEffect(() => {
        setMovimientos({
            ...movimientos,
            total: (
                Number(movimientos.subtotal) + 
                Number(movimientos.costo_transporte) + 
                Number(movimientos.costo_otros)
            )
        })
    }, [movimientos.subtotal, movimientos.costo_transporte, movimientos.costo_otros])
    
    
    // añade valores a la relacion de productos
    const handlerAddMovimientoDetalles = () => {
        if (movDetails.producto.id !== 0) { //REVISAR VALIDACION

            setProductosRepe([ // añade ids a la lista de repetidos
                ...productosRepe,
                Number(movDetails.producto.id)
            ]);

            setMovimientos({
                ...movimientos,
                subtotal: movimientos.subtotal + Number(movDetails.precio_parcial)
            })
            setMovimientoDetalles([
                ...movimientoDetalles,
                movDetails
            ])
            setSwitchProductos(false);
            setSwitchProveedores(false);
            setMovDetails(detalles)
        } else {
            // validar datos de "Descripcion de ingreso del producto" aqui
        }
    }

            // // informacion de productos desde select
            // const handlerDataProductos = (value:any) => {
            //     setMovDetails({
            //         ... movDetails,
            //         producto: {
            //             id: (value.split('@'))[0],
            //             nombre: (value.split('@'))[1]
            //         }
            //     })
            // }
            // // informacion de proveedor desde select
            // const handlerDataProveedor = (value:any) => { 
            //     setMovDetails({
            //         ... movDetails,
            //         proveedor: {
            //             id: (value.split('@'))[0],
            //             nombre: (value.split('@'))[1]
            //         }
            //     })
            // }

    // añadir objetos al estado de los detalles
    const handlerChangeMovimientoDetalles = (e:any) => { 
        setMovDetails({
            ...movDetails,
            [e.target.name]: e.target.value 
        })    
    }

    // apilar datos del estado general o informacion del producto
    const handlerChangeMovimiento = (e:any) => { 
        setMovimientos({
            ...movimientos,
            [e.target.name]: e.target.value 
        })
    }


    // quita un elemento de la lista de productos detalles
    const itemPop = (i:number) => {     // i .- indice del elemento que se va a borrar
        let lista:Array<any> = [...movimientoDetalles];    // convetimos el estado en un array
        lista.splice(i,1);              // borramos el elemento en base al indice
        setMovimientoDetalles([...lista]);      // añadimos la lista corregida al estado

        // quitar de lista repetidos
        let prodRepe:Array<number> = [...productosRepe];
        prodRepe.splice(i,1);
        setProductosRepe([...prodRepe]);
    }
    
 
    // validacion para activar el boton de añadir producto
            const validarEnvio = () => { 
                if (movimientoDetalles.length <= 0 ||
                    movimientos.total === 0 ||
                    movimientos.local_destino === 0
                ) {   
                    return false;
                } else {
                    return true;
                }    
            }


            // validar boton de añadir
            // const validarBtnAñadir = () => { 
            //     if (
            //         movDetails.producto.id !== 0 &&
            //         Number(movDetails.cantidad) !== 0 && 
            //         Number(movDetails.precio_parcial) !== 0
            //     ) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // }


    // limpiar todos los imputs
    const handlerClear = () => { 
        setMovimientos(movProd);
        setProductosRepe([]);
        setSwitchProductos(false);
        setSwitchProveedores(false);
        setMovimientoDetalles([]);
        setMovDetails(detalles)
    }


    // enviar datos para guardar
    const handlerEnviar = () => {
        if (movimientos.total !== 0 || movimientos.movimiento_detalles.length == 0) {
            handlerCreate(movimientos, movimientoDetalles);
        }
        handlerClear()
    }


    return (

        <div className="form-ingreso-productos mb-25">

            {/* 
            <div className="box grid-1 gap">

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

                <div className="grid-4 gap">
                    <div></div>
                    <div></div>
                    <div></div>
                    {
                        <BtnOnOff
                            label="Añadir"
                            estado={validarBtnAñadir()}
                            onClick={() => handlerAddMovimientoDetalles()}
                            className="success"
                            icon={ <BiListPlus /> }
                        />
                    }
                </div>

            </div> 
            */}

            <div className="grid-1">

                <div className="box">

                {
                    movimientoDetalles.length > 0
                    ? (
                        <>
                            <h4 className="desc-form">Relacion de productos</h4>
                            <table className="table mb-25">
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Proveedor</th>
                                        <th>Cantidad</th>
                                        <th>Precio unidad</th>
                                        <th>Precio acumulado</th>
                                        <th>Descripcion</th>
                                        <th className="transparent">...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        movimientoDetalles.map((el:MovimientoDetallesDto, index:number) => { 
                                            return(
                                                <tr key={el.producto.nombre + el.proveedor.nombre}>
                                                    <td>{ el.producto.nombre }</td>
                                                    <td>{ el.proveedor.nombre }</td>
                                                    <td>{ el.cantidad }</td>
                                                    <td>S/. { el.precio_unidad }</td>
                                                    <td>S/. { el.precio_parcial }</td>
                                                    <td>{ el.descripcion }</td>
                                                    <td>
                                                        <span className="wrap-icons danger center">
                                                            <BiX className="pointer" onClick={() => { itemPop(index) }} />
                                                        </span>
                                                    </td>
                                                </tr>  
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </>
                    ) : (
                        <div>
                            
                        </div>
                    )
                }

                </div>

                <div className="box">

                    <h4 className="desc-form">Informacion general de ingreso de productos</h4>
                    <div className="grid-4 gap">

                        <InputDisable label="Subtotal" value={ movimientos.subtotal } moneda/>

                        <Input
                            label="Costo de transporte"
                            type="number"
                            name="costo_transporte"
                            value={movimientos.costo_transporte}
                            onChange={handlerChangeMovimiento}
                            moneda
                        />

                        <Input
                            label="Otros costos"
                            type="number"
                            name="costo_otros"
                            value={movimientos.costo_otros}
                            onChange={handlerChangeMovimiento}
                            moneda
                        />
                        
                        <InputDisable label="Total" value={ movimientos.total } moneda/>

                    </div>

                    <div className="grid-2 gap">

                        <SelectLocal 
                            onChange={handlerChangeMovimiento} 
                        />

                        <Input
                            label="Descripcion / observaciones"
                            type="text"
                            name="observaciones"
                            value={movimientos.observaciones}
                            onChange={handlerChangeMovimiento}
                            placeholder="Informacion general"
                        />
                    </div>

                    <div className="grid-4 gap mt-15">
                        <div />
                        {
                            validarEnvio()
                            ? (
                                <LoadSwitchBtn label="Crear Proveedor" loading={loading} handler={handlerEnviar} />
                            ) : (
                                <button className="btn btn-disable">
                                    <BiCheck />
                                    Añadir productos
                                </button>
                            )
                        }
                        <button className="btn btn-primary" type="reset" onClick={handlerClear}>
                            <BiBrush />
                            Limpiar
                        </button>
                        <div />
                    </div> 

                </div>

            </div>

            <ModalWrap modal={modalAdd}>
                <ModalAddProducto
                    modal={modalAdd}
                    setModal={setModalAdd}
                    movDetails={movDetails}
                    handlerAddMovimientoDetalles={handlerAddMovimientoDetalles}
                    handlerChangeMovimientoDetalles={handlerChangeMovimientoDetalles}
                    setMovDetails={setMovDetails}
                    productosRepe={productosRepe}
                    switchProductos={switchProductos}
                    setSwitchProductos={setSwitchProductos}
                    switchProveedores={switchProveedores}
                    setSwitchProveedores={setSwitchProveedores}
                />
            </ModalWrap>
            

        </div>

    )
}

