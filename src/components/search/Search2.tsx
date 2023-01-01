import { Form, Formik } from "formik";
import { useState } from "react";
import { BiSearchAlt2, BiX } from "react-icons/bi";
import { validSearchProd } from "../../resources/validations/Ventas";
import { InputMk } from "../forms/InputMk";

interface srcText {
    value: string
}

interface SearchType {
    searchText:srcText;
    setSearchText:Function;
    placeholder:string;
    validacion:number;
}

// sirve si la paginacion usa post
export const Search2 = ({ 
    searchText, 
    setSearchText,
    placeholder = "",
    validacion = 4,
}:SearchType) => {

    const [searchOn, setSearchOn] = useState<boolean>(false);

    const reloadSearch = (e:any) => { 
        setSearchOn(false);
        setSearchText({ value: "" });
    }


    return (

        <Formik        
            initialValues={searchText}
            enableReinitialize={true}
            validationSchema={!!validacion ? validSearchProd(validacion) : null}
            onSubmit={(data, { resetForm }) => {
                setSearchText({ value: data.value })             
                setSearchOn(true);
            }}
        >
            
            {({ errors }) => (

                <Form className="search">

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

// useEffect(() => {
//     getData();
// }, [searchOn])

// // funciones
// const getData = async (pagina:number = 1) => {
//     setLoading(true);
//     const postData:any = {
//         pagina: pagina,
//         ordenar: ordenProductos,
//         searchText: searchText.value
//     };
//     try {
//         const resto = await post(postData, VENTAS_REPORTES + "/top_productos_vendidos");
//         setPaginacion({ ...resto.meta, pagina: pagina })
//         setData(resto.data);
//         setLoading(false);
//     } catch (error) {
//         setLoading(true);
//         console.log(error);
//     }
// }