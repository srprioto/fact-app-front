import { useEffect, useState } from "react";
import { BiBrush, BiCheck } from "react-icons/bi";
import { get } from "../../../resources/fetch";
import { LOCALES } from "../../../resources/routes";
import { LoadSwitchBtn } from "../../btns/LoadSwitchBtn";
import { Input } from "../../forms/Input";
import { InputDisable } from "../../forms/InputDisable";
import { Select } from "../../forms/Select";

export const ConfirmarTransf = ({ 
    nombreLocal, 
    idLocal, 
    setTransferencia, 
    transferencia, 
    validarEnvio, 
    confirmarEnvio,
    loadingPost,
    reiniciar
}:any) => {

    const [loadingLocales, setLoadingLocales] = useState<boolean>(false);
    const [locales, setLocales] = useState<Array<any>>([]);

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

            <div className="grid-4 gap mt-25">

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
                        <button className="btn btn-disable">
                            <BiCheck />
                            Confirmar envio
                        </button>
                    )
                    
                }
                
                <button className="btn btn-primary" onClick={() => reiniciar()}>
                    <BiBrush />
                    Limpiar
                </button>
                <div></div>

            </div>
        </div>
    )
}
