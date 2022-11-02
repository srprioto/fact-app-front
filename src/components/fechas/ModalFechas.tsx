import DatePicker, { registerLocale } from "react-datepicker";
import { Loading } from "../loads/Loading";
import { Modal } from "../modals/Modal";
import { BiCheck } from "react-icons/bi";
import { DateTime } from "luxon";
import "react-datepicker/dist/react-datepicker.css";
import es from "date-fns/locale/es";
import { useEffect } from "react";
import { fechaInicioFin } from "../../resources/func/fechas";

registerLocale("es", es);

interface modalFechas {
    modal:boolean;
    setModal:Function;
    getData:Function;
    fechas:any;
    setFechas:Function;
}

export const ModalFechas = ({ modal, setModal, getData, fechas, setFechas }:modalFechas) => {

    const [ inidioDia, finDia ] = fechaInicioFin();
    
    useEffect(() => {
        setFechas({
            inicio: inidioDia,
            fin: finDia
        })
    }, [])


    const handlerFechaInicio = (date:any) => {
        setFechas({ ...fechas, inicio: DateTime.fromJSDate(date).toISO() })
    }

    const handlerFechaFin = (date:any) => { 
        setFechas({ ...fechas, fin: DateTime.fromJSDate(date).toISO() })
    }

    const handlerConfirmar = async () => { 
        await getData();
        setModal();
    }


    // const handlerRestaurar = async () => { 
    //     await getData("", "", "", {
    //         inicio: "_",
    //         fin: "_"
    //     });
    //     setModal();
    // }


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
                                    maxDate={new Date(inidioDia)}
                                />
                            </div>
        
                            <div>
                                <label className="center w100">Hasta</label>
                                <DatePicker
                                    selected={new Date(fechas.fin)} 
                                    onChange={(date:Date) => handlerFechaFin(date)}
                                    locale="es"
                                    dateFormat="dd MMM yyyy"
                                    maxDate={new Date(inidioDia)}
                                />
                            </div>
                        </div>
        
                        <div className="grid-3 gap">
                            <div></div>
                            <button 
                                className="btn btn-success" 
                                onClick={() => handlerConfirmar()}
                            ><BiCheck /> Confirmar
                            </button>
                            {/* <button 
                                className="btn btn-warning" 
                                onClick={() => handlerRestaurar()}
                            ><BiBrush /> Restaurar
                            </button> */}
        
                        </div>
        
                    </div>
                )
                : <Loading />
            }



        </Modal>
    )
}
