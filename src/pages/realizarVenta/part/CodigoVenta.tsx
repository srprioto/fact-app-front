import { useEffect, useState } from "react";
import { Checkbox2 } from "../../../components/forms/Checkbox2";
import { Input } from "../../../components/forms/Input";
import { InputDisable } from "../../../components/forms/InputDisable";
import { generateRandomString } from "../../../resources/func/generarString";

export const CodigoVenta = ({ venta, setVenta, handlerChangeVenta }:any) => {

    const [codigoVenta, setCodigoVenta] = useState<boolean>(false);

    useEffect(() => {
        setCodigoVenta(true);
    }, [])

    useEffect(() => {
        if (codigoVenta) {
            setVenta({ 
                ...venta,
                codigo_venta: generateRandomString()
            })
        } else {
            setVenta({ 
                ...venta,
                codigo_venta: ""
            })    
        }
    }, [codigoVenta])

    return (
        <div className="bb bb-neutro">
            <h3>Codigo de venta</h3>
            <div className="item-tabbs grid-41 mb-15">
                {
                    codigoVenta
                    ? (
                        <InputDisable 
                            label="Codigo"
                            name="codigo_venta"
                            value={venta.codigo_venta}
                        />
                    ) : (
                        <Input 
                            label="Nombre de cliente *"
                            type="text"
                            name="codigo_venta"
                            value={venta.codigo_venta}
                            onChange={handlerChangeVenta}
                            placeholder="Añade el nombre del cliente"
                        />
                    )
                }

                <div className="middle">
                    <Checkbox2
                        name="codigoVenta"
                        checked={codigoVenta}
                        handlerCheck={ () => setCodigoVenta(!codigoVenta) }
                    />
                </div>
            </div>
        </div>
    )
}
