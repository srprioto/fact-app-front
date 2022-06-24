import { useEffect, useState } from "react";
import { Loading } from "../../../../components/loads/Loading";
import { Modal } from "../../../../components/modals/Modal"
import { getOne } from "../../../../resources/fetch";
import { VENTAS } from "../../../../resources/routes";
import { ProductoInfo } from "../../../productos/otros/ProductoInfo";
import { InfoCliente } from "./InfoCliente";
import { InfoVenta } from "./InfoVenta";

export const ModalVentaDetalles = ({ modal, setModal, idVenta }:any) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [venta, setVenta] = useState<any>({});
    
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
        } else if (estado === "rechazado") {
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
    

    return (
        <Modal
            title="Detalles de la venta"
            modal={modal}
            setModal={setModal}
            border="border-primary"
            width={70}
        >
            {
                loadingOne
                ? <Loading />
                : (
                    <div className="modal-ver-ingreso grid-1 gap">

                        <div className="box m-0">

                            <table className="table2">
    
                                <thead>
                                    <tr>
                                        <th>Producto</th>
                                        <th></th>
                                        <th>Cantidad</th>
                                        <th>Descuento</th>
                                        <th>Precio Unidad</th>
                                        <th>Precio Subventa</th>
                                        <th>Venta sin stock</th>                                        
                                        <th>Estado</th>
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
                                                        <td>
                                                            <ProductoInfo producto={e.productos} />
                                                        </td>
                                                        <td>{ e.cantidad_venta }</td>
                                                        <td>S/. { e.descuento }</td>
                                                        <td>S/. { e.precio_venta }</td>
                                                        <td>S/. { e.precio_parcial }</td>
                                                        <td
                                                            className={
                                                                classVentaForzada(e.venta_negativa, e.forzar_venta)
                                                            }
                                                        >{ e.venta_negativa }</td>
                                                        <td
                                                            className={classEstado(e.estado_venta_detalle)}
                                                        >{ e.estado_venta_detalle }</td>
                                                        
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
                            venta.clientes
                            && (
                                <InfoCliente cliente={venta.clientes} />
                            )
                        }

                    </div>        
                )
            }


        </Modal>
    )
}













