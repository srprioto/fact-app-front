import { useEffect, useState } from "react";
import { clienteInfo } from "../../../../resources/dtos/Cliente";
import { tipoVenta } from "../../../../resources/dtos/VentasDto";
import { post } from "../../../../resources/fetch";
import { CLIENTES } from "../../../../resources/routes";
import { FormDocumCobrar } from "./FormDocumCobrar";
import { FormGeneralCobrar } from "./FormGeneralCobrar";


interface boleta {
    cliente:any;
    setCliente:Function;
    switchChange:boolean;
    setModalConfVenta:Function;
    modalConfVenta:any;
    setModalRechazVenta:Function;
    modalRechazVenta:any;
    switchChangeFact:boolean;
    // setTabbs:Function;
    // tipoSerie:Function;
    // data:any;
    // tabbs:number;
    venta:any;
    setVenta:Function;
    activarConfirmarVenta:Function;
    getCliente:any;
    setGetCliente:Function;
}

export const BoletaCobrar = ({ 
    cliente, 
    setCliente, 
    switchChange,
    setModalConfVenta, 
    modalConfVenta, 
    setModalRechazVenta, 
    modalRechazVenta,
    switchChangeFact, 
    // setTabbs, 
    // data, 
    // tipoSerie, 
    // tabbs,
    venta, 
    setVenta,
    activarConfirmarVenta,
    getCliente, 
    setGetCliente,
}:boleta) => {

    // const tipoDocum = () => { 
    //     if (!!cliente) {
    //         if (!!cliente.tipoDocumento) {
    //             return cliente.tipoDocumento
    //         } else {
    //             return "noDocumento"
    //         }
    //     } else {
    //         return "noDocumento"
    //     }
    // }
    
    const tipo_venta:string = tipoVenta.boleta;
    // const clienteI = clienteInfo(serie);
    const [loadCliente, setLoadCliente] = useState<boolean>(false);
    

    useEffect(() => {
        setVenta({
            ...venta,
            // serie: serie,
            tipo_venta: tipo_venta
        })
    }, [])

    // useEffect(() => {
    //     setGetCliente({
    //         ...getCliente,
    //         documento: cliente ? cliente.numero_documento : ""
    //     })
    // }, [getCliente.tipoDocumento])


    useEffect(() => {
        
        if (switchChangeFact) { // revisar en caso de que de problemas
            setCliente(clienteInfo);
        }
        setGetCliente({
            ...getCliente,
            documento: cliente ? cliente.numero_documento : ""
        })
        if (getCliente.tipoDocumento === "noDocumento") {
            setGetCliente({
                ...getCliente,
                documento: ""
            })
        }
    }, [getCliente.tipoDocumento])
   

    const handlerOnChangeGetCli = (e:any) => { 
        setGetCliente({
            ...getCliente,
            [e.target.name]: e.target.value
        })
    }


    // traer data
    const handlerGetCliente = async () => { 
        setLoadCliente(true);

        const updateData = {
            documento: getCliente.documento,
            tipoDocumento: getCliente.tipoDocumento
        }

        try {
            const response = await post(updateData, CLIENTES + "/padron/search");
            // response.serie_documento = serie;
            setCliente(response);
            setLoadCliente(false);
        } catch (error) {
            setLoadCliente(true);
            console.log(error);
        }
    }


    return (
        <div className="boleta">

            <h3>Informacion general</h3>

            <FormDocumCobrar
                // serie={serie}
                tipoVenta={tipo_venta}
                cliente={cliente}
                getCliente={getCliente}
                switchChange={switchChange}
                handlerOnChangeGetCli={handlerOnChangeGetCli}
                handlerGetCliente={handlerGetCliente}
                loadCliente={loadCliente}
                
                // venta={venta}
                // switchChangeFact={switchChangeFact}
                // tabbs={tabbs}
                // setTabbs={setTabbs}
                // tipoSerie={tipoSerie}
                // data={data}
                // setCliente={setCliente}
                // setGetCliente={setGetCliente}
                // setVenta={setVenta}
            />

            <FormGeneralCobrar
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



// <div className="box-boleta">

// {
//     loadCliente
//     ? <Loading />
//     : (
//         <>
//             {
//                 getCliente.tipoDocumento === "DNI"
//                 && <CobrarClienteDni 
//                     switchChange={switchChange}
//                     cliente={cliente}
//                     setCliente={setCliente} 
//                 />
//             }
//             {
//                 getCliente.tipoDocumento === "RUC"
//                 && <CobrarClienteRuc 
//                     switchChange={switchChange}
//                     cliente={cliente}
//                     setCliente={setCliente} 
//                 />
//             }
//         </>
//     )
// }

// <div className="mt-15 bb bb-neutro" />
// <br />

// <ConfirmarVenta
//     setModalConfVenta={setModalConfVenta}
//     modalConfVenta={modalConfVenta}
//     setModalRechazVenta={setModalRechazVenta}
//     modalRechazVenta={modalRechazVenta}
// />

// </div>