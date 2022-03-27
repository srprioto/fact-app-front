interface InputDisable {
    label?:string;
    name?:string;
    value:any;
    moneda?:boolean;
    color?:string;
    font_size?:number; // no se recomienda
}

export const InputDisable = ({ label, name, value, moneda, color, font_size }:InputDisable) => {

    const font:any = {'fontSize': `${font_size}px`};

    return (
        <div className="wrap-form ">
            <label htmlFor={name}>{ label }</label><br />
            <div className="relative">
                
                <input 
                    className={"form-disabled " + (color ? color : "")}
                    style={ font && font }
                    disabled={true}
                    type="text" 
                    name={name} 
                    id={name} 
                    value={value}
                    autoComplete="off"
                />
                
                {
                    moneda
                    && <span className="moneda">S/.</span>
                }
            </div>
        </div>

    )
}
