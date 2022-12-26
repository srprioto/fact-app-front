import { useEffect, useState } from "react";
import { get } from "../../resources/fetch";
// import { capi } from "../../resources/func/mayus";
// import { METODOS_PAGO } from "../../resources/routes";

interface metodosPago { 
    label?:string;
    name:string;
    onChange:any;
    value:string;
}

export const MetodosPagoDep = ({ label, name, onChange, value }:metodosPago) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Array<any>>([]);

    useEffect(() => {
        getMetodos();
    }, [])
    

    const getMetodos = async () => { 
        setLoading(true);
        try {
            const data = await get("METODOS_PAGO");
            setData(data);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }


    return (

        <div className="wrap-form w100">
            { label && <><label htmlFor={name}>{ label }</label><br /></> }
            <select 
                name={name}
                id={name}
                onChange={onChange}
                defaultValue={value}
            >
                {
                    loading
                    ? <option value={0}>Cargando datos</option>
                    : (
                        data.map((e:any) => { 
                            return (
                                <option key={e.id} value={e.nombre}>{ e.nombre }</option>
                                // <option key={e.id} value={e.nombre}>{ capi(e.nombre) }</option>
                            );
                        })
                    )
                }
            </select>     
            
        </div>



    )
}


// <Select2
//     label={label}
//     name={name}
//     onChange={onChange}
//     value={value}
// >
//     {/* {
//         loading
//         ? <option value={0}>Cargando datos</option>
//         : (
//             data.map((e:any) => { 
//                 return (
//                     <option key={e.id} value={e.nombre}>{ capi(e.nombre) }</option>
//                 );
//             })
//         )
//     } */}
//     {
//         data.map((e:any) => { 
//             return (
//                 <option key={e.id} value={e.nombre}>{ capi(e.nombre) }</option>
//             );
//         })
//     }


// </Select2>