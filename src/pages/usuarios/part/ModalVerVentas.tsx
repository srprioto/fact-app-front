import { useEffect, useState } from "react";
import { Modal } from "../../../components/modals/Modal"
import { post } from "../../../resources/fetch";
import { VENTAS } from "../../../resources/routes";
import { paginacionDTO } from "../../../resources/dtos/Pagination";
import { GestionFechas } from "../../../components/fechas/GestionFechas";
import { ListaProductosUsuario } from "./ListaProductosUsuario";
import { BiListUl, BiUser } from "react-icons/bi";
import { ResumenProductosUsuarios } from "./ResumenProductosUsuarios";


export const ModalVerVentas = ({ modal, setModal, infoUser }:any) => {

    const [data, setData] = useState<Array<any>>([]);
    const [detalles, setDetalles] = useState<any>({})
    const [loading, setLoading] = useState<boolean>(true);

    const [fechas, setFechas] = useState<any>({ inicio: "_", fin: "_" });
    const [paginacion, setPaginacion] = useState<any>(paginacionDTO);
    const [tabs, setTabs] = useState<number>(1);

    
    useEffect(() => {
        getData();
    }, [])

    // funciones
    const getData = async (pagina:number = 1) => {
        setLoading(true);
        const postData:any = {
            pagina: pagina,
            fechas: fechas
            // searchText: searchText.value
        };
        try {
            const response = await post(postData, VENTAS + "/usuario/paginate/" + infoUser.id);
            setPaginacion({ ...response.resto.meta, pagina: pagina })
            setData(response.resto.data);
            setDetalles(response.detalles);
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
        >

            <div className="box box-par grid-4">
                <button 
                    onClick={() => setTabs(1)}
                    className={`btn2 btn2-info ${tabs === 1 && "btn2-sub-info"}`}>
                    <BiUser />
                    Resumen de personal
                </button>
                <button
                    onClick={() => setTabs(2)}
                    className={`btn2 btn2-info ${tabs === 2 && "btn2-sub-info"}`}>
                    <BiListUl />
                    Lista de ventas
                </button>
                <div></div>
                <div className="flex-right">
                    <GestionFechas 
                        getData={getData} 
                        fechas={fechas}
                        setFechas={setFechas}
                    />
                </div>
            </div>

            {
                tabs === 1 
                && <ResumenProductosUsuarios 
                    detalles={detalles}
                    loading={loading}
                />
            }

            {
                tabs === 2 
                && <ListaProductosUsuario
                    data={data}
                    getData={getData}
                    loading={loading}
                    paginacion={paginacion}
                />
            }
            

        </Modal>
    )
}
