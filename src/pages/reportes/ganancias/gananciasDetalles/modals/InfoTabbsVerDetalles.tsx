import { useEffect, useState } from "react";
import { Loading } from "../../../../../components/loads/Loading";
import { post } from "../../../../../resources/fetch";
import { formatoConSlashJson } from "../../../../../resources/func/fechas";
import { moneda } from "../../../../../resources/func/moneda";
import { VENTAS_REPORTES } from "../../../../../resources/routes";
import { ModIngresosEgresos } from "./ModIngresosEgresos"
import { ModIngresosVentas } from "./ModIngresosVentas"
import { ModMovimientosCaja } from "./ModMovimientosCaja"

export const InfoTabbsVerDetalles = ({ tabbs, fecha, idLocal }:any) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<any>({});

    const ingresosEgresosDia:Array<any> = data ? data.ingresosEgresosDia : [];
    const ingresosVentasDia:Array<any> = data ? data.ingresosVentasDia : [];
    const movimientosCajaDia:Array<any> = data ? data.movimientosCaja : [];

    const sumatorias:any = data.sumatorias ? data.sumatorias : {};


    useEffect(() => {
        getData();
    }, [idLocal])

    
    const getData = async () => { 
        setLoading(true);
        const dataPost:any = {
            fecha: formatoConSlashJson(fecha),
            idLocal: idLocal
        }
        try {
            const resto:any = await post(dataPost, VENTAS_REPORTES + "/ganancias_reporte_dia");
            setData(resto);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }

    
    return (
        loading
        ? <Loading />
        : <>
            <div className={(
                sumatorias.ingresosEgresosGenerales === 0
                ? "grid-3 gap mb-30"
                : "grid-4 gap mb-30"
            )}>
                <div></div>
                {
                    sumatorias.ingresosEgresosGenerales !== 0
                    && (
                        <div className="box-total-ganancias gap10 middle">
                            <h3 className="secundary">I/E generales: </h3>
                            <h3 className={(
                                sumatorias.ingresosEgresosGenerales >= 0
                                ? "strong success m-0"
                                : "strong danger m-0"
                            )}>S/. { moneda(sumatorias.ingresosEgresosGenerales) }</h3>
                        </div>
                    )
                }
                <div className="box-total-ganancias gap10 middle">
                    <h3 className="secundary">Total ganado: </h3>
                    <h2 className={(
                        sumatorias.sumaGananciasDia >= 0
                        ? "strong success m-0"
                        : "strong danger m-0"
                    )}>S/. { moneda(sumatorias.sumaGananciasDia) }</h2>
                </div>
            </div>
            {
                tabbs === 1 
                && <ModIngresosVentas 
                    ingresosVentasDia={ingresosVentasDia} 
                    sumaCostosVentas={sumatorias.sumaCostosVentas}
                    sumaIngresosVentas={sumatorias.sumaIngresosVentas}
                    sumaGananciasVentas={sumatorias.sumaGananciasVentas}
                />
            }
            {
                tabbs === 2
                && <ModIngresosEgresos 
                    ingresosEgresosDia={ingresosEgresosDia} 
                    sumaIngresosEgresos={sumatorias.sumaIngresosEgresos}
                />
            }
            {
                tabbs === 3 
                && <ModMovimientosCaja 
                    movimientosCajaDia={movimientosCajaDia} 
                    sumaMovimientosCaja={sumatorias.sumaMovimientosCaja}
                />
            }
        </>
    )
}
