import { BiChevronDown, BiChevronUp } from "react-icons/bi"

export const BtnShow = ({ label, state, setState }:any) => {

    return (
        <button className="btn-show red-text" onClick={() => { setState(!state) }}>
            <p className="red-text">{ label }</p>
            {
                !state
                ? <BiChevronDown />
                : <BiChevronUp />
            }           
        </button>
    )
}
