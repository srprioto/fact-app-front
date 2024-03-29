import { useState } from "react";
import { Link } from "react-router-dom";
import { BiSearchAlt2, BiX } from "react-icons/bi";

import { post } from "../../resources/fetch";

// IMPORTANTE
// requiere que los registros que se iteraran en las opciones tengan un nombre
// setSwitchSelect .- sirve para manipular el estado del select desde fuera del switch en caso de que se requiera

interface selectSearch {
    label:string; // texto del label
    respuesta:Function; // value de options selecionado generalmente ID almacenado en estado o funcion
    urlData:string; // url para relizar busqueda de forma local
    type?:string; // tipo de input
    repetidos?:Array<number>; // id de productos apilados
    // data?:any; // data usada para iterar options
    // searchData?:Function; // funcion que ejecuta la busqueda de datos
    // loading?:boolean; // estado de carga en caso de traer datos desde fuera
    link?:string; // link para redireccion
    modal?:Function; // en caso de que sea un modal
    textoLink?:string;
    switchSelect?:boolean; // estado para alternar select e input de busqueda desde fuera
    setSwitchSelect?:Function; // funcion de manejo de estado para alternar select - false para desactivar
    placeholder?:string; // descripcion de input
    reinicios?:Function; // reiniciar estados desde fuera
}

export const SelectSearchProd = ({ 
    label, 
    type = "text", 
    respuesta, 
    repetidos = [],
    // data, 
    // loading, 
    // searchData, 
    urlData,
    link,
    modal,
    textoLink = "¿Crear nuevo?",
    placeholder,
    switchSelect,
    setSwitchSelect,
    reinicios
}:selectSearch) => {

    const [input, setInput] = useState<string>("");
    const [selectOn, setSelectOn] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    

    let changeSelect:boolean;
    if (switchSelect) {
        changeSelect = switchSelect;
    }else{
        changeSelect = selectOn;
    }

    const handlerInput = (e:any) => { 
        e.preventDefault();
        if (input !== "") {
            
            handlerGetData(input);    
            
            if (setSwitchSelect) {
                setSwitchSelect(!switchSelect);
            }else{
                setSelectOn(!selectOn);
            }    
            setInput("");
        }        
    }

    const handlerSelect = (e:any) => { 
        e.preventDefault();
        if (setSwitchSelect) {
            setSwitchSelect(!switchSelect);
        }else{
            setSelectOn(!selectOn);
        }
        if (reinicios) {
            reinicios();
        }
    }

    const handlerGetData = async (search:string) => { 
        setLoading(true);
        try {
            // const data = await get(urlData + search);
            const data = await post({value: search}, urlData);
            setData(data);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    // const slabOption = (e:any) => { 
    //     return (
    //         e.codigo
    //         ? e.nombre + " " + e.marca + " " + e.talla
    //         : e.razon_social
    //         ? e.razon_social + " - " + e.nombre
    //         : e.productos
    //         ? `${e.productos.codigo} - ${e.productos.nombre}`
    //         : e.nombre
    //     )
    // }


    return (
        <div className="wrap-form">
            <label className="flex-space">
                <span>{ label }</span>
                {
                    link
                    ? <Link to={link}>{ textoLink }</Link>
                    : modal
                    && <span className="red-text" onClick={() => { modal(true) }}>{ textoLink }</span>
                }
            </label>
            {
                !changeSelect
                ? (
                    <form className="select-search">

                        <input 
                            type={type} 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={placeholder}
                            autoComplete="off"
                            pattern="[A-Za-z0-9_-]{1,15}"
                            // onKeyPress={check}
                        />
                        <button 
                            className="btn btn-search info" 
                            onClick={handlerInput}
                        ><BiSearchAlt2 /></button>
        
                    </form>
                ) : (
        
                    <div className="wrap-sel">

                        <form className="select-search">

                            {/* <div className="arrow-select">
                                <BiCaretDown />
                            </div> */}
                            <select 
                                onChange={(e) => { // devuelve respuesta fuera del componente
                                    respuesta(e.target.value)
                                }}
                                defaultValue="no"
                            >

                                {
                                    loading
                                    ? (
                                        <option value="no" disabled>Cargando datos ...</option>        
                                    ) : data.length <= 0
                                    ? <option value="no" disabled>No hay coincidencias</option>
                                    : (
                                        <>
                                            <option value="no" disabled>Selecciona un valor</option>
                                            {
                                                data.map((e:any) => {

                                                    if (!(repetidos.includes(e.id))) {
                                                        let value:string;
                                                        // en caso de que sea localstock
                                                        value = e.id + "@" + e.nombre + " - " + e.marca + " - " + e.talla

                                                        return (
                                                            <option 
                                                                key={e.id}
                                                                value={value}
                                                            >
                                                                { e.nombre + " - " + e.marca + " - " + e.talla }
                                                            </option>
                                                        )    
                                                    }
                                                    
                                                    return (null)

                                                })
                                            }
                                        </>
                                    )
                                }
                                
                            </select>
                            <button 
                                className="btn-search danger" 
                                onClick={handlerSelect}
                            >
                                <BiX />
                            </button>

                        </form>
                            
                    </div>                    
                )
            }

        </div>
    )
};


/* 

<SelectSearch
    label="Producto"
    type="text"
    respuesta={handlerDataProductos}
    urlData={PRODUCTOS_SEARCH}
    // data={productos}
    // loading={loadingProductos}
    // searchData={searchProductos}
    link="/productos/crear-producto"
    switchSelect={switchProductos}
    setSwitchSelect={setSwitchProductos}
    placeholder="Nombre o codigo ..."
    reinicios={handlerReinicioProd}
/> 

*/

// ESTRUCTURA FUERA DEL COMPONENTE:

// const [switchSelectClientes, setSwitchSelectClientes] = useState<boolean>(false);

// const handlerCliente = (cliente:any) => { 
//     setVenta({
//         ...venta,
//         clienteId: Number((cliente.split('@'))[0]),
//         nombre_cliente: (cliente.split('@'))[1]
//     })
// }


// ***********************


// EVITAR ELEMENTOS REPETIDOS:
// const [productosRepe, setProductosRepe] = useState<Array<number>>([]); // almacena ids de productos en lista

// setProductosRepe([ // añade ids a la lista de repetidos
//     ...productosRepe,
//     movDetails.producto.id
// ]);

// <SelectSearch
//     // ...
//     repetidos={productosRepe}
//     // ...
// />








