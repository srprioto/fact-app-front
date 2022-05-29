import { useEffect, useState } from "react"
import { BiStore } from "react-icons/bi";
import { Loading } from "../../../components/loads/Loading"
import { get } from "../../../resources/fetch"
import { LOCALES_SOLO } from "../../../resources/routes"
import { InfoLocal } from "./InfoLocal";


export const Locales = () => {

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
            const data = await get(LOCALES_SOLO);
            setLocales(data);
            setLoadingLocal(false);
        } catch (error) {
            setLoadingLocal(true);
            console.log(error);
        }
    }

    
    const handlerSelectLocal = (e:any) => { 
        if (e.id !== toggle) {
            setLocal(e);
            setToggle(e.id);
            // setStateCaja(false)
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

                        <InfoLocal local={local} handlerSelectLocal={handlerSelectLocal} />
                        
                    </div>
                )
            }
            
        </div>
    )
}

