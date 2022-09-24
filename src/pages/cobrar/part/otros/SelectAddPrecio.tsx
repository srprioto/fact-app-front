import { BiCheck, BiX } from "react-icons/bi"
import { Input } from "../../../../components/forms/Input"
import { Select2 } from "../../../../components/forms/Select2"

export const SelectAddPrecio = ({ pushPrecioToPrecios, handlerOnChange, nuevoPrecio, switchAdd, setSwitchAdd }:any) => {

    return (
        <div className="box-dividir-precios mb-10">
            <div></div>
            <div className="grid-2 gap ">
                <Select2
                    // label="Forma de pago"
                    name="forma_pago"
                    onChange={handlerOnChange}
                    value={nuevoPrecio.forma_pago}
                    defaultValue="efectivo"
                >
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="pago_electronico">Pago electronico</option>
                    <option value="deposito">Deposito</option>                           
                </Select2>

                <Input
                    // label="Precio de compra del paquete"
                    type="number"
                    name="precio_parcial"
                    value={nuevoPrecio.precio_parcial}
                    onChange={handlerOnChange}
                    moneda
                    noMenos
                />
            </div>

            <div className="delete-forma-pago">
                <BiCheck 
                    className="pointer success" 
                    onClick={() => pushPrecioToPrecios()} 
                />
                <BiX 
                    className="pointer danger" 
                    onClick={() => setSwitchAdd(!switchAdd)} 
                />
            </div>

        </div>
    )
}


