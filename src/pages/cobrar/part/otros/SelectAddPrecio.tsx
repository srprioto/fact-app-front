import { BiCheck, BiX } from "react-icons/bi"
import { Input } from "../../../../components/forms/Input"
import { Select } from "../../../../components/forms/Select";
import { ToolTip } from "../../../../components/tooltip/ToolTip";
import { formasDePago } from "../../../../resources/dtos/FormasPago";

interface selectAddPrecio {
    pushPrecioToPrecios:Function;
    nuevoPrecio:any;
    switchAdd:boolean;
    setSwitchAdd:Function;
    handlerOnChange:Function;
    tipoPagosRepetidos:Array<string>;
    // setNuevoPrecio:Function;
    // listaPrecios:any;
    // setListaPrecios:Function;
}

export const SelectAddPrecio = ({ 
    pushPrecioToPrecios, 
    nuevoPrecio, 
    switchAdd, 
    setSwitchAdd,
    handlerOnChange,
    tipoPagosRepetidos
    // setNuevoPrecio, 
    // listaPrecios,
    // setListaPrecios,
}:selectAddPrecio) => {

    return (
        <div className="box-dividir-precios mb-10">
            <div></div>
            <div className="grid-2 gap ">
                <Select
                    // label="Forma de pago"
                    name="forma_pago"
                    onChange={handlerOnChange}
                    value={nuevoPrecio.forma_pago}
                    textDefault="Selec. form pago"
                    defaultValue
                    tooltip={{
                        anchor: "btn-selec-form-pago",
                        descripcion: "Selecciona una forma de pago"
                    }}
                >
                    {
                        formasDePago.map((e:any, index:number) => {
                            if (!(tipoPagosRepetidos.includes(e.value))) {
                                return (
                                    <option key={index} value={ e.value }>{ e.nombre }</option>
                                )   
                            }
                            return (null)
                        })
                    }
                </Select>

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
                <BiX 
                    className="pointer danger" 
                    onClick={() => setSwitchAdd(!switchAdd)} 
                />
                {
                    (nuevoPrecio.precio_parcial > 0 && !!nuevoPrecio.forma_pago)
                    ? <BiCheck 
                        className="pointer success" 
                        onClick={() => pushPrecioToPrecios()} 
                    /> : <BiCheck 
                        id="btn-ok-tipo-pago-disable"
                        className="icon-disable2" 
                    />
                }

            </div>
            <ToolTip
                anchor="btn-ok-tipo-pago-disable"
                descripcion="Requiere una forma de pago y un precio"
            /> 
        </div>
    )
}

/* 
<option value="efectivo">Efectivo</option>
<option value="tarjeta">Tarjeta</option>
<option value="pago_electronico">Pago electronico</option>
<option value="deposito">Deposito</option>
*/