import { useState } from "react"
import { BiCalendar } from "react-icons/bi";
import { ModalWrap } from "../modals/ModalWrap";
import { ModalFechas } from "./ModalFechas";

interface fechasVentas{
    getData:Function;
    fechas:any;
    setFechas:Function;
}

export const GestionFechas = ({ getData, fechas, setFechas }:fechasVentas) => {
    
    const [modalFechas, setModalFechas] = useState<boolean>(false);

    return (
        <div>

            <button className="btn btn-info" onClick={() => setModalFechas(!modalFechas)}>
                <BiCalendar/>
            </button>

            <ModalWrap modal={modalFechas}>
                <ModalFechas
                    modal={modalFechas}
                    setModal={setModalFechas}
                    getData={getData}
                    fechas={fechas}
                    setFechas={setFechas}
                />
            </ModalWrap>
            
        </div>
    )
}


// requiere 

// componente externo

// const [fechas, setFechas] = useState<any>({ inicio: "_", fin: "_" });

// const getData = async (//... , payloadFechas?:any) => {
//     const dates = payloadFechas ? payloadFechas : fechas;
//     ...
//     const restoURL = `/${value_filtro}/${idLocal}/${dates.inicio}/${dates.fin}/filtro`;
//     ...
// }


// en la paginacion del backend:

// controller
// @Get(".../:inicio/:fin/filtro")
// async index(
//     ...
//     @Param('inicio') inicio:string,
//     @Param('fin') fin:string,
// ): Promise<Pagination<Comprobante>> {
//     ...
//     return ....paginateFilter(...inicio, fin, { // ACTUALIZAR DATOS A COMPROBNATE
//         ...
//         route: `.../${inicio}/${fin}/filtro`
//     });
// }

// service
// async paginateFilter(
//     ...
//     inicio:string, 
//     fin:string, 
//     ...
// ): Promise<Pagination<Comprobante>> {
//     const where:any = {};
//     ...
//     if (inicio !== "_" || fin !== "_" ) {
//         where.created_at = Between(inicio, fin);
//     }
//     ...

// }