import { useEffect, useState } from "react"
import { Select } from "./Select"
import { get } from "../../resources/fetch";
import { LOCALES } from "../../resources/routes";

interface selectLocales {
    setLocal:Function; // es un estado de tipo numerico
    url_locales?:string;
}

export const SelectLocales = ({ setLocal, url_locales = LOCALES }:selectLocales) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [locales, setLocales] = useState<any>();

    useEffect(() => {
        getData();
    }, [])

    const handlerChange = (e:any) => { 
        setLocal(e.target.value);              
    }

    const getData = async () => {
        setLoading(true);
        try {
            const data = await get(url_locales);
            // const data = await get(LOCALES_SOLO);
            setLocales(data);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }


    return (
        <Select
            loading={loading}
            name={"id_local"}
            onChange={handlerChange}
            textDefault="Selecciona un local"
            defaultValue={true}
        >
            {
                !locales 
                ? <option key={"_"} value={"_"}>Recuperando datos</option>
                : <>
                    
                    {
                        locales.map((e:any) => { 
                            return (
                                <option key={e.id} value={Number(e.id)}>{ e.nombre }</option>
                            )
                        })
                    }
                </>
            }
        </Select>
        
    )
}

/* 

requiere por fuera:
const [local, setLocal] = useState<number>(0); 

*/