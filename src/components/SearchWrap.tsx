import { useRef, useState } from "react";
import { Search } from "./Search";
import { post } from "../resources/fetch";

interface searchWrap {
    setLoadingData:Function; // estado de carga de datos
    setData:Function; // estado que guarda los datos de la busqueda o datos de forma general
    getData?:Function; // estado que trae todos los datos para reiniciar busqueda
    url:string; // url de la busqueda
    placeholder:string; // texto del input de busqueda
    
    // estados de busqueda, estos van por fuera
    searchState:boolean;
    setSearchState:Function;
    reiniciar?:Function;
    localId?:string;
    // reSearch?:any;
}

export const SearchWrap = ({ 
    setLoadingData, 
    setData, 
    getData, 
    url, 
    placeholder, 
    searchState, 
    setSearchState,
    reiniciar,
    localId
    // reSearch
}:searchWrap) => {
    
    const [searchTxt, setSearchTxt] = useState<string>("");
    const searchFocus = useRef<any>(null)

    const idLocal:string = localId ? `${localId}` : ""
    
    const searchData = async () => { 
        if (searchTxt === "" || searchTxt === undefined || searchTxt === null || searchTxt.length === 0) {
            searchFocus.current.focus();
        } else {
            setLoadingData(true);
            setSearchState(true);
            try {
                // const data = await get(url + searchTxt + idLocal);
                const data = await post({value: searchTxt}, url + idLocal);
                setLoadingData(false);
                setData(data);
            } catch (error) {
                setLoadingData(true);
                console.log(error);
            }
        }
    }

    const handlerStateSearch = () => {
        setSearchTxt("");
        setSearchState(false);
        getData && getData();
    }

    const onChangeSearch = (e:any) => { 
        setSearchTxt(e.target.value);
    }

    return (
        <Search
            searchTxt={searchTxt}
            searchData={searchData}
            searchState={searchState}
            onChangeSearch={onChangeSearch}
            handlerStateSearch={handlerStateSearch}
            searchFocus={searchFocus}
            placeholder={placeholder}
            reiniciar={reiniciar}
        />
    )
}

/* 

const [searchState, setSearchState] = useState<boolean>(false);

<SearchWrap 
    setLoadingData={setLoadingData}
    setData={setData}
    getData={getData}
    searchState={searchState}
    setSearchState={setSearchState}
    url={VENTAS_SEARCH}
    placeholder="Nombre del cliente ..."
/> 
*/