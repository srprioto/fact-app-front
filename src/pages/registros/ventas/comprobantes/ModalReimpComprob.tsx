import { useEffect, useState } from "react";
import { BiBookmarkAltMinus } from "react-icons/bi";
import { Loading } from "../../../../components/loads/Loading";
import { Modal } from "../../../../components/modals/Modal";
import { TextoRelleno } from "../../../../components/TextoRelleno";
import { getOne } from "../../../../resources/fetch";
import { COMPROBANTE } from "../../../../resources/routes";
import { ReimpComprobante } from "./ReimpComprobante";


interface modalReimpComprobante {
    modal:boolean;
    setModal:Function;
    idComprobante:number;
}

export const ModalReimpComprob = ({ modal, setModal, idComprobante }:modalReimpComprobante) => {

    const [loadingOne, setLoadingOne] = useState<boolean>(true);
    const [comprobante, setComprobante] = useState<any>({});
    

    useEffect(() => {
        getDataOne();
    }, [])


    const getDataOne = async () => { 
        setLoadingOne(true);
        try {
            const dataOne = await getOne(idComprobante, COMPROBANTE);
            setComprobante(dataOne);
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
                : <>
                    <TextoRelleno 
                        texto="Imprimiendo comprobante" 
                        icon={ <BiBookmarkAltMinus /> }
                    />
                    <h5 className="center m-0 warning">Confirme o cierre la ventana de impresion</h5>
                    <ReimpComprobante comprobante={comprobante} setImprimir={setModal}/>
                    {/* <Prueba venta={comprobante} setImprimir={setModal}/> */}
                </>
            }
        </Modal>
    )
}


// const Prueba = ({ venta, setImprimir }:any) => { 

//     const imprimir = useRef<any>(null);

//     useEffect(() => {
//         handlerPrint();
//     }, [])


//     const handlerPrint = () => { 
//         let ventimp:any = window.open(' ', 'popimpr');
//         ventimp.document.write( imprimir.current.innerHTML );
//         ventimp.document.close();
//         ventimp.print();
//         ventimp.close();
//         setImprimir(false);
//     }

//     console.log(venta);    

//     return (
//         <div className="none imprimir-comprobante">
//             <div ref={imprimir}></div>
//         </div>
//     )
// }