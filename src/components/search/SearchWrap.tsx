import { useState } from "react";
import { Search } from "./Search";
import { post } from "../../resources/fetch";

interface searchWrap {
    setLoadingData:Function; // estado de carga de datos
    setData:Function; // estado que guarda los datos de la busqueda o datos de forma general
    getData?:Function; // estado que trae todos los datos para reiniciar busqueda
    url:string; // url de la busqueda
    placeholder:string; // texto del input de busqueda
    
    // estados de busqueda, estos van por fuera
    searchState:boolean;
    setSearchState:Function;
    validacion?:number;
    reiniciar?:Function;
    localId?:string;
}

interface srcText {
    value: string
}

export const SearchWrap = ({ 
    setLoadingData, 
    setData, 
    getData, 
    url, 
    placeholder, 
    searchState, 
    setSearchState,
    validacion,
    reiniciar,
    localId
}:searchWrap) => {
    
    const [searchTxt, setSearchTxt] = useState<srcText>({ value: "" });
    const idLocal:string = localId ? `${localId}` : "";
    
    const searchData = async () => { 
        if (
            !(searchTxt.value === "" || 
            searchTxt.value === undefined || 
            searchTxt.value === null || 
            searchTxt.value.length === 0)
        ) {
            setLoadingData(true);
            setSearchState(true);
            try {
                const data = await post(searchTxt, url + idLocal);
                setLoadingData(false);
                setData(data);
            } catch (error) {
                setLoadingData(true);
                console.log(error);
            }
        }
    }


    const handlerStateSearch = () => {
        setSearchTxt({ value: "" });
        setSearchState(false);
        getData && getData();
    }


    const onChangeSearch = (e:any) => { 
        setSearchTxt({
            ...searchTxt,
            [e.target.name]: e.target.value
        });
    }


    return (
        <Search
            searchTxt={searchTxt}
            searchData={searchData}
            searchState={searchState}
            onChangeSearch={onChangeSearch}
            handlerStateSearch={handlerStateSearch}
            // searchFocus={searchFocus}
            placeholder={placeholder}
            reiniciar={reiniciar}
            validacion={validacion}
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

<SearchWrap 
    setLoadingData={setLoadingData}
    setData={setData}
    getData={getData}
    searchState={searchState}
    setSearchState={setSearchState}
    url={COMPROBANTE_SEARCH}
    placeholder="Codigo de venta"
    localId={idLocal}
/>

*/