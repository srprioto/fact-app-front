import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiCheck, BiExit, BiPlusCircle } from "react-icons/bi";

import { Modal } from "../../../components/modals/Modal";
import { LoadingBtn } from "../../../components/btns/LoadingBtn";

import { ALMACEN_ID } from "../../../resources/nroLocal";
import { LOCAL_STOCK } from "../../../resources/routes";
import { post } from "../../../resources/fetch";

export const CrearCantidad = ({ modal, id }:any) => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [stock, setStock] = useState<any>({
        cantidad: 0
    });

    const onChangeInput = (e:any) => { 
        setStock({
            ...stock,
            [e.target.name]: e.target.value 
        })
    }

    const postCantidad = async (cantidad?:number) => {
        setLoading(true);
        try {
            await post({
                cantidad: cantidad,
                localesId: ALMACEN_ID,
                productosId: id
            }, LOCAL_STOCK);
            setLoading(false);
            
        } catch (error) {
            console.log(error);
            setLoading(true);
        }
    }
    
    const handlerGuardar = async () => { 
        await postCantidad(stock.cantidad);
        navigate(-1)
    }

    const handlerGoAlmacen = async () => {
        await postCantidad(0);
        navigate(-1)
    }

    return (
        <Modal modal={modal}>

            <div className="grid-1 gap">
                <div className="center grid-1 gap">

                    <div className="grid-1 gap">
                        <h3>Producto registrado correctamente</h3>
                        <h2>¿Quieres establecer una cantidad?</h2>
                    </div>

                    <div className="grid-3 gap">
                        <div />
                        <div className="wrap-form">
                            <input 
                                type="number"
                                name="cantidad" 
                                value={stock.cantidad == 0 ? "" : stock.cantidad} 
                                onChange={onChangeInput}
                                placeholder="Ingresa una cantidad"
                            />
                        </div>
                        <div />
                    </div>

                </div>

                <div className="grid-4 gap">
                    
                    <div></div>
                    
                    {
                        loading
                        ? <LoadingBtn />
                        : (
                            stock.cantidad <= 0 || 
                            stock.cantidad === undefined || 
                            stock.cantidad === null || 
                            stock.cantidad === ""
                            ? (
                                <button className="btn btn-disable">
                                    <BiCheck />
                                    Guardar
                                </button>
                            ) : (
                                <button className="btn btn-success" onClick={handlerGuardar}>
                                    <BiCheck />
                                    Guardar
                                </button>
                            )
                        )
                    }
                    
                    {
                        loading
                        ? <LoadingBtn />
                        : (
                            <button className="btn btn-warning" onClick={handlerGoAlmacen}>
                                <BiExit />
                                No
                            </button>
                        )
                    }
                    
                    <div></div>
                    
                </div>
            </div>

        </Modal>
    )
};
