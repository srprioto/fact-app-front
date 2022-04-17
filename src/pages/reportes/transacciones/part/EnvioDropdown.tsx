import { BiCheck, BiSubdirectoryLeft } from "react-icons/bi"
import { DropDown } from "../../../../components/DropDown"

export const EnvioDropdown = ({ el, confirmarEnvio }:any) => {
    return (
        <DropDown>
            <span onClick={ () => { confirmarEnvio(el, "regresar") } }>
                <BiSubdirectoryLeft />Regresar al origen
            </span>
            <span onClick={ () => { confirmarEnvio(el, "listo") } }>
                <BiCheck />Confirmar envio
            </span>
        </DropDown>
    )
}
