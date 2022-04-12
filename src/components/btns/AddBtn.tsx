import { BiPlusCircle } from "react-icons/bi";

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
            <div>
                {
                    label
                    ? (
                        <button onClick={() => handlerBtn()} className={"btn btn-" + className}>
                            <BiPlusCircle /> { label }
                        </button>
                    ) : (
                        <span onClick={() => handlerBtn()} className={"big-icon-add " + className}>
                            <BiPlusCircle />
                        </span>
                    )
                }
                
            </div>
        </div>
    )
}


// {
//     label
//     ? (
//         <>
            
//         </>
//     ) : (
//         <span className="big-icon-add">
//             <BiPlusCircle />
//         </span>
//     )
// }