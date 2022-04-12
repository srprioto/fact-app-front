import { BiLoaderAlt } from "react-icons/bi"

interface loadingImg {
    height?:number;
}

export const LoadingImg = ({ height = 132 }:loadingImg) => {
    return (
        <div className="mb-20">
            <div className="box box-par rotarIcon middle" style={{ height: `${height}px` }}>
                <BiLoaderAlt />
            </div>
        </div>
    )
}
