import { useEffect, useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import { DropDown } from "../../../../components/DropDown";
import { Select } from "../../../../components/forms/Select";
import { Loading } from "../../../../components/loads/Loading";
import { ModalWrap } from "../../../../components/modals/ModalWrap";
import { NoRegistros } from "../../../../components/NoRegistros";
import { Pagination2 } from "../../../../components/paginacion/Pagination2";
import { Search2 } from "../../../../components/search/Search2";
import { paginacionDTO } from "../../../../resources/dtos/Pagination";
import { post } from "../../../../resources/fetch";
import { VENTAS_REPORTES } from "../../../../resources/routes";
import { ModalVerProducto } from "../../../productos/part/ModalVerProducto";

export const ReportesProductos = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Array<any>>([]);
    const [paginacion, setPaginacion] = useState<any>(paginacionDTO);
    const [searchText, setSearchText] = useState<any>({ value: "" });
    const [searchOn, setSearchOn] = useState<boolean>(false);

    const [modalVerProducto, setModalVerProducto] = useState<boolean>(false);
    const [idProducto, setIdProducto] = useState<number>(0);
    const [ordenProductos, setOrdenProductos] = useState<string>("desc");


    useEffect(() => {
        getData();
    }, [ordenProductos, searchOn])


    const getData = async (pagina:number = 1) => {
        setLoading(true);
        const postData:any = {
            pagina: pagina,
            ordenar: ordenProductos,
            searchText: searchText.value
        };
        try {
            const resto = await post(postData, VENTAS_REPORTES + "/top_productos_vendidos");
            setPaginacion({ ...resto.meta, pagina: pagina })
            setData(resto.data);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }


    const handlerVerProducto = (id:number) => { 
        setIdProducto(id);
        setModalVerProducto(true);
    }

    
    return (
        <div className="reportes_productos">
            <div className="box">

                <div className="grid-2 gap">
                    
                    <Search2
                        searchText={searchText}
                        setSearchText={setSearchText}
                        searchOn={searchOn}
                        setSearchOn={setSearchOn}
                        placeholder="Buscar"
                        validacion={3}
                    />

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
                                                    <td>
                                                        <DropDown>
                                                            <span onClick={ () => handlerVerProducto(e.id) }>
                                                                <BiShowAlt /> Ver Producto
                                                            </span>
                                                        </DropDown>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        )
                    )
                }

                <Pagination2 paginacion={paginacion} getData={getData} />

            </div>

            <ModalWrap modal={modalVerProducto}>
                <ModalVerProducto
                    modal={modalVerProducto}
                    setModal={setModalVerProducto}
                    idProducto={idProducto}
                />
            </ModalWrap>

        </div>
    )
}


