import { useState } from "react";
// import { useNavigate } from "react-router-dom";

import { TitleBox } from "../../../components/TitleBox";
import { FormIngresoProductos } from "./FormIngresoProductos";
import { post } from "../../../resources/fetch";
import { MOVIMIENTOS } from "../../../resources/routes";
import { BoxVerIngresos } from "../../registros/Ingresos/part/BoxVerIngresos";
import { Loading } from "../../../components/loads/Loading";

export const IngresoProductos = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [idIngreso, setIdIngreso] = useState<number>(0);

    const handlerCreate = async (movimiento:any, detalles:any) => { 
        movimiento.movimiento_detalles = detalles;
        setLoading(true);
        try {
            const response = await post(movimiento, MOVIMIENTOS + "/ingreso");
            setIdIngreso(response.idMovimiento);
            setLoading(false);
        } catch (error) {
            setLoading(true);
            console.log(error);
        }
    }


    const handlerVerIngresos = () => { 
        if (idIngreso === 0) {
            return true
        } else  {
            return false
        }
    }


    const handlerRegresar = () => { 
        setIdIngreso(0);
    }


    return (
        <div className="ingreso-productos">

            {
                handlerVerIngresos()
                ? <TitleBox titulo="Ingreso de productos"/>
                : <TitleBox titulo="Ingreso de productos" accion={handlerRegresar}/>
            }

            {
                loading
                ? (
                    <Loading />
                ) : (
                    handlerVerIngresos()
                    ? (
                        <FormIngresoProductos handlerCreate={handlerCreate} loading={loading} />
                    ) : (              
                        <BoxVerIngresos idIngreso={idIngreso} />
                    )
                )
            }

        </div>
    )
};
