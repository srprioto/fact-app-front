export const ParrafoForm = ({ label, value }:any) => {
    return (
        <div className="wrap-form">
            <label htmlFor="">{ label }</label><br />
            <p>{ value === NaN ? "" : value }</p>
        </div>
    ) 
}


