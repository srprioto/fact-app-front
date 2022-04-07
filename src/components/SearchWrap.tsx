import { useRef, useState } from "react";
import { Search } from "./Search";
import { get } from "../resources/fetch";

interface SearchWrap {
    setLoadingData:Function; // estado de carga de datos
    setData:Function; // estado que guarda los datos de la busqueda o datos de forma general
    getData:Function; // estado que trae todos los datos para reiniciar busqueda
    url:string; // url de la busqueda
    placeholder:string; // texto del input de busqueda
    
    // estados de busqueda, estos van por fuera
    searchState:boolean;
    setSearchState:Function;
}

export const SearchWrap = ({ 
    setLoadingData, 
    setData, 
    getData, 
    url, 
    placeholder, 
    searchState, 
    setSearchState 
}:SearchWrap) => {
    
    const [searchTxt, setSearchTxt] = useState<string>("");
    const searchFocus = useRef<any>(null)
    
    const searchData = async () => { 
        if (searchTxt === "" || searchTxt === undefined || searchTxt === null || searchTxt.length === 0) {
            searchFocus.current.focus();
        } else {
            setLoadingData(true);
            setSearchState(true);
            try {
                const data = await get(url + searchTxt);
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
        getData();
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
        />
    )
}


{/* 
<SearchWrap 
    setLoadingData={setLoadingData}
    setData={setData}
    getData={getData}
    url={VENTAS_SEARCH}
    placeholder="Nombre cliente o nota adicional"
/> 
*/}