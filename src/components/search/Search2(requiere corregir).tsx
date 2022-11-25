import { Form, Formik } from "formik";
import { useEffect } from "react";
import { BiSearchAlt2, BiX } from "react-icons/bi";
import { validSearchProd } from "../../resources/validations/Ventas";
import { InputMk } from "../forms/InputMk";

interface srcText {
    value: string
}

interface SearchType {
    searchTxt:srcText;
    // searchTxt:string;
    searchData:Function;
    searchState:boolean;
    setSearchState:Function;
    setSearchTxt:Function;
    // onChangeSearch:any;
    // handlerStateSearch:Function;
    // searchFocus:React.MutableRefObject<any>;
    placeholder:string;
    reiniciar?:Function;
    validacion?:number|undefined;
}

// sirve si tu paginacion usa post

export const Search2 = ({ 
    searchTxt, 
    searchState, 
    setSearchState,
    // onChangeSearch, 
    setSearchTxt,
    // searchFocus, 
    // handlerStateSearch,
    searchData,
    placeholder,
    reiniciar,
    validacion
}:SearchType) => {


    const reloadSearch = (e:any) => { 
        e.preventDefault();
        setSearchState(false);
        searchData();
        reiniciar && reiniciar();
    }

    useEffect(() => {
        if (searchState) {
            setSearchTxt({ value: "" });
        }
    }, [searchState])
    

    console.log(searchState);
    console.log(searchTxt);


    const onChangeSearch = (e:any) => { 
        setSearchTxt({
            ...searchTxt,
            [e.target.name]: e.target.value
        });
    }


    // const handlerSearch = (e:any) => { 
    //     e.preventDefault();
    //     searchData();
    // }

    
    return (

        <Formik        
            initialValues={searchTxt}
            // enableReinitialize={true}
            validationSchema={!!validacion ? validSearchProd(4) : null}
            onSubmit={(data, { resetForm }) => {
                // handlerCreate(data);
                setSearchState(true);
                searchData();
            }}
        >
            
            {({ errors }) => (

                <Form className="search" onChange={onChangeSearch}>

                    <InputMk
                        type="text"
                        name="value"
                        placeholder={placeholder}
                        error={errors.value}
                    />

                    {/* <input
                        type="search" 
                        placeholder={placeholder}
                        name="search" 
                        value={searchTxt}
                        onChange={onChangeSearch}
                        ref={searchFocus}
                        autoComplete="off"
                    /> */}

                    {
                        searchState 
                        && (
                            <div className="reload-search" onClick={reloadSearch}>
                                <BiX />
                            </div>
                        )
                    }

                    <button className="btn btn-info" type="submit">
                        <BiSearchAlt2 />
                    </button>

                </Form>

            )}

        </Formik>
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