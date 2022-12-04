import { useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { StackedAreaChart } from "../../../../components/charts/StackedAreaChart"
import { ModalFechas } from "../../../../components/fechas/ModalFechas";
import { Select } from "../../../../components/forms/Select";
import { Loading } from "../../../../components/loads/Loading"
import { ModalWrap } from "../../../../components/modals/ModalWrap";

interface charsGanancias {
    data:any;
    loading:boolean;
    getData:Function;
    fechas:string;
    setFechas:Function;
    handlerLocal:Function;
    loadingLocales:boolean;
    locales:any;
}

export const CharsGanancias = ({ 
    data, 
    loading, 
    getData, 
    fechas, 
    setFechas, 
    handlerLocal, 
    loadingLocales, 
    locales 
}:charsGanancias) => {

    const [modalFechas, setModalFechas] = useState<boolean>(false);

    return (
        <>
            <div className="grid-1 gap box m-0 relative chars-ganancias">
                <div className="box-fechas-chars-ganan">
                    <div className="grid-14 gap">
                        <button className="btn btn-info" onClick={() => setModalFechas(!modalFechas)}>
                            <BiCalendar/>
                        </button>
                        <Select
                            loading={loadingLocales}
                            name={"id_local"}
                            onChange={handlerLocal}
                            textDefault="Selecciona un local"
                            defaultValue={false}
                        >
                            <option value={"_"}>Todas las tiendas</option>
                            {
                                locales.map((e:any) => {
                                    return (
                                        <option key={e.id} value={Number(e.id)}>{ e.nombre }</option>
                                    )
                                })
                            }
                        </Select>
                    </div>
                </div>
                <h3>Estadisticas de las ganancias</h3>
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
