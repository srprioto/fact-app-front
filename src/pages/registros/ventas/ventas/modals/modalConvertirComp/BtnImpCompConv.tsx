import { useEffect, useRef, useState } from "react";
import { BiBookmarkAltMinus, BiCheck } from "react-icons/bi"
import { BtnOnOff2 } from "../../../../../../components/btns/BtnOnOff2"
import { LoadSwitchBtn2 } from "../../../../../../components/btns/LoadSwitchBtn2"
import { ReimpComprobante } from "../../../comprobantes/ReimpComprobante";

interface btnImpCompConv {
    validarPost:boolean;
    loadingPost:boolean;
    restoComprobante:any;
    // imprimir:boolean;
    // setImprimir:Function;
}

export const BtnImpCompConv = ({ validarPost, loadingPost, restoComprobante }:btnImpCompConv) => {

    const [imprimir, setImprimir] = useState<boolean>(false);

    const handlerImprimir = async () => { 
        setImprimir(true);
        // aqui ejecutamos la funcion de vender
    }


    return <>
        <BtnOnOff2
            estado={validarPost}
            icon={<BiCheck />}
            label="Confirmar e Imp"
        >
            <LoadSwitchBtn2
                loading={loadingPost}
                className="btn btn-success"
                // handler={enviarVenta}
            >
                <BiBookmarkAltMinus /> Conf. Imprimir
            </LoadSwitchBtn2>
        </BtnOnOff2>
    
        { imprimir && <ReimpComprobante comprobante={restoComprobante} setImprimir={setImprimir} /> }     
        {/* { imprimir && <ImpPrueba venta={restoComprobante} setImprimir={setImprimir} /> }      */}
    </>    
}


// const ImpPrueba = ({ setImprimir, venta }:any) => { 

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
//             <div ref={imprimir}>
//                 <h3>asdfasdf asdf asd fasd fasdf</h3>
//                 <h3>asdfasdf asdf asd fasd fasdf</h3>
//                 <h3>asdfasdf asdf asd fasd fasdf</h3>
//             </div>
//         </div>
//     )
// }