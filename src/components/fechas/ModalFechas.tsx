import { useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";

import moment from 'moment';
import 'moment/locale/es';
import { Loading } from "../loads/Loading";
import { Modal } from "../modals/Modal";
import { BiBrush, BiCheck } from "react-icons/bi";

moment.locale('es');
registerLocale("es", es);

interface modalFechas {
    modal:boolean;
    setModal:Function;
    getData:Function;
    fechas:any;
    setFechas:Function;
}

export const ModalFechas = ({ modal, setModal, getData, fechas, setFechas }:modalFechas) => {

    const fechaActual = moment().format('L');
    const inidioDia = moment(fechaActual, "DDMMYYYY");
    const finDia = inidioDia.clone().add(1, "day").subtract(1, 'second');

    
    useEffect(() => {
        setFechas({
            inicio: inidioDia.format(),
            fin: finDia.format()
        })
    }, [])


    const handlerConfirmar = async () => { 
        await getData();
        setModal();
    }


    const handlerRestaurar = async () => { 
        await getData("", "", "", {
            inicio: "_",
            fin: "_"
        });
        setModal();
    }


    const handlerFechaInicio = (date:any) => { 
        setFechas({ ...fechas, inicio: moment(date).format() })
    }

    const handlerFechaFin = (date:any) => { 
        setFechas({ ...fechas, fin: moment(date).format() })
    }


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            title="Mostrar registros entre fechas"
        >
            {
                fechas.inicio !== "_" || fechas.fin !== "_"
                ? (
                    <div className="grid-1 gap">

                        <div className="grid-2 gap">
        
                            <div>
                                <label className="center w100">Desde</label>
                                <DatePicker 
                                    selected={new Date(fechas.inicio)} 
                                    onChange={(date:Date) => handlerFechaInicio(date)}
                                    locale="es"
                                    dateFormat="dd MMM yyyy"
                                    maxDate={moment().toDate()}
                                />
                            </div>
        
                            <div>
                                <label className="center w100">Hasta</label>
                                <DatePicker
                                    selected={new Date(fechas.fin)} 
                                    onChange={(date:Date) => handlerFechaFin(date)}
                                    locale="es"
                                    dateFormat="dd MMM yyyy"
                                    maxDate={moment().toDate()}
                                />
                            </div>
                        </div>
        
                        <div className="grid-4 gap">
                            <div></div>
                            <button 
                                className="btn btn-success" 
                                onClick={() => handlerConfirmar()}
                            ><BiCheck /> Confirmar
                            </button>
                            <button 
                                className="btn btn-warning" 
                                onClick={() => handlerRestaurar()}
                            ><BiBrush /> Restaurar
                            </button>
        
                        </div>
        
                    </div>
                )
                : <Loading />
            }



        </Modal>
    )
}
