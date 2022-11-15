import { useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { StackedAreaChart } from "../../../../components/charts/StackedAreaChart"
import { ModalFechas } from "../../../../components/fechas/ModalFechas";
import { Loading } from "../../../../components/loads/Loading"
import { ModalWrap } from "../../../../components/modals/ModalWrap";

interface charsGanancias {
    data:any;
    loading:boolean;
    getData:Function;
    fechas:string;
    setFechas:Function;
}

export const CharsGanancias = ({ data, loading, getData, fechas, setFechas }:charsGanancias) => {

    const [modalFechas, setModalFechas] = useState<boolean>(false);

    return (
        <>
            <div className="grid-1 gap box m-0 relative chars-ganancias">
                <div className="box-fechas-chars-ganan">
                    <button className="btn btn-info" onClick={() => setModalFechas(!modalFechas)}>
                        <BiCalendar/>
                    </button>
                </div>
                <h3>Ventas de la semana</h3>
                {
                    loading
                    ? <Loading />
                    : (
                        <StackedAreaChart 
                            data={data} 
                            dataKey = "Ganancias_dia" 
                            color="#50a5f1"
                        />
                    )
                }
            </div>
            <ModalWrap modal={modalFechas}>
                <ModalFechas
                    modal={modalFechas}
                    setModal={setModalFechas}
                    getData={getData}
                    fechas={fechas}
                    setFechas={setFechas}
                />
            </ModalWrap>
        </>
    )
}
