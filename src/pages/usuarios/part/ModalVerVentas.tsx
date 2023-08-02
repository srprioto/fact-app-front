import { useEffect, useState } from "react";
import { Modal } from "../../../components/modals/Modal"
import { post } from "../../../resources/fetch";
import { VENTAS } from "../../../resources/routes";
import { Loading } from "../../../components/loads/Loading";
import { NoRegistros } from "../../../components/NoRegistros";
import { RegVentaDetalles } from "./RegVentaDetalles";
import { ToolTip } from "../../../components/tooltip/ToolTip";
import { Pagination2 } from "../../../components/paginacion/Pagination2";
import { paginacionDTO } from "../../../resources/dtos/Pagination";

export const ModalVerVentas = ({ modal, setModal, infoUser }:any) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Array<any>>([]);

    const [paginacion, setPaginacion] = useState<any>(paginacionDTO);

    useEffect(() => {
        getData();
    }, [])

    // funciones
    const getData = async (pagina:number = 1) => {
        setLoading(true);
        const postData:any = {
            pagina: pagina,
            // searchText: searchText.value
        };
        try {
            const resto = await post(postData, VENTAS + "/usuario/paginate/" + infoUser.id);
            console.log(resto);            
            setPaginacion({ ...resto.meta, pagina: pagina })
            setData(resto.data);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            titulo={"Registro de ventas de " + infoUser.nombre}
            width={75}
        >{
            loading 
            ? <Loading />
            : (
                data.length <= 0
                ? <NoRegistros />
                : (
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th id="txt-cod-venta-modal">Codigo venta</th>
                                    <th></th>
                                    <th>Tipo venta</th>
                                    <th>Ingreso venta</th>
                                    <th>Forma pago</th>
                                    <th>Estado venta</th>
                                    <th>Fecha venta</th>
                                    <th className="transparent inlineblock">
                                        <ToolTip
                                            anchor="txt-cod-venta-modal"
                                            descripcion="El código de venta está formado por, el numero de venta general, numero de venta de caja y el correlativo, en caso de ser un comprobante"
                                        /> 
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((e:any, index:number) => {
                                        return (
                                            <RegVentaDetalles
                                                key={index}
                                                ventas={e}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>

                        <Pagination2 paginacion={paginacion} getData={getData} />

                    </div>
                )
            )
            
        }</Modal>
    )
}
