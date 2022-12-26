import { useEffect, useState } from "react";
import { Select } from "../../../../components/forms/Select";
import { Loading } from "../../../../components/loads/Loading";
import { NoRegistros } from "../../../../components/NoRegistros";
import { Paginacion2 } from "../../../../components/paginacion/Paginacion2";
import { paginacionDTO } from "../../../../resources/dtos/Pagination";
import { post } from "../../../../resources/fetch";
import { VENTAS_REPORTES } from "../../../../resources/routes";

export const ReportesProductos = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Array<any>>([]);
    const [paginacion, setPaginacion] = useState<any>(paginacionDTO);
    const [ordenProductos, setOrdenProductos] = useState<string>("desc");
    const [searchText, setSearchText] = useState<string>("");


    useEffect(() => {
        getData();
    }, [paginacion.pagina, ordenProductos])


    const getData = async () => {
        setLoading(true);
        const postData:any = {
            pagina: paginacion.pagina,
            ordenar: ordenProductos
        };
        try {
            const resto = await post(postData, VENTAS_REPORTES + "/top_productos_vendidos");
            setPaginacion({ ...paginacion, ...resto.meta })
            setData(resto.data);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    // console.log(data);    

    return (
        <div className="reportes_productos">
            <div className="box">

                <div className="grid-2 gap">
                    <div></div>
                    {/* <SearchWrap
                        setLoadingData={setLoadingData}
                        setData={setData}
                        getData={getData}
                        searchState={searchState}
                        setSearchState={setSearchState}
                        url={VENTAS_SEARCH}
                        placeholder="Codigo de venta, cliente o nro de doc."
                        localId={idLocal}
                    /> */}
                    <div className="grid-2 gap">
                        <div></div>
                        <Select
                            name={"orden_productos"}
                            onChange={(e:any) => setOrdenProductos(e.target.value)}
                            // textDefault="Ordenar productos"
                            // defaultValue={true}
                        >
                            <option value={"desc"}>Más vendidos</option>
                            <option value={"asc"}>Menos vendidos</option>
                            {/* <option value={"ninguno"}>Sin ventas</option> */}
                        </Select>

                    </div>
                </div>

            </div>
            <div className="box">
                
                {
                    loading 
                    ? <Loading />
                    : (
                        data.length <= 0
                        ? <NoRegistros />
                        : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>T. Und. vendidas</th>
                                        <th>Codigo</th>
                                        <th>Nombre</th>
                                        <th>Marca</th>
                                        <th>Talla</th>
                                        <th>Color</th>
                                        <th className="transparent inlineblock">...</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((e:any, index:number) => {
                                            return (
                                                <tr key={index} className="venta-items">
                                                    <td className="strong success">{ e.cantidad_venta }</td>
                                                    <td className="secundary">{ e.codigo }</td>
                                                    <td>{ e.nombre }</td>
                                                    <td>{ e.marca }</td>
                                                    <td>{ e.talla }</td>
                                                    <td>{ e.color }</td>
                                                    <td></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                    )
                }

                <Paginacion2 paginacion={paginacion} setPaginacion={setPaginacion} />

            </div>
        </div>
    )
}


