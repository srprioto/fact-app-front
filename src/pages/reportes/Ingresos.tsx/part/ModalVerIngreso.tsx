import { useEffect, useState } from "react"
import { Modal } from "../../../../components/modals/Modal"
import { getOne } from "../../../../resources/fetch";
import { MOVIMIENTOS } from "../../../../resources/routes";

export const ModalVerIngreso = ({ modal, setModal, idIngreso }:any) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(false);
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
    

    return (
        <Modal
            modal={modal}
            setModal={setModal}
        >
            <h1>aqui todo { idIngreso }</h1>
        </Modal>
    )
}
