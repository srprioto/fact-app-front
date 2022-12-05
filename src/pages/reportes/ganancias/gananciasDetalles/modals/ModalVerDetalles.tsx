import { useState } from "react";
import { BiListUl } from "react-icons/bi";
import { Select } from "../../../../../components/forms/Select";
import { Modal } from "../../../../../components/modals/Modal"
import { formatoConSlash } from "../../../../../resources/func/fechas";
import { InfoTabbsVerDetalles } from "./InfoTabbsVerDetalles";

interface modalVerDetalles {
    modal:boolean;
    setModal:Function;
    fecha:string;
    locales:any
    loadingLocales:boolean;
}

export const ModalVerDetalles = ({ modal, setModal, fecha, locales, loadingLocales }:modalVerDetalles) => {
   
    const [tabbs, setTabbs] = useState<number>(1);
    const [idLocal, setIdLocal] = useState<string>("_");


    return (
        <Modal
            modal={modal}
            setModal={setModal}
            width={75}
            title={"Detalles de ganancias de " + formatoConSlash(fecha)}
        >
            <div className="box box-par m-0">
                <div className="grid-4 gap mb-30">
                    <button
                        onClick={() => setTabbs(1)}
                        className={`btn2 btn2-info ${tabbs === 1 && "btn2-sub-info"}`}>
                        <BiListUl />
                        Ingresos de ventas
                    </button>
                    <button 
                        onClick={() => setTabbs(2)}
                        className={`btn2 btn2-info ${tabbs === 2 && "btn2-sub-info"}`}>
                        <BiListUl />
                        Ingresos y egresos
                    </button>
                    <button 
                        onClick={() => setTabbs(3)}
                        className={`btn2 btn2-info ${tabbs === 3 && "btn2-sub-info"}`}>
                        <BiListUl />
                        Movimientos de caja
                    </button>
                    <div>
                        <Select
                            loading={loadingLocales}
                            name={"id_local"}
                            onChange={(e:any) => setIdLocal(e.target.value)}
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

                <InfoTabbsVerDetalles
                    tabbs={tabbs}
                    fecha={fecha}
                    idLocal={idLocal}
                />
                
            </div>

        </Modal>
    )
}
