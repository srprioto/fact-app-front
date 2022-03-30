import { useEffect, useState } from "react";
import { Select } from "../../../components/forms/Select"
import { get } from "../../../resources/fetch";
import { LOCALES } from "../../../resources/routes";

export const SelectLocal = ({ onChange }:any) => {

    const [locales, setLocales] = useState<any>([])
    const [loadingLocales, setLoadingLocales] = useState<boolean>(false);
    
    useEffect(() => {
        getLocales();
    }, [])

    const getLocales = async () => { 
        setLoadingLocales(true);
        try {
            const data = await get(LOCALES);           
            setLocales(data);
            setLoadingLocales(false);
        } catch (error) {
            setLoadingLocales(true);
            console.log(error);
        }
    }

    return (        
        <Select
            label="Local de ingreso de productos - Tienda o Almacen"
            name="local_destino"
            onChange={onChange}
            loading={loadingLocales}
            textDefault="Selecciona un local"
            defaultValue
        >
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
