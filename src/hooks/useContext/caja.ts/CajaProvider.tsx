import { createContext, useEffect, useState } from "react";
import { useAuth } from "../../../auth/useAuth";
import { getOne } from "../../../resources/fetch";
import { CAJA_VERIFICAR } from "../../../resources/routes";

interface contValue {
    cajaState:boolean;
    setCajaState:Function;
    handlerEstadoCaja:Function;
    loadingCaja:boolean;
    idLocal:any
}

export const CajaContext = createContext<any>({});

export const CajaProvider = ({ children }:any) => {

    const auth = useAuth();
    const idLocal:any = auth.userInfo.local.id;

    const [cajaState, setCajaState] = useState<boolean>(false);
    const [loadingCaja, setLoadingCaja] = useState<boolean>(false);

    useEffect(() => {
        // if (auth.rol !== Roles.ADMIN) {
        //     handlerEstadoCaja()
        // }
        handlerEstadoCaja();
    }, [cajaState])

    const handlerEstadoCaja = async () => { 
        setLoadingCaja(true);
        try {
            const estadoCaja = await getOne(Number(idLocal), CAJA_VERIFICAR);
            setCajaState(estadoCaja);
            setLoadingCaja(false);            
        } catch (error) {
            setLoadingCaja(true);
            console.log(error);
        }

        return false;
    }

    const contextValue:contValue = {
        cajaState,
        setCajaState,
        handlerEstadoCaja,
        loadingCaja,
        idLocal
    }

    return (
        <CajaContext.Provider value={contextValue}>
            { children }
        </CajaContext.Provider>
    )
}


/* 
<CajaProvider>

</CajaProvider> 
*/