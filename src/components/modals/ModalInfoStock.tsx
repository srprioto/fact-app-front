import { useEffect, useState } from "react";
import { Modal } from "./Modal"
import { getOne } from "../../resources/fetch";
import { LOCAL_STOCK } from "../../resources/routes";
import { Loading } from "../loads/Loading";
import { ModalWrap } from "./ModalWrap";
import { BiInfoCircle } from "react-icons/bi";


export const ModalInfoStock = ({ modal, setModal, idLocal }:any) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>({});

    useEffect(() => {
        getData();
    }, [])
    

    const getData = async () => { 
        setLoading(true);
        try {
            const data:any = await getOne(idLocal, LOCAL_STOCK + "/informacion");
            setData(data);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        } 
    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            width={50}
        >
            {
                loading
                ? <Loading />
                : <div className="box box-par m-0 grid-1 gap">
                    <h2 className="title-modal m-0">Informacion de { data.nombreLocal }</h2>
                    
                    <div className="center">
                        <p>Monto total del stock:</p>
                        <h2 className="success">S/. { data.valorTotalStock }</h2>
                    </div>

                </div>
            }
        </Modal>
    )
}



export const WrapModalInfoStock = ({ idLocal }:any) => {

    const [modalInfoStock, setModalInfoStock] = useState<boolean>(false);

    return (
        <div>

            <button 
                className="btn btn-warning" 
                onClick={() => { setModalInfoStock(true) }}
            ><BiInfoCircle /></button>

            <ModalWrap modal={modalInfoStock}>
                <ModalInfoStock
                    modal={modalInfoStock}
                    setModal={setModalInfoStock}
                    idLocal={idLocal}
                />
            </ModalWrap> 

        </div>
    )
}