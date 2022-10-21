import { useEffect, useRef } from "react";

export const ImpCreditoAdel = ({ ventaUpdate, setImprimir }:any) => {

    const imprimir = useRef<any>(null);

    useEffect(() => {
        handlerPrint();
    }, [])


    const handlerPrint = () => { 
        let ventimp:any = window.open(' ', 'popimpr');
        ventimp.document.write( imprimir.current.innerHTML );
        ventimp.document.close();
        ventimp.print();
        ventimp.close();
        setImprimir(false);
    }

    console.log(ventaUpdate);

    return (
        <div className="none imprimir-comprobante">
            <div ref={imprimir}>
                <h1>imp creidot</h1>
            </div>
        </div>
    )
}
