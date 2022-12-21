import { useEffect, useState } from "react";
import { BiBookmarkAltMinus, BiMoveHorizontal, BiX } from "react-icons/bi";
import { Loading } from "../../../../../components/loads/Loading";
import { Modal } from "../../../../../components/modals/Modal"
import { ModalWrap } from "../../../../../components/modals/ModalWrap";
import { tipoVenta } from "../../../../../resources/dtos/VentasDto";
import { getOne } from "../../../../../resources/fetch";
import { VENTAS } from "../../../../../resources/routes";
import { ProductoInfo } from "../../../../productos/otros/ProductoInfo";
import { CreditoDetalles } from "../CreditoDetalles";
import { FormasPago } from "../FormasPago";
import { InfoCliente } from "../InfoCliente";
import { InfoVenta } from "../InfoVenta";
import { ModalAnularVenta } from "./ModalAnularVenta";
import { ModalConvertirComp } from "./modalConvertirComp/ModalConvertirComp";
import { ModalReimpVenta } from "./ModalReimpVenta";

interface modalVentaDetalles {
    modal:boolean;
    setModal:Function;
    idVenta:number;
    getData?:Function;
    btnClose?:Function;
}

export const ModalVentaDetalles = ({ modal, setModal, idVenta, getData, btnClose }:modalVentaDetalles) => {

    const [modalAnular, setModalAnular] = useState<boolean>(false);
    const [modalReimprimir, setModalReimprimir] = useState<boolean>(false);
    const [modalConvComprobante, setModalConvComprobante] = useState<boolean>(false);

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [venta, setVenta] = useState<any>({});

    const formasPago:any = venta.formasPago;
    
    useEffect(() => {
        getDataOne();
    }, [])


    const getDataOne = async () => { 
        setLoadingOne(true);
        try {
            const dataOne = await getOne(idVenta, VENTAS);
            setVenta(dataOne);
            setLoadingOne(false);            
        } catch (error) {
            setLoadingOne(true);
            console.log(error);
        }
    }


    const classEstado = (estado:string) => { 
        if (estado === "listo") {
            return "success-i"
        } else if (estado === "enviado") {
            return "warning-i"
        } else if (estado === "rechazado" || estado === "anulado") {
            return "danger-i"
        }
    }

    
    const classVentaForzada = (negativa:number, forzar:boolean) => {
        if (negativa === 0) {
            return "info"
        } else if (forzar === true) {
            return "danger"
        } else if (forzar === false && negativa < 0) {
            return "warning"
        }
    }
    
    const verFormasPago = () => { 
        if (!!formasPago) {
            if (formasPago.length > 0) {
                return true
            } else {
                return false
            }
        }
    }


    const verCreditoDetalles = () => { 
        if (!!venta.creditoDetalles) {
            if (venta.creditoDetalles.length > 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    const acciones = ():Array<any> => {
        const accionesArray:Array<any> = [];

        if (!loadingOne && venta.estado_venta === "listo") {
            accionesArray.push({
                label: "Imprimir",
                funcion: () => setModalReimprimir(true),
                icon: <BiBookmarkAltMinus />
            });
            if ( venta.tipo_venta === tipoVenta.venta_rapida ) {
                accionesArray.push({
                    label: "Cambiar Comp.",
                    funcion: () => setModalConvComprobante(true),
                    icon: <BiMoveHorizontal />
                });
            }
            accionesArray.push({
                label: "Anular Venta",
                funcion: () => setModalAnular(true),
                icon: <BiX /> 
            });
        }
        
        return accionesArray;
    }
    
    const gData = () => { 
        getData && getData();
        getDataOne();
    }

    return (
        <Modal
            title="Detalles de la venta"
            modal={modal}
            setModal={setModal}
            border="border-primary"
            width={85}
            btnClose={btnClose}
            acciones={acciones().length > 0 ? acciones() : null}
        >
            {
                loadingOne
                ? <Loading />
                : <>
                    <div className="modal-ver-ingreso grid-1 gap">

                        <div className="box m-0">

                            <table className="table2">

                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th>Marca</th>
                                        <th>Talla</th>
                                        <th></th>
                                        <th>Cant.</th>
                                        <th>Inc/Desc</th>
                                        <th>P. Unidad</th>
                                        <th>P. Subventa</th>
                                        <th>Sin stock</th>                                        
                                        {/* <th>Estado</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        venta.ventaDetalles
                                        && (
                                            venta.ventaDetalles.map((e:any) => {
                                                return (
                                                    <tr key={e.id}>
                                                        <td className="info">{ e.productos.nombre }</td>
                                                        <td className="info">{ e.productos.marca }</td>
                                                        <td className="info">{ e.productos.talla }</td>
                                                        <td>
                                                            <ProductoInfo producto={e.productos} />
                                                        </td>
                                                        <td>{ e.cantidad_venta }</td>
                                                        <td className={(
                                                            Number(e.descuento) > 0
                                                            ? "success"
                                                            : Number(e.descuento) < 0
                                                            ? "danger"
                                                            : ""
                                                        )}>S/. { e.descuento }</td>
                                                        <td>S/. { e.precio_venta }</td>
                                                        <td>S/. { e.precio_parcial }</td>
                                                        <td
                                                            className={
                                                                classVentaForzada(e.venta_negativa, e.forzar_venta)
                                                            }
                                                        >{ e.venta_negativa }</td>
                                                    </tr>
                                                )
                                            })
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                        <InfoVenta venta={venta} classEstado={classEstado} />

                        {
                            verCreditoDetalles()
                            && <CreditoDetalles creditoDetalles={venta.creditoDetalles} />
                        }
                        {
                            verFormasPago()
                            && <FormasPago formasDePago={venta.formasPago} />
                        }
                        {
                            venta.clientes
                            && (
                                <InfoCliente cliente={venta.clientes} />
                            )
                        }

                    </div>

                    <ModalWrap modal={modalAnular}>
                        <ModalAnularVenta
                            modal={modalAnular}
                            setModal={setModalAnular}
                            idVenta={idVenta}
                            getData={gData}
                        />
                    </ModalWrap>

                    <ModalWrap modal={modalReimprimir}>
                        <ModalReimpVenta
                            modal={modalReimprimir}
                            setModal={setModalReimprimir}
                            idVenta={idVenta}
                        />
                    </ModalWrap>

                    <ModalWrap modal={modalConvComprobante}>
                        <ModalConvertirComp
                            modal={modalConvComprobante}
                            setModal={setModalConvComprobante}
                            idVenta={idVenta}
                            getData={gData}
                        />
                    </ModalWrap>

                </>
            }
        </Modal>
    )
}
