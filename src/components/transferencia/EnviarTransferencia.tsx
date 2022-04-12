import { Modal } from "../modals/Modal"
import { SelectSearch } from "../forms/SelectSearch"

import { LOCALES, LOCAL_STOCK_SEARCH, TRANSACCIONES } from "../../resources/routes"
import { useEffect, useState } from "react"
import { Input } from "../forms/Input"
import { BiBrush, BiCheck, BiListPlus, BiX } from "react-icons/bi"
import { TextoRelleno } from "../TextoRelleno"
import { Select } from "../forms/Select"
import { InputDisable } from "../forms/InputDisable"
import { get, post } from "../../resources/fetch"
import { InfoTransferenciaEnvio } from "../../resources/dtos/Transferencias"
import { LoadSwitchBtn } from "../btns/LoadSwitchBtn"

interface modalTransferencia {
    modal:boolean;
    setModal:Function;
    idLocal:number;
    nombreLocal:string|undefined;
    getData:any;
}

export const ModalTransferencia = ({ modal, setModal, idLocal, nombreLocal, getData }:modalTransferencia) => {

    const detalles:any = {
        productoNombre: "",
        cantidad: 0,
        productosId: 0
    }

    const infoTransf:InfoTransferenciaEnvio = {
        detalleTransferencia: [],
        descripcion: "",
        localOrigen: idLocal,
        localDestino: 0,
        usuarioEnvia: 1, // actualizar por el del usuario registrado
        // observaciones: "",
        // usuarioRecibe: 0
    }

    const [switchSelectProd, setSwitchSelectProd] = useState<boolean>(false)
    // const [validarCantidad, setValidarCantidad] = useState<boolean>(false);
    const [cantidadActual, setCantidadActual] = useState<number>(0)

    const [loadingLocales, setLoadingLocales] = useState<boolean>(false);
    const [locales, setLocales] = useState<any>([]);

    const [ElementoTransf, setElementoTransf] = useState<any>(detalles) // elemento transferencia
    const [transferencia, setTransferencia] = useState<any>([]); // lista de transferencia
    const [infoTransferencia, setInfoTransferencia] = useState<InfoTransferenciaEnvio>(infoTransf);
    const [loadingPost, setLoadingPost] = useState<boolean>(false);

    const [LocalStockId, setLocalStockId] = useState<number>(0);
    const [envioRepe, setEnvioRepe] = useState<Array<number>>([]);
    
    useEffect(() => {
        if (modal) {
            getLocales();
        }
    }, [modal])


    const getLocales = async () => { 
        setLoadingLocales(true);
        try {
            const data = await get(LOCALES);
            setLocales(data);
            setLoadingLocales(false);
        } catch (error) {
            setLoadingLocales(true);
            console.log(error);
        }
    }

    const handlerProductoTrans = (producto:string) => {
        setLocalStockId(Number((producto.split('@'))[3]));
        setElementoTransf({
            ...ElementoTransf,
            productosId: (producto.split('@'))[0],
            productoNombre: (producto.split('@'))[1]
        });
        setCantidadActual(Number((producto.split('@'))[2]))
    }

    // añade una transferencia a la lista
    const handlerAddTransferencia = () => { 
        if (ElementoTransf.productosId !== 0) {

            setEnvioRepe([ // añadir aqui el id del local stock, no del producto
                ...envioRepe,
                LocalStockId
            ]);

            if (!(cantidadActual - ElementoTransf.cantidad < 0)) {
                setLocalStockId(0);
                setTransferencia([ ...transferencia, ElementoTransf ]) // añade datos a la lista
                setSwitchSelectProd(false); // reestablece selects
                setElementoTransf(detalles) // limpiar datos
                // setValidarCantidad(true);
                
            } else {
                // setValidarCantidad(false);
            }
        } else {
            // validar datos de "Descripcion de ingreso del producto" aqui
        }
    }

    const handlerChangeDetalles = (e:any) => { 
        setElementoTransf({ ...ElementoTransf, [e.target.name]: e.target.value })
    }
    const handlerChangeGenerales = (e:any) => { 
        setInfoTransferencia({ ...infoTransferencia, [e.target.name]: e.target.value })
    }

    const postData = async (transferencia:any, infoTransferencia:any) => {

        infoTransferencia.detalleTransferencia = transferencia;

        setLoadingPost(true);
        try {
            await post(infoTransferencia, TRANSACCIONES);
            setLoadingPost(false);
        } catch (error) {
            console.log(error);
            setLoadingPost(true);
        } finally{
            await getData();
            setTransferencia([]);
            setInfoTransferencia(infoTransf);
            setModal(!modal);
            
        }

        await getData();

    }
    
    const validarEnvio = () => { 
        if (modal) {
            if (transferencia.length <= 0 ||
                infoTransferencia.localDestino === 0 ||
                infoTransferencia.descripcion === ""
            ) {   
                return false;
            } else {
                return true;
            }    
        }
    }

    const itemPop = (i:number) => {     // i .- indice del elemento que se va a borrar
        let lista:Array<any> = [...transferencia];    // convetimos el estado en un array
        lista.splice(i,1);              // borramos el elemento en base al indice
        setTransferencia([...lista]);      // añadimos la lista corregida al estado

        // quitar de lista repetidos 
        let prodRepe:Array<number> = [...envioRepe];
        prodRepe.splice(i,1);
        setEnvioRepe([...prodRepe]);
    }
    

    return (
        <Modal 
            title="transferencia de productos" 
            modal={modal}
            setModal={setModal}
            width={65}
        >

            <div className="grid-2 gap-v">

                <div className="box">

                    <h4 className="desc-form">Informacion de transferencia</h4>
                    <div className="grid-1 gap mt-15">
                        <SelectSearch
                            label={"Producto del " + (idLocal === 1 ? "almacen *" : "local *")}
                            urlData={LOCAL_STOCK_SEARCH + `${idLocal}/`}
                            respuesta={handlerProductoTrans}
                            repetidos={envioRepe}
                            switchSelect={switchSelectProd}
                            setSwitchSelect={setSwitchSelectProd}
                            // link="/productos/crear-producto"
                            placeholder="Codigo o nombre del producto..."
                        />

                        <div className="grid-2">

                            <Input
                                label="Cantidad de envio *"
                                type="number"
                                name="cantidad"
                                value={ElementoTransf.cantidad}
                                onChange={handlerChangeDetalles}
                            />

                            <div className="middle">
                                
                                {
                                    ElementoTransf.productoNombre !== ""
                                    && (
                                        <div>
                                            <h3 className="m-0">Detalles:</h3>
                                            <p className="m-0">
                                                Cantidad actual: 
                                                <strong> { cantidadActual }</strong>
                                            </p>
                                            <p className="m-0">
                                                Cantidad restante: 
                                                <strong
                                                    className={
                                                        (cantidadActual-ElementoTransf.cantidad) < 0
                                                        ? "danger"
                                                        : ""
                                                    }
                                                > { cantidadActual - ElementoTransf.cantidad }</strong>
                                            </p>
                                        </div>
                                    )
                                }
                                
                            </div>

                        </div>
                        
                    </div><br />

                    <div className="grid-2 mt-25">
                        
                        {
                            (cantidadActual - ElementoTransf.cantidad)  < 0 || ElementoTransf.cantidad === 0
                            ? (
                                <button className="btn btn-disable">
                                    <BiListPlus />
                                    Añadir
                                </button>
                            ) : (
                                <button className="btn btn-primary" onClick={() => handlerAddTransferencia()}>
                                    <BiListPlus />
                                    Añadir
                                </button>
                            )
                        }
                        <div></div>

                    </div>

                </div>

                <div className="box">
                    <div className="lista-transf">
                        {
                            transferencia.length <= 0
                            ? <TextoRelleno texto="Añade un elemento" />
                            : (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Producto</th>
                                            <th>Unidades</th>
                                            <th className="transparent inlineblock">...</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            transferencia.map((e:any, index:number) => {
                                                return (
                                                    <tr key={e.productoNombre + e.cantidad}>
                                                        <td>{ e.productoNombre }</td>
                                                        <td>{ e.cantidad }</td>
                                                        <td>
                                                            <span className="wrap-icons danger center">
                                                                <BiX 
                                                                    className="pointer" 
                                                                    onClick={() => { itemPop(index) }} 
                                                                />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className="grid-1 gap">
                <div className="box grid-1 gap">
                    <h4 className="desc-form">Informacion general de envio</h4>
                    <div className="grid-3 gap">

                        <InputDisable
                            label="Local de origen"
                            value={nombreLocal}
                        />

                        <Select
                            label="Local destino *"
                            name="localDestino"
                            onChange={handlerChangeGenerales}
                            loading={loadingLocales}
                            defaultValue
                        >
                            {
                                locales.map((e:any) => {
                                    if (e.id !== idLocal) {
                                        return (
                                            <option key={e.id} value={Number(e.id)}>{ e.nombre }</option>
                                        )    
                                    }
                                    return (<></>)
                                })
                            }
                            
                        </Select>

                        <Input
                            label="Nota de envio *"
                            type="text"
                            name="descripcion"
                            value={infoTransferencia.descripcion}
                            onChange={handlerChangeGenerales}
                        />

                    </div>

                    <div className="grid-4 gap mt-25">

                        <div></div>
                        {
                            
                            (validarEnvio())
                            ? (
                                <LoadSwitchBtn
                                    label="Confirmar envio"
                                    loading={loadingPost}
                                    handler={() => postData(transferencia, infoTransferencia)}
                                />
                            ) : (
                                <button className="btn btn-disable">
                                    <BiCheck />
                                    Confirmar envio
                                </button>
                            )
                            
                        }
                        
                        <button className="btn btn-primary" type="reset">
                            <BiBrush />
                            Limpiar
                        </button>
                        <div></div>

                    </div>

                </div>
            </div>
        </Modal>
    )
}
