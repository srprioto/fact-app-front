import { Input } from "../../../../components/forms/Input"
import { InputDisable } from "../../../../components/forms/InputDisable"
import { StockGeneral } from "./StockGeneral"

interface gestionCantidades{
    calcularStock:Function;
    producto:any;
    ventaDetalle:any;
    handlerOnChange:Function;
}

export const GestionCantidades = ({ calcularStock, producto, ventaDetalle, handlerOnChange }:gestionCantidades) => {


    return (
        <div className="gestion-cantidades">
            <h3>Gestion de cantidades</h3>
            <div className="grid-3 gap">

                <StockGeneral idProducto={producto.id} />

                <InputDisable
                    label="Stock del producto en local"
                    value={calcularStock()}
                    color={(calcularStock() <= 0 ? "danger" : "")}
                />
                
                <Input
                    label="Cantidad para venta"
                    type="number"
                    name="cantidad_venta"
                    value={ventaDetalle.cantidad_venta}
                    onChange={handlerOnChange}
                    noMenos
                />
            </div>
        </div>
    )
}

