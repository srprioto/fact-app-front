interface parrafoForm {
    label:string;
    value:any;
    className?:string;
}

export const ParrafoForm = ({ label, value, className }:parrafoForm) => {
    return (
        <div className="wrap-form">
            <label htmlFor="">{ label }</label><br />
            <p className={className ? className : ""}>{ value === NaN ? "" : value }</p>
        </div>
    ) 
}


