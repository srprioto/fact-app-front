import { useEffect, useState } from "react";
import { BiShowAlt } from "react-icons/bi";
import { DropDown } from "../../../../components/DropDown";
import { Loading } from "../../../../components/loads/Loading";
import { ModalWrap } from "../../../../components/modals/ModalWrap";
import { NoRegistros } from "../../../../components/NoRegistros";
import { Pagination2 } from "../../../../components/paginacion/Pagination2";
import { Search2 } from "../../../../components/search/Search2";
import { paginacionDTO } from "../../../../resources/dtos/Pagination";
import { post } from "../../../../resources/fetch";
import { VENTAS_REPORTES } from "../../../../resources/routes";
import { ModalVerProducto } from "../../../productos/part/ModalVerProducto";

export const ReportesNoVentProds = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Array<any>>([]);
    const [paginacion, setPaginacion] = useState<any>(paginacionDTO);
    const [searchText, setSearchText] = useState<any>({ value: "" });

    const [modalVerProducto, setModalVerProducto] = useState<boolean>(false);
    const [idProducto, setIdProducto] = useState<number>(0);


    useEffect(() => {
        getData();
    }, [searchText])
    

    const getData = async (pagina:number = 1) => {
        setLoading(true);
        const postData:any = {
            pagina: pagina,
            searchText: searchText.value,
        };
        try {
            const resto = await post(postData, VENTAS_REPORTES + "/top_productos_sin_ventas");
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
                        placeholder="Buscar"
                        validacion={3}
                    />

                    {/* <div className="grid-2 gap">

                        <SelectLocalesRepProds
                            setIdLocal={setIdLocal}
                        />

                        <Select
                            name={"orden_productos"}
                            onChange={(e:any) => setOrdenProductos(e.target.value)}
                        >
                            <option value={"desc"}>Más vendidos</option>
                            <option value={"asc"}>Menos vendidos</option>
                        </Select>

                    </div> */}
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
                                        <th>Estado</th>
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
                                                    <td className="strong warning">Sin ventas</td>
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
