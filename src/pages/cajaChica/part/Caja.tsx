import { useEffect, useState } from "react";
import { useAuth } from "../../../auth/useAuth";
import { Loading } from "../../../components/loads/Loading";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { getOne } from "../../../resources/fetch";
import { CAJA } from "../../../resources/routes";
import { ModalAbrirCaja } from "../../locales/local/ModalAbrirCaja";
import { CajaAbierta } from "./CajaAbierta";
import { CajaCerrada } from "./CajaCerrada";
import { CajaDetalles } from "./CajaDetalles";
import { ModalCerrarCaja } from "./ModalCerrarCaja";
import { ModalEliminarCajDet } from "./ModalEliminarCajDet";
import { ModalOtroMonto } from "./ModalOtroMonto";

export const Caja = ({ idLocal, nombreLocal, user }:any) => {

    // const params = useParams(); // idLocal, nombreLocal
    const auth = useAuth();
    
    const [modalCerrarCaja, setModalCerrarCaja] = useState<boolean>(false);
    const [modalAbrirCaja, setModalAbrirCaja] = useState<boolean>(false);
    const [modalAddMonto, setModalAddMonto] = useState<boolean>(false);
    const [modalEliminar, setModalEliminar] = useState<boolean>(false);
    const [idCajaDetalle, setIdCajaDetalle] = useState<number>(0);

    const [loadCaja, setLoadCaja] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const [caja, setCaja] = useState<any>({
        estado_caja: true,
        cantidad_diferencia: 0,
        nota_observacion: "",
        localId: Number(idLocal),
        usuarioCierraId: auth.userInfo.sub
    });

    const montoApertura:any = data.caja ? data.caja.monto_apertura : 0;
    const idCaja:number = data.caja ? data.caja.id : 0;
    

    useEffect(() => {
        getDataOne();
    }, [])
    

    const handlerEliminar = (id:number) => { 
        setIdCajaDetalle(id);
        setModalEliminar(!modalEliminar);
    }


    const getDataOne = async () => { 
        setLoadCaja(true);
        try {
            const data = await getOne(Number(idLocal), CAJA + "/local-caja-ingresos");
            setData(data);
            setLoadCaja(false);            
        } catch (error) {
            setLoadCaja(true);
            console.log(error);
        }
    }


    return (
        <>
            {
                loadCaja
                ? <Loading />
                : (
                    <>
                        {
                            (montoApertura === 0 || !montoApertura)
                            ? (
                                <CajaCerrada
                                    setModalAbrirCaja={setModalAbrirCaja}
                                />
                            ) : (
                                <CajaAbierta
                                    data={data}
                                    caja={caja}
                                    setCaja={setCaja}
                                    setModalCerrarCaja={setModalCerrarCaja}
                                    setModalAddMonto={setModalAddMonto}
                                    handlerEliminar={handlerEliminar}
                                />
                            )
                        }
                    </>
                )
            }

            <ModalWrap modal={modalAbrirCaja}>
                <ModalAbrirCaja
                    modal={modalAbrirCaja}
                    setModal={setModalAbrirCaja}
                    idLocal={idLocal}
                    nombreLocal={nombreLocal}
                    getDataOne={getDataOne}
                    usuarioId={auth.userInfo.sub}
                    user={user}
                />
            </ModalWrap>

            <ModalWrap modal={modalCerrarCaja}>
                <ModalCerrarCaja
                    modal={modalCerrarCaja}
                    setModal={setModalCerrarCaja}
                    caja={caja}
                    idCaja={idCaja}
                    user={user}
                    getDataOne={getDataOne}
                />
            </ModalWrap>

            <ModalWrap modal={modalAddMonto}>
                <ModalOtroMonto
                    modal={modalAddMonto}
                    setModal={setModalAddMonto}
                    getDataOne={getDataOne}
                    usuarioId={auth.userInfo.sub}
                    idCaja={idCaja}
                />
            </ModalWrap>

            <ModalWrap modal={modalEliminar}>
                <ModalEliminarCajDet
                    modal={modalEliminar}
                    setModal={setModalEliminar}
                    idCajaDetalle={idCajaDetalle}
                    getDataOne={getDataOne}
                    idCaja={idCaja}
                />
            </ModalWrap>

        </>
        
    )
}


