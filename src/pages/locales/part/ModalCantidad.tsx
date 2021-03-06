import { useState } from "react";
import { BiCheck, BiExit } from "react-icons/bi";

import { Modal } from "../../../components/modals/Modal";
import { LoadingBtn } from "../../../components/btns/LoadingBtn";

import { LocalStockDto } from "../../../resources/dtos/LocalStockDto";
import { LOCAL_STOCK } from "../../../resources/routes";
import { put } from "../../../resources/fetch";

export const ModalCantidad = ({ modal, setModal, localStock, getData, setSearchState }:any) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<LocalStockDto>({
        cantidad:0
    });
    const [validarCantidad, setValidarCantidad] = useState<boolean>(false);


    const onChangeInput = (e:any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const putCantidad = async () => {

        setLoading(true);

        let lastCantidad = localStock.cantidad + (parseInt(data.cantidad))

        if (lastCantidad < 0) {

            setValidarCantidad(true);
            setLoading(false);

        }else{

            try {
                await put(localStock.id, {
                    cantidad: lastCantidad
                }, LOCAL_STOCK);
                setModal(false);
                setValidarCantidad(false);
                setLoading(false);
    
            } catch (error) {
                setLoading(true);
                console.log(error);
    
            } finally { 
                setData({ cantidad:0 })
                setSearchState(false);
                getData();
            }
        }
        
    }

    const handerModal = () => {
        setData({ cantidad:0 });
        setValidarCantidad(false);
        setModal(false); 
    }

    return (
        <Modal title="Cambiar cantidad de unidades" modal={modal}>
            <div className="grid-1 gap">
                <div className="center grid-1 gap">

                    <div className="grid-1 gap">
                        <div>
                            <p style={{ margin: 0 }}>A??ade una cantidad al producto {localStock.nombreProducto}</p>
                            <h5>Para quitar una cantidad, usar el simbolo de resta(Menos)</h5>
                            <p style={{ margin: 0 }}>Cantidad actual <strong>{localStock.cantidad}</strong></p>
                            {
                                <p>
                                    <span>Cantidad final: </span>
                                    {
                                        !data.cantidad
                                        ? <strong></strong>
                                        : (
                                            <strong className={ 
                                                localStock.cantidad + (parseInt(data.cantidad)) < 0
                                                ? "danger" 
                                                : ""
                                            }>
                                                { localStock.cantidad + (parseInt(data.cantidad)) }
                                            </strong>
                                        )
                                        
                                        
                                    }
                                </p>
                            }
                        </div>
                    </div>

                    <div className="grid-3 gap">
                        <div />
                        <div className="wrap-form">
                            <input 
                                type="number"
                                name="cantidad"
                                value={data.cantidad === 0 ? "" : data.cantidad}
                                onChange={onChangeInput}
                                placeholder="Ingresa una cantidad"
                            />
                        </div>
                        <div />
                    </div>
                    {
                        validarCantidad
                        && <h5 className="validate">No puedes quitar m??s productos del total</h5>
                    }

                </div>

                <div className="grid-4 gap mt-15">
                    <div />
                    {
                        loading
                        ? <LoadingBtn />
                        : (

                            data.cantidad === 0 || 
                            data.cantidad === undefined || 
                            data.cantidad === null || 
                            data.cantidad === ""
                            ? (
                                <button className="btn btn-disable">
                                    <BiCheck />
                                    Guardar
                                </button>
                            ) : (
                                <button className="btn btn-success" onClick={putCantidad}>
                                    <BiCheck />
                                    Guardar
                                </button>
                            )
                        )
                    }
                    <button onClick={ handerModal } className="btn btn-warning" >
                        <BiExit />
                        Salir
                    </button>
                    <div />
                </div>
            </div>
        </Modal>
    )
};
