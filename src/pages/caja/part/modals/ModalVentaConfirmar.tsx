import { useEffect, useState } from "react";
import { BiCheck, BiReply } from "react-icons/bi";
import { Checkbox2 } from "../../../../components/forms/Checkbox2";
import { LoadSwitchBtn2 } from "../../../../components/LoadSwitchBtn2";
import { Modal } from "../../../../components/Modal"
import { redondeo } from "../../../../resources/func/redondeo";
import { DatosClienteConf } from "./DatosClienteConf";
import { TablaProdVenta } from "./TablaProdVenta";

export const ModalVentaConfirmar = ({ 
    modal, 
    setModal, 
    dataVenta, 
    codigoPago, 
    confirmarVenta, 
    loading 
}:any) => {

    const [igv, setIgv] = useState<boolean>(true);
    const [venta, setVenta] = useState<any>({...dataVenta});

    useEffect(() => { // aplicar igv
        
        const ventaUpdate:any = {};
        const ventaUpdateDetalles:any = [...venta.ventaDetalles];
        
        ventaUpdateDetalles.map((e:any) => { 
            e.precio_venta = 50;
            ventaUpdateDetalles.push(e);
        })
        
        if (igv) {
            
        }

    }, [igv])
    


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            title={"Confirmar venta"}
            width={50}
        >
            <div className="grid-1">

                <div className="box grid-1 gap">

                    <div className="grid-1 gap wrap-descripcion">
                        <span>
                            <h2 className="primary">Nro factura: </h2>
                            <h2><strong>{ codigoPago() + "-" + dataVenta.id }</strong></h2>
                        </span>
                    </div>

                    <DatosClienteConf venta={dataVenta} />
                    <TablaProdVenta venta={dataVenta} />

                    <div className="grid-3 gap center">
                        <span>
                            <p>Subtotal:</p>
                            <p className="info"><strong>S/. { dataVenta.subtotal }</strong></p>
                        </span>
                        <span>
                            <p>Incr/Desc total:</p>
                            <p className={(
                                dataVenta.descuento_total < 0 
                                ? "danger" 
                                : dataVenta.descuento_total > 0
                                ? "success" 
                                : "info"
                            )}>
                                <strong>S/. { dataVenta.descuento_total }</strong>
                            </p>
                        </span>
                        <div>
                            <p className="info center">Mostrar IGV:</p>
                            <Checkbox2
                                // label={igv ? "Deshabilitar" : "Habilitar"}
                                name="igv"
                                checked={igv}
                                handlerCheck={ () => setIgv(!igv) }
                            />
                        </div>
                    </div>

                    <div className="grid-1 gap center">
                        <span>
                            <p>TOTAL:</p><h1 className="success"><strong>S/. { dataVenta.total }</strong></h1>
                        </span>
                    </div>

                </div>

                <div className="box grid-3 gap">
                    
                    <LoadSwitchBtn2
                        loading={loading}
                        className="btn btn-success"
                        handler={() => confirmarVenta("listo")}
                        
                    >
                        <BiCheck /> Confirmar e imprimir
                    </LoadSwitchBtn2>

                    <LoadSwitchBtn2
                        loading={loading}
                        className="btn btn-info"
                        handler={() => confirmarVenta("listo")}   
                        
                    >
                        <BiCheck /> Confirmar
                    </LoadSwitchBtn2>

                    <button 
                        className="btn btn-warning"
                        onClick={() => setModal(!modal)}
                    ><BiReply /> Regresar</button>
                </div>


            </div>
        </Modal>
    )
}



        // updateVentaDet.map((e:any) => { 
        //     e.precio_parcial = redondeo((e.precio_venta * e.cantidad_venta) + (e.descuento))
        // });


        // data.ventaDetalles.map((e:any) => { // añade listo o rechazado a ventaDetalles
        //     if (!(listaRechazados.includes(e.id))) {
        //         e.estado_venta_detalle = "listo"
        //         ventaDet.push(e);
        //     } else {
        //         e.estado_venta_detalle = "rechazado"
        //         ventaDet.push(e);
        //     }
        // })



        // const sumaSubtotal = venta.ventaDetalles // calcular subtotal
        // .map((e:any) => {
        //     const parcial = e.precio_parcial - (e.precio_parcial * 0.18)
        //     return parcial
        // })
        // .reduce((prev:number, curr:number) => prev + curr, 0);

        
        // setVenta({
        //     ...venta,
        //     // subtotal: sumaSubtotal
        // })