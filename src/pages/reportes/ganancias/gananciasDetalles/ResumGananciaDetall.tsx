import { moneda } from "../../../../resources/func/moneda"

interface resumGananciaDetall {
    sumaMontos:any;
}

export const ResumGananciaDetall = ({ sumaMontos }:resumGananciaDetall) => {

    const ieGenerales:number = Number(sumaMontos.ingresosEgresosGenerales)
    const sumaGanancias:number = Number(sumaMontos.sumaGanancias)

    return (
        <div className={(
            ieGenerales === 0
            ? "grid-3 gap mb-25"
            : "grid-4 gap mb-25"
        )}>
            <div></div>
            {
                ieGenerales !== 0
                && (
                    <div className="box-total-ganancias gap10 middle">
                        <h3 className="secundary">I/E generales: </h3>
                        <h3 className={(
                            ieGenerales >= 0
                            ? "strong success m-0"
                            : "strong danger m-0"
                        )}>S/. { moneda(ieGenerales) }</h3>
                    </div>
                )
            }
            <div className="box-total-ganancias gap10 middle">
                <h3 className="secundary">Total ganado: </h3>
                <h2 className={(
                    sumaGanancias >= 0
                    ? "strong success m-0"
                    : "strong danger m-0"
                )}>S/. { moneda(sumaGanancias) }</h2>
            </div>
        </div>
    )
}
