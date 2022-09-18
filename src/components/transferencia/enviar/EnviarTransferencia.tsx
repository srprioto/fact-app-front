import { Modal } from "../../modals/Modal"
import { TRANSACCIONES } from "../../../resources/routes"
import { useState } from "react"
import { post } from "../../../resources/fetch"
import { InfoTransferenciaEnvio } from "../../../resources/dtos/Transferencias"
import { ListaProductosTransf } from "./ListaProductosTransf"
import { useAuth } from "../../../auth/useAuth"
import { BuscarProdTransf } from "./BuscarProdTransf"
import { ConfirmarTransf } from "./ConfirmarTransf"

interface modalTransferencia {
    modal:boolean;
    setModal:Function;
    idLocal:number;
    nombreLocal:string|undefined;
    getData:any;
}

export const ModalTransferencia = ({ modal, setModal, idLocal, nombreLocal, getData }:modalTransferencia) => {

    const auth = useAuth();

    const infoTransf:InfoTransferenciaEnvio = {
        detalleTransferencia: [],
        descripcion: "",
        localOrigen: idLocal,
        localDestino: 0,
        usuarioEnvia: auth.userInfo.sub,
    }

    const [data, setData] = useState<Array<any>>([]);
    const [listaProductos, setListaProductos] = useState<Array<any>>([]);
    const [repetidos, setRepetidos] = useState<Array<any>>([]);
    const [transferencia, setTransferencia] = useState<InfoTransferenciaEnvio>(infoTransf);
    const [loadingPost, setLoadingPost] = useState<boolean>(false);

    const reiniciar = () => { 
        setListaProductos([]);
        setRepetidos([]);
        setData([]);
        setTransferencia(infoTransf);
    }

    const validarEnvio = () => { 
        let estado:boolean = true;
        listaProductos.forEach((e:any) => {
            if (e.cantidad <= 0) {
                estado = false;
            }
        })
        if (!transferencia.descripcion) {
            estado = false;
        }
        if (transferencia.localDestino === 0) {
            estado = false;
        }

        return estado;
    }

    const confirmarEnvio = async () => { 
        transferencia.detalleTransferencia = listaProductos;
        setLoadingPost(true);
        try {
            await post(transferencia, TRANSACCIONES);
            setLoadingPost(false);
        } catch (error) {
            console.log(error);
            setLoadingPost(true);
        } finally{
            reiniciar();
            await getData();
            setModal(!modal);
        }
    }


    return (
        <Modal 
            title="transferencia de productos" 
            modal={modal}
            setModal={setModal}
            width={80}
            btnClose={reiniciar}
        >

            <div className="grid-2 gap mb-20 enviar-transferencia">
                <BuscarProdTransf
                    idLocal={idLocal}
                    listaProductos={listaProductos}
                    setListaProductos={setListaProductos}
                    repetidos={repetidos}
                    setRepetidos={setRepetidos}
                    data={data}
                    setData={setData}
                />
                <ListaProductosTransf
                    listaProductos={listaProductos}
                    setListaProductos={setListaProductos}
                    repetidos={repetidos}
                    setRepetidos={setRepetidos}
                    data={data}
                />
            </div>

            <ConfirmarTransf 
                nombreLocal={nombreLocal} 
                idLocal={idLocal}
                setTransferencia={setTransferencia}
                transferencia={transferencia}
                validarEnvio={validarEnvio}
                confirmarEnvio={confirmarEnvio}
                loadingPost={loadingPost}
                reiniciar={reiniciar}
            />

        </Modal>
    )
}
