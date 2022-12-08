import { useEffect } from "react";
import { BiBookBookmark, BiCartAlt, BiSpreadsheet, BiTask } from "react-icons/bi"
import { clienteInfo } from "../../../../resources/dtos/Cliente";
// import { clienteInfo } from "../../../../resources/dtos/Cliente";

interface tabsVenta {
    switchChangeFact:boolean;
    tipoSerie:Function;
    tabbs:number;
    setTabbs:Function;
    setCliente:Function;
    data:any;
    setGetCliente:Function;
    tipoDocumUpdate:Function;
}

export const TabsVenta = ({ 
    switchChangeFact, 
    tipoSerie, 
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
            setTabbs(tipoSerie())
            setCliente(data.clientes);
            setGetCliente({
                documento: documento(), 
                tipoDocumento: tipDocument()
            })
        } else {
            setCliente(clienteInfo);
            setGetCliente({
                documento: documento(), 
                tipoDocumento: tipoDocumUpdate()
            })
        }
    }, [switchChangeFact, tabbs])


    return (
        <div className="tabbs-buttons tabbs grid-4 mb-10">
            <button 
                className={
                    "btn2 btn2-success " + 
                    (!switchChangeFact ? ( tipoSerie() === 1 ? "" : "btn2-disable " ) : "") +
                    (tabbs === 1 && "btn2-sub-success")
                }
                
                onClick={() => {switchChangeFact && setTabbs(1)}}
            ><BiCartAlt/> Venta rapida
            </button>

            <button
                className={
                    "btn2 btn2-info " + 
                    (!switchChangeFact ? ( tipoSerie() === 2 ? "" : "btn2-disable " ) : "") +
                    (tabbs === 2 && "btn2-sub-info")
                }
                onClick={() => {switchChangeFact && setTabbs(2)}}
            ><BiSpreadsheet /> Boleta
            </button>

            <button
                className={
                    "btn2 btn2-info " + 
                    (!switchChangeFact ? ( tipoSerie() === 3 ? "" : "btn2-disable " ) : "") +
                    (tabbs === 3 && "btn2-sub-info")
                }
                onClick={() => {switchChangeFact && setTabbs(3)}}
            ><BiTask /> Factura
            </button>

            <button 
                className={
                    "btn2 btn2-warning " + 
                    (!switchChangeFact ? ( tipoSerie() === 4 ? "" : "btn2-disable " ) : "") +
                    (tabbs === 4 && "btn2-sub-warning")
                }
                onClick={() => {switchChangeFact && setTabbs(4)}}
            ><BiBookBookmark /> Credito/Adelanto
            </button>
        </div>
    )
}
