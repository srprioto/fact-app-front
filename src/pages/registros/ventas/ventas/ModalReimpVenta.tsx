import { useEffect, useState } from "react";
import { BiBookmarkAltMinus } from "react-icons/bi";
import { Loading } from "../../../../components/loads/Loading";
import { Modal } from "../../../../components/modals/Modal";
import { TextoRelleno } from "../../../../components/TextoRelleno";
import { getOne } from "../../../../resources/fetch";
import { VENTAS } from "../../../../resources/routes";
import { ImpComprobante } from "../../../cobrar/part/modals/ImpComprobante";

interface modalReimpVenta {
    modal:boolean;
    setModal:Function;
    idVenta:number;
}

export const ModalReimpVenta = ({ modal, setModal, idVenta }:modalReimpVenta) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(true);
    const [venta, setVenta] = useState<any>({});
    

    useEffect(() => {
        getDataOne();
    }, [])


    const getDataOne = async () => { 
        setLoadingOne(true);
        try {
            const dataOne = await getOne(idVenta, VENTAS);
            setVenta(dataOne);
            setLoadingOne(false);            
        } catch (error) {
            setLoadingOne(true);
            console.log(error);
        }
    }


    return (
        <Modal
            modal={modal}
            // setModal={setModal}
        >
            {
                loadingOne
                ? <Loading />
                : (
                    <>
                        <TextoRelleno 
                            texto="Imprimiendo comprobante" 
                            icon={ <BiBookmarkAltMinus /> }
                        />
                        <h5 className="center m-0 warning">Confirme o cierre la ventana de impresion</h5>
                        <ImpComprobante venta={venta} setImprimir={setModal}/>
                    </>
                )
                
            }
            
        </Modal>
    )
}
