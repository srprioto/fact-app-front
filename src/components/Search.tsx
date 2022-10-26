import { Form, Formik } from "formik";
import { BiSearchAlt2, BiX } from "react-icons/bi";
import { InputMk } from "./forms/InputMk";

interface srcText {
    value: string
}

interface SearchType {
    searchTxt:srcText;
    // searchTxt:string;
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


    // const handlerSearch = (e:any) => { 
    //     e.preventDefault();
    //     searchData();
    // }


    console.log(searchTxt);  


    return (

        <Formik        
            initialValues={searchTxt}
            // validationSchema={cliente.tipoDocumento === "DNI" ? ValidRegistroClienteDni : ValidRegistroClienteRuc}
            onSubmit={(data, { resetForm }) => { 
                // handlerCreate(data);
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
                        searchState && (
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