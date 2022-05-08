import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { BiCartAlt, BiCoin, BiDollarCircle, BiListOl, BiMapPin, BiStore } from "react-icons/bi";
import { Link } from 'react-router-dom';
import { LoadSwitchBtn2 } from "../../../components/btns/LoadSwitchBtn2";

import { Loading } from "../../../components/loads/Loading"
import { TextoRelleno } from "../../../components/TextoRelleno";

import { get, getOne } from "../../../resources/fetch"
import { CAJA_VERIFICAR, LOCALES_SOLO } from "../../../resources/routes"
import { GananciaSemanaLocal } from "../../reportes/ventas/estadisticas/GananciaSemanaLocal";
import { ModalWrap } from "../../../components/modals/ModalWrap";
import { ModalAbrirCaja } from "./ModalAbrirCaja";
import { BtnOnOff2 } from "../../../components/btns/BtnOnOff2";


export const Locales = () => {

    const navigate = useNavigate();

    const [loadingLocal, setLoadingLocal] = useState<boolean>(false)
    const [locales, setLocales] = useState<any>([])
    const [local, setLocal] = useState<any>({})
    const [toggleGeneral, setToggleGeneral] = useState<number>(1);
    const [toggle, setToggle] = useState<number>(0); // cambiar select local

    const [stateCaja, setStateCaja] = useState<boolean>(false);
    const [LoadStateCaja, setLoadStateCaja] = useState<boolean>(false);
    const [modalAbrirCaja, setModalAbrirCaja] = useState<boolean>(false);


    useEffect(() => {
        getData();
    }, [])


    useEffect(() => {
        if (Object.keys(local).length) {
            handlerEstadoCaja();    
        }
    }, [local])


    const getData = async () => {
        setLoadingLocal(true);
        try {
            const data = await get(LOCALES_SOLO);
            setLocales(data);
            setLoadingLocal(false);
        } catch (error) {
            setLoadingLocal(true);
            console.log(error);
        }
    }


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

    
    const handlerSelectLocal = (e:any) => { 
        if (e.id != toggle) {
            setLocal(e);
            setToggle(e.id);
            setStateCaja(false)
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
        <div className="clientes">

            <div className="box">
                
                <div className="grid-3 gap center">
                    <div></div>
                    <div className="middle">
                        <h2 className="m-0">Nuestros locales</h2>
                    </div>
                    <div>
                        <button className="btn btn-success">
                            <BiStore />
                            Crear nuevo local
                        </button>
                    </div>
                </div>

            </div>

            {
                loadingLocal
                ? <Loading />
                : (
                    <div className="grid-12 gap wrap-locales">
                        <div className="locales">
                            {
                                locales.map((e:any) => {
                                    return (
                                        <div 
                                            className="box wrap-item-local pointer"
                                            key={e.id} 
                                            onClick={() => handlerSelectLocal(e)}
                                        >
                                            <div className="item-local">
                                                <div 
                                                    className={
                                                        "item-local-nombre " +
                                                        (
                                                            e.id === toggle 
                                                            ? "btn2-sub-warning"
                                                            : "btn2-sub-transparent"
                                                        )
                                                    }>
                                                    <BiStore />
                                                    <h4>{ e.nombre }</h4>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    )
                                })
                            }
                        </div>

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

                                                { toggleGeneral === 1 && <InfoLocal local={local} /> }
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
                        </div>
                    </div>
                )
            }

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


const InfoLocal = ({ local }:any) => { 

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

/* <button
    className="btn btn-info"
    onClick={() => handlerCaja()}
>
    <BiDollarCircle />
    Caja
</button> */