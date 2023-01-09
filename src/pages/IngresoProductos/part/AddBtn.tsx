import { BiPlusCircle } from "react-icons/bi";
import { ToolTip } from "../../../components/tooltip/ToolTip";

interface addBtn{
    label?:string;
    handler?:Function;
    handlerModal?:Function;
    className?:string;
}

export const AddBtn = ({ label, handler, handlerModal, className = "success" }:addBtn) => {

    const handlerBtn = () => {
        if (handler) {
            handler()
        } else if (handlerModal) {
            handlerModal(true);
        }
    }

    return (
        <div className="add-btn">
            <div id="btn-add-prod">
                {
                    label
                    ? (
                        <button 
                            onClick={() => handlerBtn()} 
                            className={"btn btn-" + className}
                        >
                            <BiPlusCircle /> { label }
                        </button>
                    ) : (
                        <span 
                            onClick={() => handlerBtn()} 
                            className={"big-icon-add " + className}
                        >
                            <BiPlusCircle />
                        </span>
                    )
                }
                
            </div>
            <ToolTip
                anchor="btn-add-prod"
                descripcion="Permite añadir la información del producto a la lista de reabastecimiento"
            />
            
        </div>
    )
}

// // para inputs
// tooltip={{
//     anchor: "btn-inc-desc",
//     descripcion: "Incrementos o descuentos de<br/>la venta del producto actual",
// }}