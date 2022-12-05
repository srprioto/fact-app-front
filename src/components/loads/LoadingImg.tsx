import { BiLoaderAlt } from "react-icons/bi"

interface loadingImg {
    height?:number;
    size?:string;
}

export const LoadingImg = ({ height = 132, size }:loadingImg) => {
    return (
        <div className="">
            <div className="box box-par rotarIcon middle" style={{ height: `${height}px` }}>
                <BiLoaderAlt size={size} />
            </div>
        </div>
    )
}

export const LoadingImg2 = ({ size }:loadingImg) => {
    return (
        <div className="rotarIcon">
            <BiLoaderAlt size={size} />
        </div>
    )
}

export const LoadingImg3 = ({ size }:any) => {
    return (
        <span className="rotarIcon">
            <BiLoaderAlt size={size} />
        </span>
    )
}
