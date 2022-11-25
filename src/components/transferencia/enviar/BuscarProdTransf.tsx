import { useState } from "react";
import { LOCAL_STOCK_SEARCH } from "../../../resources/routes";
import { Loading } from "../../loads/Loading";
import { SearchWrap } from "../../search/SearchWrap";
import { TextoRelleno } from "../../TextoRelleno";

export const BuscarProdTransf = ({ 
    idLocal, 
    setListaProductos, 
    listaProductos, 
    repetidos, 
    setRepetidos,
    data, 
    setData
}:any) => {

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [searchState, setSearchState] = useState<boolean>(false); // estado de busqueda

    const handlerOnClick = (e:any) => { 
        const prod = {
            productoNombre: e.productos.nombre,
            marca: e.productos.marca,
            talla: e.productos.talla,
            cantidad: e.cantidad,
            cantOriginal: e.cantidad,
            productosId: e.productos.id
        }
        setListaProductos([
            ...listaProductos,
            prod
        ])
        setRepetidos([
            ...repetidos,
            e.id
        ])
    }

    return (
        <div className="box box-par m-0 buscar-productos-transf">
            <div className="mb-20">
                <SearchWrap 
                    setLoadingData={setLoadingData}
                    setData={setData}
                    // getData={getData}
                    searchState={searchState}
                    setSearchState={setSearchState}
                    url={LOCAL_STOCK_SEARCH}
                    placeholder="Codigo, nombre, marca, color del prod"
                    localId={idLocal}
                />
            </div>
            {
                !loadingData
                ? (
                    data.length > 0
                    ? (
                        <div className="seleccionar-productos">
                            <table className="table3">
                                <thead>
                                    <tr>
                                        {/* <th>Codigo</th> */}
                                        <th>Producto</th>
                                        <th>Cantidad</th>
                                    </tr>
                                </thead>
                            
                                <tbody>
                                    {
                                        data.map((e:any) => {
                                            const producto:any = e.productos ? e.productos : {};
                                            if (!(repetidos.includes(e.id))){
                                                return (
                                                    <tr 
                                                        key={e.id}
                                                        onClick={() => {
                                                            if (e.cantidad > 0) {
                                                                handlerOnClick(e)
                                                            }
                                                        }}
                                                        className={e.cantidad <= 0 ? "disable" : ""}
                                                    >
                                                        {/* <td className="secundary">{ producto.codigo }</td> */}
                                                        <td className="secundary">{ 
                                                            producto.nombre + " - " + 
                                                            producto.marca + " - " + 
                                                            producto.talla
                                                        }</td>
                                                        {/* <td>{ producto.marca }</td>
                                                        <td className="secundary">{ producto.talla }</td> */}
                                                        <td className={
                                                            "strong " + 
                                                            (
                                                                e.cantidad <= 0
                                                                ? "danger"
                                                                : "success"
                                                            )
                                                        }>
                                                            { e.cantidad }
                                                        </td>
                                                    </tr>
                                                    
                                                )
                                            } else {
                                                return null;
                                            }
                                        })   
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : <div className="fill-txt-buscar-prod"><TextoRelleno texto="Busca un producto" /></div>
                ) : <div className="fill-txt-buscar-prod"><Loading /></div>
            }
        </div>
    )
}


/* <div className="grid-all-btn">
    <SearchWrap 
        setLoadingData={setLoadingData}
        setData={setData}
        searchState={searchState}
        setSearchState={setSearchState}
        url={LOCAL_STOCK_SEARCH + `${idLocal}/`}
        placeholder="Nombre producto"
        localId={idLocal}
    />
    <button
        className="btn2 btn2-success pr-0"
        onClick={() => handlerRefresh()}
    >
        <BiRefresh />
    </button>
</div> */
