import { useEffect, useState } from "react"
import { BiMessageRounded, BiMessageRoundedAdd } from "react-icons/bi"

import { ModalTransferencia } from "./ModalTransferencia"

import { get } from "../../resources/fetch"
import { TRANSACCIONES } from "../../resources/routes"

interface alertaTransferencia {
    idLocal:number;
    actualizarDatos:Function;
}

export const AlertaTransferencia = ({ idLocal, actualizarDatos }:alertaTransferencia) => {

    const [showModal, setShowModal] = useState<boolean>(false);
    const [dataTransf, setDataTransf] = useState<any>([]);
    // const [loadingTransferencia, setLoadingTransferencia] = useState<boolean>(false);

    useEffect(() => {
        getTransaccionesLocal();
        
    }, [])
    
    const getTransaccionesLocal = async () => { 

        // setLoadingTransferencia(true);
        try {
            const data = await get(TRANSACCIONES + `/${idLocal}/locales`);
            setDataTransf(data);
            // setLoadingTransferencia(false);
        } catch (error) {
            // setLoadingTransferencia(true);
            console.log(error);
        }

    }

    const handlerModalData = () => { 
        getTransaccionesLocal();
        setShowModal(!showModal);
    }
   

    return (
        <>
            {
                dataTransf.length <= 0
                ? (
                    <button className="btn btn-info" onClick={() => handlerModalData()}>
                        <BiMessageRounded />
                    </button>
                ) : (
                    <button className="btn btn-success relative" onClick={() => handlerModalData()}>
                        <BiMessageRoundedAdd />
                        <div className="cantidad-envios"><span>{ dataTransf.length <= 99 ? dataTransf.length : 99 }</span></div>
                    </button>
                )    
            }
            
            <ModalTransferencia
                modal={showModal}
                setModal={setShowModal}
                data={dataTransf}
                getTransacciones={getTransaccionesLocal}
                actualizarDatos={actualizarDatos}
            />

        </>
    )
}
