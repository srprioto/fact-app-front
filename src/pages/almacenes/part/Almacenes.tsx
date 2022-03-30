import { useEffect, useState } from "react";
import { BiListOl, BiMapPin, BiStore } from "react-icons/bi";
import { Link } from "react-router-dom";
import { Loading } from "../../../components/loads/Loading";
import { TextoRelleno } from "../../../components/TextoRelleno";
import { get } from "../../../resources/fetch";
import { ALMACENES_SOLO } from "../../../resources/routes";

export const Almacenes = () => {

    const [loadingLocal, setLoadingLocal] = useState<boolean>(false)
    const [locales, setLocales] = useState<any>([])
    const [local, setLocal] = useState<any>({})
    
    const [toggle, setToggle] = useState<number>(0); // cambiar select local

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        setLoadingLocal(true);
        try {
            const data = await get(ALMACENES_SOLO);
            setLocales(data);
            
            setLoadingLocal(false);
        } catch (error) {
            setLoadingLocal(true);
            console.log(error);
        }
    }

    const handlerSelectLocal = (e:any) => { 
        setLocal(e)
        setToggle(e.id);
    }

    return (
        <div className="almacenes">
            <div className="box">
                
                <div className="grid-3 gap center">
                    <div></div>
                    <div className="middle">
                        <h2 className="m-0">Nuestros Almacenes</h2>
                    </div>
                    <div>
                        <button className="btn btn-success">
                            <BiStore />
                            Crear nuevo almacen
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
                                                {/* <button className="btn btn-primary" onClick={() => handlerLocal(e.id, e.nombre)}>
                                                    <span>Ingresar</span>
                                                    <BiRightArrowAlt />
                                                </button> */}
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
                                            <div className="grid-1 gap-h">
                                                <span className="center iconLocal"><BiMapPin /></span>
                                                <h3>{ local.nombre }</h3>
                                                <p><strong>Direccion: </strong>{ local.direccion }</p>
                                                <p><strong>Telefono: </strong>{ local.telefono }</p>
                                                <div className="grid-3 gap">

                                                    {/* <Link 
                                                        to={`/tiendas/vender/${local.id}/${local.nombre}`} className="btn btn-success"
                                                    >
                                                        <BiCartAlt />
                                                        Vender
                                                    </Link> */}

                                                    {/* <Link 
                                                        to={`/tiendas/caja/${local.id}/${local.nombre}`} className="btn btn-warning"
                                                    >
                                                        <BiDollarCircle />
                                                        Caja
                                                    </Link> */}

                                                    <div></div>
                                                    <Link 
                                                        to={`/almacenes/almacen/${local.id}/${local.nombre}`} 
                                                        className="btn btn-info"
                                                    >
                                                        <BiListOl />
                                                        Stock
                                                    </Link>
                                                    <div></div>

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
        </div>
    )
}



