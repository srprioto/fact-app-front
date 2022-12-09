import { useEffect, useState } from "react";
import { tipoVenta } from "../../../../../resources/dtos/VentasDto";
import { post } from "../../../../../resources/fetch";
import { CLIENTES } from "../../../../../resources/routes";
import { FormDocumFacturaCob } from "./FormDocumFacturaCob";
import { FormGeneralFacturaCob } from "./FormGeneralFacturaCob";


interface factura {
    cliente:any;
    setCliente:Function;
    switchChange:boolean;
    setModalConfVenta:Function;
    modalConfVenta:any;
    setModalRechazVenta:Function;
    modalRechazVenta:any;
    venta:any;
    setVenta:Function;
    activarConfirmarVenta:Function;
    getCliente:any;
    setGetCliente:Function;
}

export const FacturaCobrar = ({ 
    cliente, 
    setCliente, 
    switchChange,
    setModalConfVenta, 
    modalConfVenta, 
    setModalRechazVenta, 
    modalRechazVenta,
    venta, 
    setVenta,
    activarConfirmarVenta,
    getCliente, 
    setGetCliente
}:factura) => {

    const tipo_venta:string = tipoVenta.factura;
    const [loadCliente, setLoadCliente] = useState<boolean>(false);


    useEffect(() => {
        setVenta({
            ...venta,
            tipo_venta: tipo_venta
        })
    }, [])


    useEffect(() => {
        setGetCliente({
            tipoDocumento: "RUC",
            documento: cliente.numero_documento
        })
        // setCliente({
        //     ...cliente,
        //     tipoDocumento: getCliente.tipoDocumento
        // })
    }, [getCliente.tipoDocumento])


    const handlerOnChangeGetCli = (e:any) => { 
        setGetCliente({
            ...getCliente,
            [e.target.name]: e.target.value
        })
        // if (e.target.name === "documento") {
        //     setCliente({
        //         ...cliente,
        //         numero_documento: e.target.value
        //     })
        // }
    }


    const handlerGetCliente = async () => { 
        setLoadCliente(true);

        const updateData = {
            documento: getCliente.documento,
            tipoDocumento: getCliente.tipoDocumento
        }

        try {
            const response = await post(updateData, CLIENTES + "/padron/search");
            response.numero_documento = cliente.numero_documento;
            response.tipoDocumento = getCliente.tipoDocumento;
            setCliente(response);
            setLoadCliente(false);
        } catch (error) {
            setLoadCliente(true);
            console.log(error);
        }
    }
        

    return (
        <div className="factura">

            <h3>Informacion general</h3>

            <FormDocumFacturaCob
                tipoVenta={tipo_venta}
                cliente={cliente}
                getCliente={getCliente}
                switchChange={switchChange}
                handlerOnChangeGetCli={handlerOnChangeGetCli}
                handlerGetCliente={handlerGetCliente}
                loadCliente={loadCliente}
            />

            <FormGeneralFacturaCob
                loadCliente={loadCliente}
                getCliente={getCliente}
                switchChange={switchChange}
                cliente={cliente}
                setCliente={setCliente}
                setModalConfVenta={setModalConfVenta}
                modalConfVenta={modalConfVenta}
                setModalRechazVenta={setModalRechazVenta}
                modalRechazVenta={modalRechazVenta}
                activarConfirmarVenta={activarConfirmarVenta}
            />

        </div>
    )
}



// // const serie:string = "F003";
// const tipo_venta:string = tipoVenta.factura;
// // const clienteI = clienteInfo(serie);
// const [loadCliente, setLoadCliente] = useState<boolean>(false);
// // const [getCliente, setGetCliente] = useState<any>({ documento: "", tipoDocumento: "RUC", });

// useEffect(() => {
//     setVenta({
//         ...venta,
//         // serie: serie,
//         tipo_venta: tipo_venta
//     })
// }, [])

// useEffect(() => {
//     // setCliente(clienteI);
//     setGetCliente({
//         tipoDocumento: "RUC",
//         documento: cliente.numero_documento
//     })
//     setCliente({ // añade el tipo de documento cambiado a cliente
//         ...cliente,
//         tipoDocumento: getCliente.tipoDocumento
//     })
// }, [getCliente.tipoDocumento])


// const handlerOnChangeGetCli = (e:any) => { 
//     setGetCliente({
//         ...getCliente,
//         [e.target.name]: e.target.value
//     })
//     if (e.target.name === "documento") {
//         setCliente({
//             ...cliente,
//             numero_documento: e.target.value
//         })
//     }
// }


// const handlerGetCliente = async () => { 
//     setLoadCliente(true);

//     const updateData = {
//         documento: getCliente.documento,
//         tipoDocumento: getCliente.tipoDocumento
//     }

//     try {
//         const response = await post(updateData, CLIENTES + "/padron/search");
//         response.numero_documento = cliente.numero_documento;
//         response.tipoDocumento = getCliente.tipoDocumento;
//         setCliente(response);
//         setLoadCliente(false);
//     } catch (error) {
//         setLoadCliente(true);
//         console.log(error);
//     }
// }