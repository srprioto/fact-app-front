import { useState } from "react";
import { Loading } from "../../../../components/loads/Loading";
import { SearchWrap } from "../../../../components/SearchWrap";
import { TextoRelleno } from "../../../../components/TextoRelleno";
import { LOCAL_STOCK_SEARCH } from "../../../../resources/routes";

export const BuscarProducto = ({ setElemento, elemento, data, setData, listaRepetidos, idLocal }:any) => {

    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [searchState, setSearchState] = useState<boolean>(false);

    return (
        <div className="buscar-producto box box-par m-0 grid-1 gap">
            <div className="box-buscar-producto">
                <SearchWrap 
                    url={LOCAL_STOCK_SEARCH + `${idLocal}/`}
                    setLoadingData={setLoadingData}
                    setData={setData}
                    // getData={getData}
                    searchState={searchState}
                    setSearchState={setSearchState}
                    placeholder="Buscar un producto ..."
                    validacion={4}
                    // reiniciar={reinicios}
                    // reSearch={listaRepetidos}
                />
            </div>
            {
                loadingData
                ? <div className="loading-lista-prod"><Loading /></div>
                : ( 
                    data.length !== 0
                    ? (
                        <div className="lista-productos box box-par m-0">
                            <table className="table3">
                                <thead>
                                    <tr>
                                        {/* <th>Codigo</th> */}
                                        <th>Nombre</th>
                                        {/* <th>Descrip.</th> */}
                                        {/* <th>Cantidad</th> */}
                                        <th>Color</th>
                                        <th>Marca</th>
                                        <th>Talla</th>
                                        <th>P./u</th>
                                        <th>P./men</th>
                                        <th>P./may</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((e:any) => {
                                            const prod = e.productos && e.productos;
                                            if (!(listaRepetidos.includes(prod.id))){
                                                return(
                                                    <tr
                                                        key={e.id}
                                                        onClick={() => setElemento(e)}
                                                        className={(elemento.id === e.id ? 'active-row' : "")}
                                                    >
                                                        {/* <td>{ producto.codigo }</td> */}
                                                        <td>{ prod.nombre }</td>
                                                        {/* <td>{ prod.descripcion }</td> */}
                                                        {/* <td>{ e.cantidad }</td> */}
                                                        <td>{ prod.color }</td>
                                                        <td>{ prod.marca }</td>
                                                        <td>{ prod.talla }</td>
                                                        <td className="strong">S/. { prod.precio_venta_1 }</td>
                                                        <td className="strong">S/. { prod.precio_venta_2 }</td>
                                                        <td className="strong">S/. { prod.precio_venta_3 }</td>
                                                    </tr>  
                                                )
                                            }
                                            return null
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="lista-productos m-0">
                            <TextoRelleno texto="No se encontraron productos" />
                        </div>
                    )
                )
            }
        </div>        
    )
}
