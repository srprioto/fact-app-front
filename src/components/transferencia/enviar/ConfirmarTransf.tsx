import { useEffect, useState } from "react";
import { BiBookmarkAltMinus, BiBrush, BiCheck } from "react-icons/bi";
import { get } from "../../../resources/fetch";
import { LOCALES } from "../../../resources/routes";
import { LoadSwitchBtn } from "../../btns/LoadSwitchBtn";
import { Input } from "../../forms/Input";
import { InputDisable } from "../../forms/InputDisable";
import { Select } from "../../forms/Select";
import { ModalWrap } from "../../modals/ModalWrap";
import { ToolTip } from "../../tooltip/ToolTip";
import { ModalConfirmImp } from "./ModalConfirmImp";

interface confirmarTransf {
    nombreLocal:string|undefined;
    idLocal:number;
    setTransferencia:Function;
    transferencia:any;
    validarEnvio:Function;
    confirmarEnvio:Function;
    loadingPost:boolean;
    reiniciar:Function;
    listaProductos:any;
}

export const ConfirmarTransf = ({ 
    nombreLocal, 
    idLocal, 
    setTransferencia, 
    transferencia, 
    validarEnvio,
    confirmarEnvio,
    loadingPost,
    reiniciar,
    listaProductos
}:confirmarTransf) => {

    const [loadingLocales, setLoadingLocales] = useState<boolean>(false);
    const [locales, setLocales] = useState<Array<any>>([]);
    const [ModalConfImprimir, setModalConfImprimir] = useState<boolean>(false);


    useEffect(() => {
        getLocales();
    }, [])


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

    
    const handlerChangeGenerales = (e:any) => { 
        setTransferencia({ ...transferencia, [e.target.name]: e.target.value })
    }


    return (
        <div className="box box-par grid-1 gap m-0">
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
                        locales.map((e:any, index:number) => {
                            if (e.id !== idLocal) {
                                return (
                                    <option key={index} value={Number(e.id)}>{ e.nombre }</option>
                                )    
                            }
                            return (null);
                        })
                    }
                </Select>

                <Input
                    label="Nota de envio *"
                    type="text"
                    name="descripcion"
                    value={transferencia.descripcion}
                    onChange={handlerChangeGenerales}
                />

            </div>

            <div className="grid-5 gap mt-25">

                <div></div>
                {
                    (validarEnvio())
                    ? (
                        <LoadSwitchBtn
                            label="Confirmar envio"
                            loading={loadingPost}
                            handler={() => confirmarEnvio()}
                        />
                    ) : (
                        <button id="btn-conf-env" className="btn btn-disable">
                            <BiCheck />
                            Confirmar envio
                        </button>
                    )
                }
                {
                    (validarEnvio())
                    ? (
                        <LoadSwitchBtn
                            label="Confirmar e Imp."
                            loading={loadingPost}
                            handler={() => setModalConfImprimir(!ModalConfImprimir)}
                            className="btn btn-warning"
                            icon={<BiBookmarkAltMinus />}
                        />
                    ) : (
                        <button id="btn-conf-imp" className="btn btn-disable">
                            <BiBookmarkAltMinus />
                            Confirmar e Imp.
                        </button>
                    )
                }
                <button className="btn btn-primary" onClick={() => reiniciar()}>
                    <BiBrush />
                    Limpiar
                </button>
                <div></div>

            </div>
            
            <ToolTip
                anchor="btn-conf-env"
                descripcion="Requiere lista de productos para transferir, local de destino y nota de envió"
            /> 
            <ToolTip
                anchor="btn-conf-imp"
                descripcion="Requiere lista de productos para transferir, local de destino y nota de envió"
            /> 

            <ModalWrap modal={ModalConfImprimir}>
                <ModalConfirmImp
                    modal={ModalConfImprimir}
                    setModal={setModalConfImprimir}
                    confirmarEnvio={confirmarEnvio}
                    loadingPost={loadingPost}
                    transferencia={transferencia}
                    listaProductos={listaProductos}
                    nombreLocal={nombreLocal}
                    locales={locales}
                />
            </ModalWrap>

        </div>
    )
}
