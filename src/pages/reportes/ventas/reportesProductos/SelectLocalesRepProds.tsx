import { useEffect, useState } from "react";
import { Select } from "../../../../components/forms/Select"
import { get } from "../../../../resources/fetch";
import { LOCALES_SOLO } from "../../../../resources/routes";

export const SelectLocalesRepProds = ({ setIdLocal }:any) => {

    const [locales, setLocales] = useState<Array<any>>([]);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        getLocales();
    }, [])


    const getLocales = async () => { 
        setLoading(true);
        try {
            const locales = await get(LOCALES_SOLO);
            setLocales(locales);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }


    
    const handlerLocal = (e:any) => { 
        setIdLocal(e.target.value)
    }


    return (
        <Select
            loading={loading}
            name={"id_local"}
            onChange={handlerLocal}
            textDefault="Selecciona un local"
        >
            <option value={"_"}>Todas las tiendas</option>
            {
                locales.map((e:any) => { 
                    return (
                        <option key={e.id} value={Number(e.id)}>{ e.nombre }</option>
                    )
                })
            }
        </Select>
    )
}
