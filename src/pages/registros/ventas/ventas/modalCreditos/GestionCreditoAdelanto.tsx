import { useState } from "react"
import { BiCaretRight, BiCheck, BiLayerPlus } from "react-icons/bi";
import { BtnOnOff2 } from "../../../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../../../components/btns/LoadSwitchBtn2";
import { Loading } from "../../../../../components/loads/Loading";
import { infoCreditoDto } from "../../../../../resources/dtos/CreditoDto";
import { post } from "../../../../../resources/fetch";
import { CREDITO_DETALLES } from "../../../../../resources/routes";
import { BtnImpCredAde } from "./BtnImpCredAde";
import { CrearCreditoDetal } from "./CrearCreditoDetal";


interface gestionCreditoAdelanto {
    venta:any;
    getDataOne:Function;
    localId:string;
    cantidadRestante:number;
    loading:boolean;
    setLoading:Function;
}

export const GestionCreditoAdelanto = ({ 
    venta, 
    getDataOne, 
    localId, 
    cantidadRestante,
    loading,
    setLoading
}:gestionCreditoAdelanto) => {
    
    const [tabbs, setTabbs] = useState<number>(1);
    const [validarCredito, setValidarCredito] = useState<boolean>(true);
    const [restanteCero, setRestanteCero] = useState<boolean>(false);
    const [updateCredito, setUpdateCredito] = useState<any>({});


    const handlerCreditoDetalles = async () => { 
        setLoading(true);
        try {
            await post(updateCredito, CREDITO_DETALLES);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        } finally {
            setUpdateCredito({
                ...infoCreditoDto,
                ventas: 0,
                estado_producto: false,
                mod_estado_prod: false,
                localId: localId
            })
            getDataOne();
        }
    }


    return (
        <div className="box box-par m-0 gestion-credito-venta">
            <div className="grid-4 gap mb-25">
                <button 
                    className={"btn2 btn2-info " + (tabbs === 1 && "btn2-sub-info")}
                    onClick={() => {setTabbs(1)}}
                > <BiLayerPlus /> Gestionar pagos
                </button>
            </div>

            <div className="box-content-tabbs">
                {
                    tabbs === 1
                    && (
                        <div className="grid-1 gap">
                            {
                                loading
                                ? <Loading />
                                : <CrearCreditoDetal
                                    venta={venta}
                                    cantidadRestante={cantidadRestante}
                                    localId={localId}
                                    setValidarCredito={setValidarCredito}
                                    setUpdateCredito={setUpdateCredito}
                                    setRestanteCero={setRestanteCero}
                                />
                            }
                            
                            <div className="grid-4 gap">
                                <div></div>
                                <BtnImpCredAde
                                    venta={venta}
                                    loading={loading}
                                    validarCredito={validarCredito}
                                    handlerCreditoDetalles={handlerCreditoDetalles}
                                    updateCredito={updateCredito}
                                />

                                <BtnOnOff2
                                    label="Confirmar"
                                    estado={(validarCredito && !restanteCero)}
                                    icon={<BiCheck />}
                                >
                                    <LoadSwitchBtn2
                                        loading={loading}
                                        className="btn btn-warning"
                                        handler={() => handlerCreditoDetalles()}
                                    ><BiCaretRight /> Confirmar
                                    </LoadSwitchBtn2>
                                </BtnOnOff2>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}
