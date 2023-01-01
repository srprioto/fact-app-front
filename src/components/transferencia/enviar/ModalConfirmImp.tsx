import { useEffect, useState } from "react"
import { BiBookmarkAltMinus } from "react-icons/bi"
import { Loading } from "../../loads/Loading"
import { Modal } from "../../modals/Modal"
import { TextoRelleno } from "../../TextoRelleno"
import { ImpTicketTransf } from "../../imprimir/ImpTicketTransf"

interface modalConfirmImp {
    modal:boolean;
    setModal:Function;
    confirmarEnvio:Function;
    loadingPost:boolean;
    transferencia:any;
    listaProductos:any;
    nombreLocal?:string;
    locales:Array<any>;
}

export const ModalConfirmImp = ({ 
    modal, 
    setModal, 
    confirmarEnvio, 
    loadingPost, 
    transferencia, 
    listaProductos,
    nombreLocal,
    locales
}:modalConfirmImp) => {

    const [imprimir, setImprimir] = useState<boolean>(false);

    useEffect(() => {
        setImprimir(true);
        confirmarEnvio();
    }, [])
    

    return (
        <Modal
            modal={modal}
            // setModal={setModal}
        >
            {
                loadingPost
                ? <Loading />
                : <>
                    <TextoRelleno 
                        texto="Imprimiendo comprobante" 
                        icon={ <BiBookmarkAltMinus /> }
                    />
                    <h5 className="center m-0 warning">Confirme o cierre la ventana de impresion</h5>
                    { 
                        imprimir 
                        && <ImpTicketTransf 
                            setImprimir={setImprimir} 
                            setModal={setModal} 
                            transferencia={transferencia}
                            listaProductos={listaProductos}
                            nombreLocal={nombreLocal}
                            locales={locales}
                        /> 
                    }                    
                </>
            }
        </Modal>
    )
}
