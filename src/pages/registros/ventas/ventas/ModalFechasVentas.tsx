import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { Modal } from "../../../../components/modals/Modal"
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');
registerLocale("es", es);

export const ModalFechasVentas = ({ modal, setModal, getData }:any) => {

    const hoy:Date = new Date();
    hoy.setHours(0, 0, 0, 0);

    const ayer:Date = new Date();
    ayer.setHours(0, 0, 0, 0);

    const [fechaInicio, setFechaInicio] = useState<Date>(new Date(ayer.setTime(ayer.getTime() - (24*60*60*1000))));
    const [fechaFin, setFechaFin] = useState<Date>(new Date(hoy.toDateString()));

    // console.log(fechaInicio);
    // console.log(fechaFin);
    // console.log("**********");
    // console.log(moment(fechaInicio).format());
    // console.log(moment(fechaFin).format());

    return (
        <Modal
            modal={modal}
            setModal={setModal}
            title="Mostrar registros entre fechas"
        >

            <div className="grid-1 gap">

                <div className="grid-2 gap">

                    <div>
                        <label className="center w100">Desde</label>
                        <DatePicker 
                            selected={fechaInicio} 
                            onChange={(date:Date) => setFechaInicio(date)}
                            locale="es"
                            dateFormat="dd MMM yyyy"
                            maxDate={moment().toDate()}
                        />
                    </div>

                    <div>
                        <label className="center w100">Hasta</label>
                        <DatePicker
                            selected={fechaFin} 
                            onChange={(date:Date) => setFechaFin(date)}
                            locale="es"
                            dateFormat="dd MMM yyyy"
                            maxDate={moment().toDate()}
                        />
                    </div>

                </div>

                <div className="grid-3 gap">
                    <div></div>
                    <button 
                        className="btn btn-success" 
                        onClick={() => getData(getData(
                            "", 
                            "_", 
                            0, {
                                inicio: (moment(fechaInicio).format()).toString(),
                                fin: (moment(fechaFin).format()).toString()
                            }
                        ))}
                    >
                        Ok
                    </button>

                </div>

            </div>

        </Modal>
    )
}
