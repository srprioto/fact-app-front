import { BiFastForward, BiListPlus } from "react-icons/bi"
import { BtnOnOff2 } from "../../../../components/btns/BtnOnOff2"
import { LoadSwitchBtn2 } from "../../../../components/btns/LoadSwitchBtn2"
import { moneda } from "../../../../resources/func/moneda"

export const BtnsAnadirProds = ({ 
    listaVenta, 
    validarAñadir, 
    loadVentaRapida, 
    verificarCaja, 
    handlerPedidoRapido, 
    handlerAddListaVenta,
    precioParcial
}:any) => {
    return (
        <div className="grid-121 gap mt-25 btns_anadir_prods">
            {
                listaVenta.length <= 0
                ? (
                    <BtnOnOff2
                        estado={validarAñadir()}
                        label="Venta rapida"
                        // icon={<BiListPlus />}
                    >
                        <LoadSwitchBtn2
                            loading={loadVentaRapida}
                            className="btn btn-warning"
                            handler={() => {
                                verificarCaja(handlerPedidoRapido)
                            }}
                        >
                            <BiFastForward /> Venta rapida
                        </LoadSwitchBtn2>

                    </BtnOnOff2>
                ) : (
                    <div></div>
                )
            }
            
            <div className="middle total_subventa">
                <h2 className="m-0 success strong">S/. { moneda(precioParcial) }</h2>
            </div>

            <BtnOnOff2
                estado={validarAñadir()}
                label="Añadir"
                icon={<BiListPlus />}
            >
                <button className="btn btn-info" onClick={() => handlerAddListaVenta()}>
                    <BiListPlus /> Añadir
                </button>
            </BtnOnOff2>

        </div>
    )
}
