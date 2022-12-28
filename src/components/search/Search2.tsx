import { Form, Formik } from "formik";
import { useEffect } from "react";
import { BiSearchAlt2, BiX } from "react-icons/bi";
import { validSearchProd } from "../../resources/validations/Ventas";
import { InputMk } from "../forms/InputMk";

interface srcText {
    value: string
}

interface SearchType {
    searchText:srcText;
    searchData:Function;
    searchOn:boolean;
    setSearchOn:Function;
    setSearchText:Function;
    placeholder:string;
    reiniciar?:Function;
    validacion?:number|undefined;
}

// sirve si la paginacion usa post

export const Search2 = ({ 
    searchText, 
    setSearchText,
    getData,
    searchOn, 
    setSearchOn,
    paginacion,
    setPaginacion,
    placeholder = "",
    validacion = 4,
    // reiniciar,
}:any) => {


    const reloadSearch = (e:any) => { 
        setSearchText({ value: "" })
        setSearchOn(false);
        getData();
        // setPaginacion({
        //     ...paginacion,
        //     pagina: 1
        // });
        // e.preventDefault();
        // searchData();
        // reiniciar && reiniciar();
    }


    useEffect(() => {
        if (!searchText.value) {
            setSearchOn(false);
            getData();
        }
    }, [searchText.value])





    // useEffect(() => {
    //     if (paginacion.pagina !== 1) {
    //         setPaginacion({
    //             ...paginacion,
    //             pagina: 1
    //         })
    //     }
    // }, [searchOn])


    const onChangeSearch = (e:any) => { 
        setSearchText({
            ...searchText,
            [e.target.name]: e.target.value
        });
    }


    // const handlerSearch = (e:any) => { 
    //     e.preventDefault();
    //     searchData();
    // }

    
    // console.log(paginacion);
        

    return (

        <Formik        
            initialValues={searchText}
            enableReinitialize={true}
            validationSchema={!!validacion ? validSearchProd(validacion) : null}
            onSubmit={(data, { resetForm }) => {
                setSearchOn(true);
                getData(true);
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

                    {
                        searchOn 
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

// // por fuera
// const [searchText, setSearchText] = useState<any>({ value: "" });
// const [searchOn, setSearchOn] = useState<boolean>(false);