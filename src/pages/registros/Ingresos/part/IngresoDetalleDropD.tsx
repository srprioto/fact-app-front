import { BiCalculator } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"

export const IngresoDetalleDropD = ({ el, calcularPrecio }:any) => {
    return (
        <DropDown>
            <span onClick={ () => calcularPrecio(el) } >
                <BiCalculator />Calcular precio
            </span>
        </DropDown>
    )
}
