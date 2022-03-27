import { BiDotsVertical } from "react-icons/bi";

export const DropDown = ({ width = 190, children }:any) => {

    return (
        <div className="wrap-dropdown">
            <BiDotsVertical className="pointer" />
            <div className="dropdown" style={{width: `${width}px`}}>
                { children }
            </div>
        </div>
    )
};

