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

            <div className="box-total-ganancias gap10 middle">
                <h3 className="secundary">Ganancias totales: </h3>
                <h2 className={(
                    sumaGanancias >= 0
                    ? "strong success m-0"
                    : "strong danger m-0"
                )}>S/.{ moneda(sumaGanancias) }</h2>
            </div>
            
            <div className="box-total-ganancias gap10 middle">
                <h3 className="secundary">Ganancias ventas: </h3>
                <h2 className={"strong info m-0"}>S/.{ moneda(Number(gananciasVentas)) }</h2>
            </div>

            {
                ieGenerales !== 0
                && (
                    <div className="box-total-ganancias gap10 middle">
                        <h3 className="secundary">I/E generales: </h3>
                        <h3 className={(
                            ieGenerales >= 0
                            ? "strong success m-0"
                            : "strong danger m-0"
                        )}>S/.{ moneda(ieGenerales) }</h3>
                    </div>
                )
            }
        </div>
    )
}
