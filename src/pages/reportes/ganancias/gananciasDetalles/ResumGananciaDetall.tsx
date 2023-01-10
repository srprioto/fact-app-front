import { ToolTip } from "../../../../components/tooltip/ToolTip";
import { moneda } from "../../../../resources/func/moneda"

interface resumGananciaDetall {
    sumaMontos:any;
}

export const ResumGananciaDetall = ({ sumaMontos }:resumGananciaDetall) => {

    const ieGenerales:number = Number(sumaMontos.ingresosEgresosGenerales)
    const sumaGanancias:number = Number(sumaMontos.sumaGanancias)
    const gananciasVentas:number = Number(sumaMontos.gananciasVentas)

    return (
        <div className={(
            ieGenerales === 0
            ? "grid-2 mb-25"
            : "grid-3 mb-25"
        )}>

            <div 
                id="txt-ganan-tot"
                className="box-total-ganancias gap10 middle"
            >
                <h3 className="secundary">Ganancias totales: </h3>
                <h2 className={(
                    sumaGanancias >= 0
                    ? "strong success m-0"
                    : "strong danger m-0"
                )}>S/.{ moneda(sumaGanancias) }</h2>
                <ToolTip
                    anchor="txt-ganan-tot"
                    descripcion="Suma todas las ganancias por ventas, movimientos de caja e ingresos y egresos"
                /> 
            </div>
            
            <div id="txt-ganan-vent" className="box-total-ganancias gap10 middle">
                <h3 className="secundary">Ganancias ventas: </h3>
                <h2 className={"strong info m-0"}>S/.{ moneda(Number(gananciasVentas)) }</h2>
                <ToolTip
                    anchor="txt-ganan-vent"
                    descripcion="Suma todas las ganancias por ventas"
                /> 
            </div>

            {
                ieGenerales !== 0
                && (
                    <div id="txt-ie-general" className="box-total-ganancias gap10 middle">
                        <h3 className="secundary">I/E generales: </h3>
                        <h3 className={(
                            ieGenerales >= 0
                            ? "strong success m-0"
                            : "strong danger m-0"
                        )}>S/.{ moneda(ieGenerales) }</h3>
                        <ToolTip
                            anchor="txt-ie-general"
                            descripcion="Ingresos y egresos generales que no están ligados a ningún local"
                        /> 
                    </div>
                )
            }
        </div>
    )
}
