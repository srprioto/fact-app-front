import { useEffect, useState } from "react"
import { Loading } from "../../../../components/loads/Loading";
import { ModalWrap } from "../../../../components/modals/ModalWrap";

import { getOne } from "../../../../resources/fetch";
import { moneda } from "../../../../resources/func/moneda";
import { MOVIMIENTOS } from "../../../../resources/routes";
import { ProductoInfo } from "../../../productos/otros/ProductoInfo";
import { InfoIngresoProductos } from "./InfoIngresoProductos";
import { IngresoDetalleDropD } from "./IngresoDetalleDropD";
import { ModalCalcPrecio } from "./ModalCalcPrecio";
import { TablaListaIngresos } from "./TablaListaIngresos";

interface boxVerIngresos {
    idIngreso:number;
}

export const BoxVerIngresos = ({ idIngreso }:boxVerIngresos) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
    const [modalCalcPrecio, setModalCalcPrecio] = useState<boolean>(false);
    const [movimientoDetalle, setMovimientoDetalle] = useState<any>({});
    const [movimiento, setMovimiento] = useState<any>({});
    
    
    useEffect(() => {
        getDataOne();
    }, [])


    const getDataOne = async () => { 
    
        setLoadingOne(true);
        try {
            const movimiento = await getOne(idIngreso, MOVIMIENTOS);
            setMovimiento(movimiento);
            setLoadingOne(false);            
        } catch (error) {
            setLoadingOne(true);
            console.log(error);
        }
    }


    const handlerCalcularPrecio = (ingresoDetalle:any) => { 
        setMovimientoDetalle(ingresoDetalle);
        setModalCalcPrecio(true);
    }


    const handlerCalcularTotalProductos = ():number => { 

        let totalProductos:number = 0;

        if (movimiento.movimientoDetalles) {
            movimiento.movimientoDetalles.forEach((el:any) => {
                totalProductos = totalProductos + el.cantidad
            });
        }

        return totalProductos
    }


    return (
        loadingOne
        ? <Loading />
        : (
            <div className="modal-ver-ingreso grid-1 gap">

                <TablaListaIngresos
                    movimiento={movimiento}
                    handlerCalcularPrecio={handlerCalcularPrecio}
                    gastosAdicionales={Number(movimiento.costo_transporte) + Number(movimiento.costo_otros)}
                    totalProductos={handlerCalcularTotalProductos()}
                />

                <InfoIngresoProductos movimiento={movimiento} />

                <ModalWrap modal={modalCalcPrecio}>
                    <ModalCalcPrecio
                        modal={modalCalcPrecio}
                        setModal={setModalCalcPrecio}
                        movimientoDetalle={movimientoDetalle}
                        gastosAdicionales={Number(movimiento.costo_transporte) + Number(movimiento.costo_otros)}
                        totalProductos={handlerCalcularTotalProductos()}
                        getDataOne={getDataOne}
                    />
                </ModalWrap>
                
            </div>
        )
    )
}
