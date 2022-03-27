import { useState } from "react";
import { BiErrorAlt } from "react-icons/bi";
import { put } from "../../resources/fetch";
import { TRANSACCIONES_CONFIRMAR } from "../../resources/routes";
import { Checkbox } from "../forms/Checkbox";
import { Input } from "../forms/Input";
import { LoadSwitchBtn } from "../LoadSwitchBtn";
import { LoadSwitchBtn2 } from "../LoadSwitchBtn2";

export const TransferenciaDetalles = ({ data, getTransacciones, setTransf, actualizarDatos }:any) => {

    const transferenciaObj = {
        // id: data.id,
        observaciones: "",
        estado_general: "enviado",
        usuarioRecibe: 1, // actualizar
        transaccionDetalles: []
    }

    const [checked, setChecked] = useState<any>([]);
    const [transferencia, setTransferencia] = useState<any>(transferenciaObj);
    const [loadPost, setLoadPost] = useState<boolean>(false); // cambia al enviar datos para guardar


    const handlerChangeTransferencia = (e:any) => {
        setTransferencia({
            ...transferencia,
            [e.target.name]: e.target.value
        })
    }

    
    const handlerChangeTransfDetalles = (e:any) => { 

        let updatedList = [ ...checked ];
        if (e.target.checked) {
            updatedList = [ ...checked, e.target.value];
        } else {
            updatedList.splice(checked.indexOf(e.target.value), 1);
        }

        setChecked(updatedList);

    }
    
    
    const validarEnvio = (transferencia:any, transfDetalles:any, estado_general:string) => { 
        
        transferencia.transaccionDetalles = transfDetalles;
        transferencia.estado_general = estado_general;

        //validacion aqui con if
        handlerPost(transferencia)

    }

    const handlerPost = async (transferencia:any) => { 
        
        setLoadPost(true);
        try {
            await put(data.id, transferencia, TRANSACCIONES_CONFIRMAR);       
            setLoadPost(false);
            getTransacciones();
            // await actualizarDatos();
            setTransf({})
        } catch (error) {
            setLoadPost(true);
            console.log(error);
        } 
        

    }

    return (
        <div className="transferencia-detalles grid-1 gap">

            <h4 className="desc-form w100">Detalles del envio</h4>

            <div className="grid-1 w100 transf-detalles-head">
                <span>
                    <h4>Desde: </h4>
                    <p className="mayus">{ data.localOrigen.nombre }</p>
                </span>
                <span>
                    <h4>Por: </h4>
                    <p className="mayus">{ data.usuarioEnvia.nombre }</p>
                </span>
                <span>
                    <h4>Nota de envio: </h4>
                    <p>{ data.descripcion }</p>
                </span>
                <span>
                    <h4>Fecha de envio: </h4>
                    <p>{ data.created_at }</p>
                </span>
            </div>

            <div className="w100 transf-detalles-body">
               
               <table className="table2">

                    <thead>
                        <tr>
                            <th></th>
                            {/* <th>id</th> */}
                            <th>Cantidad</th>
                            <th>Nombre prod.</th>
                            <th>Codigo</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            data.transaccionDetalles.map((el:any) => {
                                return(
                                    <tr key={el.id}>
                                        <td>
                                            <Checkbox
                                                name={`estado_detalle`}
                                                value={el.id}
                                                onChange={handlerChangeTransfDetalles}
                                            />
                                        </td>
                                        {/* <td className="info">{ el.id }</td> */}
                                        <td className="info">{ el.cantidad }</td>
                                        <td>{ el.productos.nombre }</td>
                                        <td>{ el.productos.codigo }</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>

                </table>

            </div>

            <div className="transf-detalles-footer w100">

                <Input
                    label="Observaciones"
                    type="text"
                    name="observaciones"
                    value={transferencia.observaciones}
                    onChange={handlerChangeTransferencia}
                />

                <div className="grid-2 gap mb-25 mt-25">
                    
                    <LoadSwitchBtn
                        label="Confirmar transaccion"
                        handler={() => validarEnvio(transferencia, checked, "listo")}
                        loading={loadPost}
                    />

                    {
                        transferencia.observaciones !== ""
                        ? (
                            <LoadSwitchBtn2
                                className="btn btn-danger"
                                handler={() => validarEnvio(transferencia, checked, "observado")}
                                loading={loadPost}
                            >
                                <BiErrorAlt />
                                Observar
                            </LoadSwitchBtn2>
                        ) : (
                            <button className="btn btn-disable">
                                <BiErrorAlt />
                                Observar
                            </button>        
                        )
                    }

                </div>
            </div>
        </div>
    )
}
