interface radioButton {
    label?:string;
    name:string;
    values:Array<any>;
    checkValue?:any;
    moneda?:boolean;
    grid?:string;
    onChange:any;
}

export const RadioButton = ({ label, name, values, moneda, checkValue, grid, onChange }:radioButton) => {

    // console.log(values[0].value);

    return (
        <div className="radio-button">

            <div className={"inputGroup"}>

                {
                    label && <p className="label-radiobutton center">{ label }</p>
                }
                <div className={grid}>
                    {
                        values.map((r:any, index:number) => { 

                            return(
                                <span key={index}>
                                    <input 
                                        id={name + index}
                                        name={name}
                                        value={index}
                                        type="radio"
                                        onChange={onChange}
                                        checked={Number(index) === Number(checkValue)}
                                    />
                                    <label className="strong" htmlFor={name + index}>
                                        { moneda && "S/. " }
                                        { r.label }
                                    </label>
                                </span>
                            )
                        })
                    }
                </div>

            </div>

        </div>
    )
}


/* <span>
    <input id="radio1" name="radio" type="radio"/>
    <label htmlFor="radio1">Yes</label>
</span>

<span>
    <input id="radio2" name="radio" type="radio"/>
    <label htmlFor="radio2">No</label>
</span>

<span>
    <input id="radio3" name="radio" type="radio"/>
    <label htmlFor="radio3">TALVEZ</label>
</span> */


// const name:string = "radio";
    
// const radiobutton:any = [
//     {
//         label: "Si",
//         value: "si",
//     },
//     {
//         label: "No",
//         value: "no",
//     },
//     {
//         label: "Talvez",
//         value: "talvez",
//     }
// ]



// name="precios"
// values={
//     [
//         {
//             label: "Si",
//             value: "si"
//         },
//         {
//             label: "No",
//             value: "no"
//         },
//         {
//             label: "Talvez",
//             value: "talvez"
//         }
//     ]
// }