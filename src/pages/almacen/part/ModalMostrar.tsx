import { useState } from "react";
import { BiExit, BiPencil, BiSave, BiX } from "react-icons/bi";

import { LoadingBtn } from "../../../components/LoadingBtn";
import { Modal } from "../../../components/Modal";

import { put } from "../../../resources/fetch";
import { NRO_ALMACEN } from "../../../resources/nroLocal";
import { PRODUCTOS } from "../../../resources/routes";


export const ModalMostrar = ({ modal, setModal, producto, getData, getOneData, loading, setSearchState }:any) => {

    const [editState, setEditState] = useState<boolean>(false);
    const [loadEdit, setLoadEdit] = useState<boolean>(false);
    const [data, setData] = useState<any>();
    

    // para modificar cantidad:
    // producto.localesStock[NRO_ALMACEN].id

    const onChangeInput = (e:any) => { 
        setData({
            ...data,
            [e.target.name]: e.target.value 
        })
    }

    const handlerEditState = (e?:any) => {
        e != null && e.preventDefault()
        setData({...producto})
        setEditState(!editState);
    }

    const handlerSalir = (e?:any) => { 
        e != null && e.preventDefault()
        setModal(false); 
        setEditState(false);
    }

    const handlerUpdate = async (e?:any) => { 
        e != null && e.preventDefault()
        setLoadEdit(true);
        try {
            await put(producto.id, {
                codigo: data.codigo,
                nombre: data.nombre,
                descripcion: data.descripcion,
                marca: data.marca,
                color: data.color,
                talla: data.talla,
                precio_compra: data.precio_compra,
                precio_venta_1: data.precio_venta_1,
                precio_venta_2: data.precio_venta_2,
                precio_venta_3: data.precio_venta_3,
                usuarioId: data.usuarioId,
                categoriasId: data.categoriasId
            }, PRODUCTOS);
            getOneData(producto.id);
            setEditState(false);
            setSearchState(false);
            setLoadEdit(false);

        } catch (error) {
            setLoadEdit(true);
            console.log(error);

        } finally { 
            getData();
        }

    }

    return (
        <Modal 
            title={!editState ? "Ver información de producto" : "Editar información de producto"} 
            modal={modal} 
            setModal={setModal}
            width={70}
            loading={loading}
        >
            <form autoComplete="off" className="grid-1 gap">

                <div className="grid-1 gap">
                    <div className="wrap-form">
                        <label htmlFor="">Codigo del producto</label><br />
                        {
                            !editState
                            ? <p>{ producto.codigo }</p>
                            : <input 
                                type="text" 
                                name="codigo" 
                                onChange={onChangeInput} 
                                value={data.codigo}
                            />
                        }
                    </div>
                </div>

                <div className="grid-3 gap">

                    <div className="wrap-form">
                        <label htmlFor="">Nombre</label><br />
                        {
                            !editState
                            ? <p>{ producto.nombre }</p>
                            : <input 
                                type="text" 
                                name="nombre" 
                                onChange={onChangeInput} 
                                value={data.nombre}
                            />
                        }
                    </div>

                    <div className="wrap-form">
                        <label htmlFor="">Precio de compra</label><br />
                        {
                            !editState
                            ? <p>{ producto.precio_compra }</p>
                            : <input 
                                type="number" 
                                name="precio_compra" 
                                onChange={onChangeInput} 
                                value={data.precio_compra}
                            />
                        }
                        
                    </div>

                    <div className="wrap-form">
                        <label htmlFor="">Cantidad</label><br />
                        <p>
                            {
                                producto.localesStock !== undefined && producto.localesStock.length > 0
                                ? producto.localesStock[NRO_ALMACEN].cantidad
                                : ""
                            }
                        </p>
                        {/* <input type="number"  name="cantidad" onChange={onChangeInput} /> */}
                    </div>

                </div>

                <div className="grid-3 gap">

                    <div className="wrap-form">
                        <label htmlFor="">Precio venta 1</label><br />
                        {
                            !editState
                            ? <p>{ producto.precio_venta_1 }</p>
                            : <input 
                                type="number"  
                                name="precio_venta_1" 
                                onChange={onChangeInput} 
                                value={data.precio_venta_1}
                            />
                        }
                    </div>

                    <div className="wrap-form">
                        <label htmlFor="">Precio venta 2</label><br />
                        {
                            !editState
                            ? <p>{ producto.precio_venta_2 }</p>
                            : <input 
                                type="number"  
                                name="precio_venta_2" 
                                onChange={onChangeInput} 
                                value={data.precio_venta_2}
                            />
                        }
                    </div>

                    <div className="wrap-form">
                        <label htmlFor="">Precio venta 3</label><br />
                        {
                            !editState
                            ? <p>{ producto.precio_venta_3 }</p>
                            : <input 
                                type="number" 
                                name="precio_venta_3" 
                                onChange={onChangeInput} 
                                value={data.precio_venta_3}
                            />
                        }                        
                        
                    </div>

                </div>

                <div className="grid-3 gap">

                    <div className="wrap-form">
                        <label htmlFor="">Marca</label><br />
                        {
                            !editState
                            ? <p>{ producto.marca }</p>
                            : <input 
                                type="text" 
                                name="marca" 
                                onChange={onChangeInput} 
                                value={data.marca}
                            />
                        }
                        
                    </div>

                    <div className="wrap-form">
                        <label htmlFor="">Color</label><br />
                        {
                            !editState
                            ? <p>{ producto.color }</p>
                            : <input 
                                type="text" 
                                name="color" 
                                onChange={onChangeInput} 
                                value={data.color}
                            />
                        }
                    </div>

                    <div className="wrap-form">
                        <label htmlFor="">Talla</label><br />
                        {
                            !editState
                            ? <p>{ producto.talla }</p>
                            : <input 
                                type="text" 
                                name="talla" 
                                onChange={onChangeInput} 
                                value={data.talla}
                            />
                        }
                        
                    </div>

                </div>

                <div className="grid-1 gap">

                    <div className="wrap-form">
                        <label htmlFor="">Descripcion</label><br />
                        {
                            !editState
                            ? <p>{ producto.descripcion }</p>
                            : <input 
                                type="text" 
                                name="descripcion" 
                                onChange={onChangeInput} 
                                value={data.descripcion}
                            />
                        }
                        
                    </div>

                </div>

                <div className="grid-2 gap">

                    <div className="wrap-form">
                        <label htmlFor="">Fecha de creación</label><br />
                        <p>{ producto.created_at }</p>
                    </div>

                    <div className="wrap-form">
                        <label htmlFor="">Ultima fecha de actualizacion</label><br />
                        <p>{ producto.updated_at }</p>
                    </div>

                </div>

                {
                    !editState
                    ? (
                        <div className="grid-4 gap mt-15">
                            <div/>

                            <button className="btn btn-warning" onClick={handlerEditState}>
                                <BiPencil />
                                Editar
                            </button>

                            <button className="btn btn-info" onClick={handlerSalir}>
                                <BiExit />
                                Salir
                            </button>

                            <div/>
                        </div>
                    )
                    : (
                        <div className="grid-4 gap mt-15">
                            <div/>
                            {
                                loadEdit
                                ? <LoadingBtn />
                                : (
                                    <button className="btn btn-success" onClick={handlerUpdate}>
                                        <BiSave />
                                        Guardar
                                    </button>
                                )
                            }

                            <button className="btn btn-info" onClick={handlerEditState}>
                                <BiX />
                                Cancelar
                            </button>

                            <div/>
                        </div>
                    )
                }

            </form>
            
        </Modal>
    )
};
