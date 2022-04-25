interface parrafoForm {
    label:string;
    value:any;
}

export const ParrafoForm = ({ label, value }:parrafoForm) => {
    return (
        <div className="wrap-form">
            <label htmlFor="">{ label }</label><br />
            <p>{ value === NaN ? "" : value }</p>
        </div>
    ) 
}


