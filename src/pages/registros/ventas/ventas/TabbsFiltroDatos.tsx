import { BiBarChartAlt, BiCartAlt, BiCheck, BiTask, BiX } from "react-icons/bi"

export const TabbsFiltroDatos = ({ getData, toggle }:any) => {
    return (
        <div className="grid-3 gap mb-25">

            <div></div>
            <div className="grid-6">

                <button 
                    onClick={() => getData("", "_", 1)}
                    className={`btn2 btn2-primary ${toggle === 1 && "btn2-sub-primary"}`}>
                    <BiBarChartAlt />
                    Todos
                </button>
                <button 
                    onClick={() => getData("", "listo", 4)}
                    className={`btn2 btn2-success ${toggle === 4 && "btn2-sub-success"}`}>
                    <BiCheck />
                    Listos
                </button>
                <button 
                    onClick={() => getData("", "enviado", 2)}
                    className={`btn2 btn2-warning ${toggle === 2 && "btn2-sub-warning"}`}>
                    <BiCartAlt />
                    Enviados
                </button>
                <button 
                    onClick={() => getData("", "rechazado", 3)}
                    className={`btn2 btn2-danger ${toggle === 3 && "btn2-sub-danger"}`}>
                    <BiX />
                    Rechazado
                </button>
                <button 
                    onClick={() => getData("", "anulado", 6)}
                    className={`btn2 btn2-secundary opacity ${toggle === 6 && "btn2-sub-secundary opacity"}`}>
                    <BiX />
                    Anulado
                </button>
                <button
                    onClick={() => getData("", "credito", 5)}
                    className={`btn2 btn2-warning ${toggle === 5 && "btn2-sub-warning"}`}>
                    <BiTask />
                    Credito/Adelanto
                </button>
            </div>
            {/* <div className="right">
                <button
                    className="btn-icon btn2-success"
                    onClick={() => getData("", "", "", {
                        inicio: "_",
                        fin: "_"
                    })}
                >
                    <BiRefresh />
                </button>
            </div> */}

        </div>
    )
}
