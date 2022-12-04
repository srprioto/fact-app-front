import { useState } from "react"
import { BiShowAlt } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"
import { ModalWrap } from "../../../../components/modals/ModalWrap"
import { formatoConSlash } from "../../../../resources/func/fechas"
import { moneda } from "../../../../resources/func/moneda"
import { ModalVerDetalles } from "./modals/ModalVerDetalles"

interface tablaGananciasDetall {
    data:any;
    locales:any;
    loadingLocales:boolean;
}

export const TablaGananciasDetall = ({ data, locales, loadingLocales }:tablaGananciasDetall) => {
    
    const [modalVerDetalles, setModalVerDetalles] = useState<boolean>(false);
    const [FechaGananciasDetalles, setFechaGananciasDetalles] = useState<string>("");

    const handlerVerDetalles = (fecha:string) => {
        setFechaGananciasDetalles(fecha);
        setModalVerDetalles(!modalVerDetalles);
    }

    return (
        <>
            <table className="table">
                <thead>
                    <tr>
                        {/* <th>Ingresos del dia</th>
                        <th>Costos del dia</th> */}
                        <th>Ganancias del dia</th>
                        <th>Fecha</th>
                        <th></th>
                        {/* <th className="transparent inlineblock">...</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        data.query.map((e:any, index:number) => {
                            return (
                                <tr className="items-caja" key={index}>
                                    {/* <td>S/. { moneda(e.Ingresos_dia) }</td>
                                    <td>S/. { moneda(e.Costos_dia) }</td> */}
                                    <td className={
                                        e.Ganancias_dia > 0
                                        ? "success strong"
                                        : "danger strong"
                                    }>S/. { moneda(e.Ganancias_dia) }</td>
                                    {/* <td className="">{ e.Fecha }</td> */}
                                    <td>{ formatoConSlash(e.Dia) }</td>
                                    <td className="td-dd">
                                        <DropDown>
                                            <span onClick={ () => handlerVerDetalles(e.Dia) }>
                                                <BiShowAlt /> Ver detalles
                                            </span>
                                        </DropDown>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            
            <ModalWrap modal={modalVerDetalles}>
                <ModalVerDetalles
                    modal={modalVerDetalles}
                    setModal={setModalVerDetalles}
                    fecha={FechaGananciasDetalles}
                    locales={locales}
                    loadingLocales={loadingLocales}
                />
            </ModalWrap>

        </>
    )
}
