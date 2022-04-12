import { BiBarChartAlt, BiCartAlt, BiCheck, BiX } from "react-icons/bi"

export const TabbsFiltroDatos = ({ getData, toggle }:any) => {
    return (
        <div className="grid-3 gap mb-25">

            <div></div>
            <div className="grid-4 gap">

                <button 
                    onClick={() => getData("", "_", 1)}
                    className={`btn2 btn2-primary ${toggle === 1 && "btn2-sub-primary"}`}>
                    <BiBarChartAlt />
                    Todos
                </button>
                <button 
                    onClick={() => getData("", "enviado", 2)}
                    className={`btn2 btn2-warning ${toggle === 2 && "btn2-sub-warning"}`}>
                    <BiCartAlt />
                    Enviados
                </button>
                <button 
                    onClick={() => getData("", "listo", 4)}
                    className={`btn2 btn2-success ${toggle === 4 && "btn2-sub-success"}`}>
                    <BiCheck />
                    Listos
                </button>
                <button 
                    onClick={() => getData("", "rechazado", 3)}
                    className={`btn2 btn2-danger ${toggle === 3 && "btn2-sub-danger"}`}>
                    <BiX />
                    Rechazado
                </button>
                
            </div>
            <div></div>

        </div>
    )
}
