import { BiSearchAlt2, BiX } from "react-icons/bi";

interface SearchType {
    searchTxt:string;
    searchData:Function;
    searchState:boolean;
    onChangeSearch:any;
    handlerStateSearch:Function;
    searchFocus:React.MutableRefObject<any>;
    placeholder:string;
    reiniciar?:Function;
}

export const Search = ({ 
    searchTxt, 
    searchState, 
    onChangeSearch, 
    searchFocus, 
    handlerStateSearch,
    searchData,
    placeholder,
    reiniciar
}:SearchType) => {


    const reloadSearch = (e:any) => { 
        e.preventDefault();
        handlerStateSearch();
        reiniciar && reiniciar();
    }


    const handlerSearch = (e:any) => { 
        e.preventDefault();
        searchData();
    }


    return (
        <form className="search">

            <input 
                type="search" 
                placeholder={placeholder}
                name="search" 
                value={searchTxt}
                onChange={onChangeSearch}
                ref={searchFocus}
                autoComplete="off"
            />

            {
                searchState && (
                    <div className="reload-search" onClick={reloadSearch}>
                        <BiX />
                    </div>
                )
            }

            <button className="btn btn-info" onClick={handlerSearch}>
                <BiSearchAlt2 />
            </button>

        </form>
    )
};



// return (
//     <form className="search">
//         {
//             !searchState
//             ? (
//                 <input 
//                     type="search" 
//                     placeholder={placeholder}
//                     name="search" 
//                     value={searchTxt}
//                     onChange={onChangeSearch}
//                     ref={searchFocus}
//                     autoComplete="off"
//                 />
//             ) : (
//                 <input 
//                     type="text" 
//                     className="form-disabled"
//                     value={searchTxt}
//                     disabled={true}
//                 />
//             )
//         }
//         {
//             searchState
//             ? <button 
//                 className="btn btn-danger" 
//                 onClick={(e:any) => {
//                     e.preventDefault();
//                     handlerStateSearch()
//                 }}
//             ><BiRotateLeft /></button>
//             : <button 
//                 className="btn btn-info" 
//                 onClick={(e:any) => {{
//                     e.preventDefault();
//                     searchData();
//                 }}}
//             ><BiSearchAlt2 /></button>
//         }
//     </form>
// )