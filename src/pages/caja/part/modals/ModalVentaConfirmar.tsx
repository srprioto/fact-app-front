import { useEffect, useState } from "react";
import { BiCheck, BiReply } from "react-icons/bi";

import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2";
import { Modal } from "../../../../components/modals/Modal"
import { DatosClienteConf } from "./DatosClienteConf";
import { TablaProdVenta } from "./TablaProdVenta";

import { copy } from "../../../../resources/func/deepCopy";
import { redondeo } from "../../../../resources/func/redondeo";
import { Input } from "../../../../components/forms/Input";


export const ModalVentaConfirmar = ({ 
    modal,
    setModal,
    dataVenta,
    codigoPago,
    confirmarVenta,
    loading
}:any) => {

    const ventaAux:any = copy(dataVenta);
    const [venta, setVenta] = useState<any>(copy(dataVenta));
    const [reducirPercent, setReducirPercent] = useState<number>(0)


    useEffect(() => { 
        handlerRecalculoEIGV();
    }, [reducirPercent])

    
    const onChangeRedPercent = (e:any) => setReducirPercent(Number(e.target.value));


    const handlerRecalculoEIGV = () => { 

        let ventaDetallesUpdate:any = [];
        
        ventaAux.ventaDetalles.forEach((e:any) => { 

            let reduccion:number;

            if (reducirPercent !== 0) {
                reduccion = redondeo(e.precio_venta * (reducirPercent / 100))
            } else {
                reduccion = 0;
            }

            e.precio_venta = e.precio_venta + reduccion

            const igv:number = redondeo(e.precio_venta * 0.18);
            const precioGravada:number = redondeo((e.precio_venta - igv));
            const precioVenta:number = redondeo(precioGravada + igv);

            e.precio_gravada = precioGravada;
            e.igv = igv;
            e.precio_venta = precioVenta
            e.precio_parcial = redondeo((precioVenta * e.cantidad_venta) + (e.descuento));
    
            ventaDetallesUpdate.push(e);

        })


        const sumaSubtotal:number = ventaDetallesUpdate // calcular subtotal
        .map((e:any) => e.precio_parcial)
        .reduce((prev:number, curr:number) => prev + curr, 0);

        const total:number = (Number(sumaSubtotal) + (Number(venta.descuento_total)))

        setVenta({
            ...venta,
            ventaDetalles: ventaDetallesUpdate,
            subtotal: redondeo(sumaSubtotal),
            total: redondeo(total)
        })

    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            title={"Confirmar venta"}
            width={60}
        >
            <div className="grid-1">

                <div className="box grid-1 gap">

                    <div className="grid-1 gap wrap-descripcion">
                        <span>
                            <h2 className="primary">Nro factura: </h2>
                            <h2><strong>{ codigoPago() + "-" + venta.id }</strong></h2>
                        </span>
                    </div>

                    <DatosClienteConf venta={venta} />
                    <TablaProdVenta venta={venta} />

                    <div className="grid-3 gap center">
                        <span>
                            <p>Subtotal:</p>
                            <p className="info"><strong>S/. { venta.subtotal }</strong></p>
                        </span>
                        <span>
                            <p>Incr/Desc total:</p>
                            <p className={(
                                venta.descuento_total < 0 
                                ? "danger" 
                                : venta.descuento_total > 0
                                ? "success" 
                                : "info"
                            )}>
                                <strong>S/. { venta.descuento_total }</strong>
                            </p>
                        </span>

                        <div>
                            <p>Reducir por porcentaje (%):</p>
                            <Input
                                type="number"
                                name="reducirPercent"
                                value={reducirPercent}
                                onChange={onChangeRedPercent}
                                color={
                                    reducirPercent < 0
                                    ? "danger-i" : ""
                                }
                            />
                        </div>

                    </div>

                    <div className="grid-1 gap center">
                        <span>
                            <p>TOTAL:</p><h1 className="success"><strong>S/. { venta.total }</strong></h1>
                        </span>
                    </div>

                </div>

                <div className="box grid-3 gap">
                    
                    <LoadSwitchBtn2
                        loading={loading}
                        className="btn btn-success"
                        handler={() => confirmarVenta("listo")}
                    ><BiCheck /> Confirmar e imprimir
                    </LoadSwitchBtn2>

                    <LoadSwitchBtn2
                        loading={loading}
                        className="btn btn-info"
                        handler={() => confirmarVenta("listo")}   
                    ><BiCheck /> Confirmar
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
