import { useEffect, useState } from "react";
import { BiCartAlt, BiCoin, BiDollarCircle, BiListOl, BiMapPin } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { BtnOnOff2 } from "../../../components/btns/BtnOnOff2";
import { LoadSwitchBtn2 } from "../../../components/btns/LoadSwitchBtn2";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { TextoRelleno } from "../../../components/TextoRelleno"
import { getOne } from "../../../resources/fetch";
import { CAJA_VERIFICAR } from "../../../resources/routes";
import { GananciaSemanaLocal } from "../../reportes/ventas/estadisticas/GananciaSemanaLocal";
import { ModalAbrirCaja } from "./ModalAbrirCaja";

interface infoLocal {
    local:any;
    handlerSelectLocal?:Function;
}

export const InfoLocal = ({ local, handlerSelectLocal }:infoLocal) => {

    const navigate = useNavigate();

    const [toggleGeneral, setToggleGeneral] = useState<number>(1);
    const [LoadStateCaja, setLoadStateCaja] = useState<boolean>(false);
    const [stateCaja, setStateCaja] = useState<boolean>(false);
    const [modalAbrirCaja, setModalAbrirCaja] = useState<boolean>(false);

    useEffect(() => {
        if (Object.keys(local).length) {
            handlerEstadoCaja();    
        }
    }, [local])


    useEffect(() => {
        setStateCaja(false);
    }, [handlerSelectLocal])
    

    const handlerEstadoCaja = async () => { 
        setLoadStateCaja(true);
        try {
            const estadoCaja = await getOne(local.id, CAJA_VERIFICAR);
            setStateCaja(estadoCaja);
            setLoadStateCaja(false);            
        } catch (error) {
            setLoadStateCaja(true);
            console.log(error);
        }
    }


    const handlerCaja = () => { 
        if (stateCaja) {
            // mostrar caja
            navigate(`/tiendas/caja-chica/${local.id}/${local.nombre}`);
        } else {
            // abrir caja
            setModalAbrirCaja(true);
        }
    }
    
    
    return (
        
        <div className="box m-0">
            <div className="local">
                <div className="info-local">
                    {
                        !Object.keys(local).length
                        ? <TextoRelleno texto="Selecciona un local"/>
                        : (
                            <div className="grid-1 gap">
                                
                                <div className="btn-tabs grid-2 gap">
                                    <button 
                                        onClick={() => setToggleGeneral(1)}
                                        className={`btn2 btn2-info ${toggleGeneral === 1 && "btn2-sub-info"}`}>
                                        {/* <BiBarChartAlt2 /> */}
                                        Informacion del local
                                    </button>
                                    <button 
                                        onClick={() => setToggleGeneral(2)}
                                        className={`btn2 btn2-info ${toggleGeneral === 2 && "btn2-sub-info"}`}>
                                        {/* <BiDetail /> */}
                                        Ingresos de la semana
                                    </button>
                                    {/* <div></div> */}

                                </div>

                                { toggleGeneral === 1 && <InformacionLocal local={local} /> }
                                { toggleGeneral === 2 && <GananciaSemanaLocal idLocal={local.id} noTitulo /> }
                                

                                <div className="grid-4 gap btn-links">

                                    <BtnOnOff2
                                        label="Vender"
                                        estado={stateCaja}
                                        icon={<BiCartAlt />}
                                    >
                                        <Link 
                                            to={`/tiendas/vender/${local.id}/${local.nombre}`} className="btn btn-success"
                                        >
                                            <BiCartAlt /> Vender
                                        </Link>
                                    </BtnOnOff2>

                                    <BtnOnOff2
                                        label="Cobrar"
                                        estado={stateCaja}
                                        icon={<BiCoin />}
                                    >
                                        <Link 
                                            to={`/tiendas/caja/${local.id}/${local.nombre}`} className="btn btn-warning"
                                        >
                                            <BiCoin />
                                            Cobrar
                                        </Link>
                                    </BtnOnOff2>

                                    <div className="w150px">
                                        <LoadSwitchBtn2
                                            loading={LoadStateCaja}
                                            className={"btn btn-" + (stateCaja ? "info" : "danger")}
                                            handler={() => { handlerCaja() }}
                                        >
                                            <BiDollarCircle /> Caja
                                        </LoadSwitchBtn2>
                                    </div>
                                    {/* stateCaja */}

                                    <Link 
                                        to={`/tiendas/local/${local.id}/${local.nombre}`} 
                                        className="btn btn-primary"
                                    >
                                        <BiListOl /> Stock
                                    </Link>

                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <ModalWrap modal={modalAbrirCaja}>
                <ModalAbrirCaja
                    modal={modalAbrirCaja}
                    setModal={setModalAbrirCaja}
                    idLocal={local.id}
                    nombreLocal={local.nombre}
                    setStateCaja={setStateCaja}
                />
            </ModalWrap>

        </div>

    )
}

const InformacionLocal = ({ local }:any) => { 

    return (
        <div className="middle">
            <div className="grid-1 gap">
                <span className="center iconLocal"><BiMapPin /></span>
                <h3>{ local.nombre }</h3>
                <p><strong>Direccion: </strong>{ local.direccion }</p>
                <p><strong>Telefono: </strong>{ local.telefono }</p>
            </div>
        </div>
    )
}

