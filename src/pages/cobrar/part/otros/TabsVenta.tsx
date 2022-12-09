import { useEffect } from "react";
import { BiBookBookmark, BiCartAlt, BiSpreadsheet, BiTask } from "react-icons/bi"
import { clienteInfo } from "../../../../resources/dtos/Cliente";
// import { clienteInfo } from "../../../../resources/dtos/Cliente";

interface tabsVenta {
    switchChangeFact:boolean;
    tabbComprob:number;
    tabbs:number;
    setTabbs:Function;
    setCliente:Function;
    data:any;
    setGetCliente:Function;
    tipoDocumUpdate:Function;
}

export const TabsVenta = ({ 
    switchChangeFact, 
    tabbComprob, 
    tabbs, 
    setTabbs, 
    setCliente,
    data,
    setGetCliente,
    tipoDocumUpdate
}:tabsVenta) => {

    const tipDocument = () => { 
        if (!!data.clientes) {
            if (!!data.clientes.tipoDocumento) {
                return data.clientes.tipoDocumento
            } else {
                return "noDocumento"
            }
        } else {
            return "noDocumento"
        }
    }

    const documento = () => { 
        if (!!data.clientes) {
            if (!!data.clientes.numero_documento) {
                return data.clientes.numero_documento
            } else {
                return ""
            }
        } else {
            return ""
        }
    }

    // console.log(!switchChangeFact);    

    useEffect(() => {
        if (!switchChangeFact) {
            setTabbs(tabbComprob)
            setCliente(data.clientes);
            setGetCliente({
                documento: documento(), 
                tipoDocumento: tipDocument()
            })
        } else {
            setCliente(clienteInfo);
            setGetCliente({
                documento: "", 
                tipoDocumento: tipoDocumUpdate()
                // documento: documento(), 
                // tipoDocumento: ""
            })
        }
    }, [switchChangeFact, tabbs])


    return (
        <div className="tabbs-buttons tabbs grid-4 mb-10">
            <button 
                className={
                    "btn2 btn2-success " + 
                    (!switchChangeFact ? ( tabbComprob === 1 ? "" : "btn2-disable " ) : "") +
                    (tabbs === 1 && "btn2-sub-success")
                }
                
                onClick={() => {switchChangeFact && setTabbs(1)}}
            ><BiCartAlt/> Venta rapida
            </button>

            <button
                className={
                    "btn2 btn2-info " + 
                    (!switchChangeFact ? ( tabbComprob === 2 ? "" : "btn2-disable " ) : "") +
                    (tabbs === 2 && "btn2-sub-info")
                }
                onClick={() => {switchChangeFact && setTabbs(2)}}
            ><BiSpreadsheet /> Boleta
            </button>

            <button
                className={
                    "btn2 btn2-info " + 
                    (!switchChangeFact ? ( tabbComprob === 3 ? "" : "btn2-disable " ) : "") +
                    (tabbs === 3 && "btn2-sub-info")
                }
                onClick={() => {switchChangeFact && setTabbs(3)}}
            ><BiTask /> Factura
            </button>

            <button 
                className={
                    "btn2 btn2-warning " + 
                    (!switchChangeFact ? ( tabbComprob === 4 ? "" : "btn2-disable " ) : "") +
                    (tabbs === 4 && "btn2-sub-warning")
                }
                onClick={() => {switchChangeFact && setTabbs(4)}}
            ><BiBookBookmark /> Credito/Adelanto
            </button>
        </div>
    )
}
