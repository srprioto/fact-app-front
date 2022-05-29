import { useEffect, useState } from "react";
// import { BiChevronDown, BiChevronUp, BiLock, BiPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";
// import { Input } from "../../../components/forms/Input";
import { Loading } from "../../../components/loads/Loading";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { getOne } from "../../../resources/fetch";
import { CAJA } from "../../../resources/routes";
import { ModalAbrirCaja } from "../../locales/local/ModalAbrirCaja";
import { CajaAbierta } from "./CajaAbierta";
import { CajaCerrada } from "./CajaCerrada";
import { ModalCerrarCaja } from "./ModalCerrarCaja";
import { ModalOtroMonto } from "./ModalOtroMonto";

export const Caja = ({ idLocal, nombreLocal, user }:any) => {

    // const params = useParams(); // idLocal, nombreLocal

    const [modalCerrarCaja, setModalCerrarCaja] = useState<boolean>(false);
    const [modalAbrirCaja, setModalAbrirCaja] = useState<boolean>(false);
    const [modalAddMonto, setModalAddMonto] = useState<boolean>(false);

    const [loadCaja, setLoadCaja] = useState<boolean>(false);
    // const [showObserv, setShowObserv] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const [caja, setCaja] = useState<any>({
        estado_caja: true,
        // monto_apertura: 150,
        // monto_efectivo: 0,
        cantidad_diferencia: 0,
        nota_observacion: "",
        localId: Number(idLocal),
        usuarioCierraId: 1
    });

    // const montoApertura:any = data.caja ? data.caja.monto_apertura : 0;
    // const otrosIngresos:any = data.caja ? data.caja.otros_montos : null;
    // const totalIngresos:number = data.totalIngresos ? data.totalIngresos : 0;
    const montoApertura:any = data.caja ? data.caja.monto_apertura : 0;
    const idCaja:number = data.caja && data.caja.id;
    

    useEffect(() => {
        getDataOne();
    }, [])
    

    // const handlerOnChange = (e:any) => { 
    //     setCaja({
    //         ...caja,
    //         [e.target.name]: e.target.value
    //     })
    // }


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


    // const handlerCerrarCaja = () => { 
    //     setCaja({
    //         ...caja,
    //         estado_caja: false,
    //         monto_efectivo: totalIngresos
    //     })        
    //     setModalCerrarCaja(true);
    // }


    const mostrarCajaDetalles = () => { 
        const mostrarDetalles:number = data.caja && data.caja.cajaDetalles.length;
        if (mostrarDetalles > 0) {
            return true
        } else {
            return false
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
                            montoApertura === 0
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
                                />
                            )
                        }

                        { 
                            mostrarCajaDetalles()
                            && (
                                <div className="box">
                            
                                    <table className="table">
                                            
                                        <thead>
                                            <tr>
                                                <th>Descripcion</th>
                                                <th>Monto de movimiento</th>
                                                <th>Encargado de movimiento</th>
                                                <th>Fecha</th>
                                            </tr>
                                        </thead>
                                        
                                        <tbody>
                                            {
                                                data.caja.cajaDetalles.map((e:any) => {
                                                    return (
                                                        <tr key={e.id}>
                                                            <td>{ e.descripcion }</td>
                                                            <td 
                                                                className={"strong " + 
                                                                    (e.monto_movimiento < 0
                                                                    ? "danger"
                                                                    : "success")
                                                                }
                                                            >{ e.monto_movimiento }</td>
                                                            <td>{ e.usuario && e.usuario.nombre }</td>
                                                            <td>{ e.created_at }</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>

                                </div>
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
                    idCaja={idCaja}
                />
            </ModalWrap>

        </>
        
    )
}

// const BtnCerrarCaja = ({ handler }:any) => { 
//     return (
//         <button onClick={() => handler()} className="btn btn-warning">
//             <BiLock />
//             Cerrar caja
//         </button>
//     )
// }

/* 
<div className="box">
    <div className="box grid-1 gap box-par m-0">

        <div className="box-descripcion center mb-5">
            <p className="right">Estado de caja: </p>
            {
                montoApertura === null
                ? (
                    <h2 className="strong left secundary">--</h2>  
                ) : (
                    montoApertura === 0
                    ? <h2 className="strong left warning">Cerrado</h2>
                    : <h2 className="strong left success">Abierto</h2>
                )
            }
        </div>

        <div className="grid-4 gap">

            <div className="center">
                <p>Monto de apertura: </p>
                <h2 className="strong">S/. {montoApertura}</h2>
            </div>

            <div className="center">
                <p>Ingresos del día: </p>
                <h2 className="strong info-i">S/. {data.totalIngresos}</h2>
            </div>

            <div className="center">
                <p>Otros ingresos: </p>
                <h2 className="strong warning-i">S/. {otrosIngresos}</h2>
            </div>
            
            <div className="center">
                <p>Monto total: </p>
                <h2 className="strong success-i">
                    S/. {montoApertura + totalIngresos + otrosIngresos}
                </h2>
            </div>

        </div>

        <div className="grid-3 gap mt-15">
            <button className="btn btn-info" onClick={() => setModalAddMonto(true)}>
                <BiPlus />
                Ingresar o retirar monto
            </button>
            <button 
                onClick={() => setShowObserv(!showObserv)} 
                className="btn-show red-text"
            >
                ¿Los montos no coinciden?
                {
                    showObserv
                    ? <BiChevronUp />
                    : <BiChevronDown />
                }
            </button>
            {
                !showObserv
                && <BtnCerrarCaja handler={handlerCerrarCaja} />
            }
            
        </div>
        {
            showObserv
            && (
                <div className="grid-2 gap mt-15">
                    <Input
                        label="Monto de diferencia"
                        type="number"
                        name="cantidad_diferencia"
                        value={caja.cantidad_diferencia}
                        onChange={handlerOnChange}
                        color={
                            caja.cantidad_diferencia < 0
                            ? "danger-i"
                            : ""
                        }
                        moneda
                    />
                    <Input
                        label="Observación"
                        type="string"
                        name="nota_observacion"
                        value={caja.nota_observacion}
                        onChange={handlerOnChange}
                    />
                </div>
            )
        }

        {
            showObserv
            && (
                <div className="grid-3 gap mt-15">
                    <div></div>
                    <div></div>
                    <BtnCerrarCaja handler={handlerCerrarCaja} />
                </div>
            )
        }
    </div>
</div> 
*/