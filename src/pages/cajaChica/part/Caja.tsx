import { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp, BiLock, BiPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { Input } from "../../../components/forms/Input";
import { Loading } from "../../../components/loads/Loading";
import { getOne } from "../../../resources/fetch";
import { CAJA } from "../../../resources/routes";
import { ModalCerrarCaja } from "./ModalCerrarCaja";
import { ModalOtroMonto } from "./ModalOtroMonto";

export const Caja = () => {

    const params = useParams(); // params.id, params.nombre

    const [modalCerrarCaja, setModalCerrarCaja] = useState<boolean>(false);
    const [modalAddMonto, setModalAddMonto] = useState<boolean>(false);

    const [loadCaja, setLoadCaja] = useState<boolean>(false);
    const [showObserv, setShowObserv] = useState<boolean>(false);
    const [data, setData] = useState<any>({});
    const [caja, setCaja] = useState<any>({
        estado_caja: true,
        // monto_apertura: 150,
        monto_cierre: 0,
        cantidad_diferencia: 0,
        nota_observacion: "",
        localId: Number(params.id),
        usuarioCierraId: 1
    });

    const montoApertura:any = data.caja ? data.caja.monto_apertura : null;
    const otrosIngresos:any = data.caja ? data.caja.otros_montos : null;
    const totalIngresos:number = data.totalIngresos ? data.totalIngresos : 0;
    const idCaja:number = data.caja ? data.caja.id : 0;


    useEffect(() => {
        getDataOne();
    }, [])
    

    const handlerOnChange = (e:any) => { 
        setCaja({
            ...caja,
            [e.target.name]: e.target.value
        })
    }


    const getDataOne = async () => { 
        setLoadCaja(true);
        try {
            const data = await getOne(Number(params.id), CAJA + "/local-caja-ingresos");
            setData(data);
            setLoadCaja(false);            
        } catch (error) {
            setLoadCaja(true);
            console.log(error);
        }
    }


    const handlerCerrarCaja = () => { 
        setCaja({
            ...caja,
            estado_caja: false,
            monto_cierre: totalIngresos
        })        
        setModalCerrarCaja(true);
    }


    return (
        <div className="box box-par grid-1 gap-v">
            {
                loadCaja
                ? <Loading />
                : (
                    <div className="box grid-1 gap m-0 box-par">

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

                            <div className="box-descripcion">
                                <p>Monto apertura: </p>
                                <h2 className="strong">S/. {montoApertura}</h2>
                            </div>

                            <div className="box-descripcion">
                                <p>Ingresos día: </p>
                                <h2 className="strong info-i">S/. {data.totalIngresos}</h2>
                            </div>

                            <div className="box-descripcion">
                                <p>Otros: </p>
                                <h2 className="strong warning-i">S/. {otrosIngresos}</h2>
                            </div>
                            
                            <div className="box-descripcion">
                                <p>Monto total: </p>
                                <h2 className="strong success-i">
                                    S/. {montoApertura + totalIngresos + otrosIngresos}
                                </h2>
                            </div>

                        </div>

                        <div className="grid-3 gap">
                            <button className="btn btn-info" onClick={() => setModalAddMonto(true)}>
                                <BiPlus />
                                Añadir otro monto
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
                )
            }

            <ModalCerrarCaja
                modal={modalCerrarCaja}
                setModal={setModalCerrarCaja}
                caja={caja}
                idCaja={idCaja}
            />

            <ModalOtroMonto
                modal={modalAddMonto}
                setModal={setModalAddMonto}
            />

        </div>
        
    )
}

const BtnCerrarCaja = ({ handler }:any) => { 
    return (
        <button onClick={() => handler()} className="btn btn-warning">
            <BiLock />
            Cerrar caja
        </button>
    )
}