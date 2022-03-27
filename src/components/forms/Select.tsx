interface Select {
    label:string;
    name:string;
    onChange:any;
    defaultValue:any; // activa el valor por defecto "no"
    loading:boolean;
    children:any;
}

export const Select = ({ label, name, onChange, defaultValue, loading, children }:Select) => {
    return (
        <div className="wrap-form">
            <label htmlFor={name}>{ label }</label><br />
            <select 
                name={name}
                id={name}
                onChange={onChange}
                autoComplete="off"
                defaultValue="0"
            >
                {
                    defaultValue 
                    && (
                        <option value="0" disabled>
                            {
                                loading
                                ? "Recuperando datos"
                                : "Selecciona una opción"
                            }
                        </option>
                    )
                }
                { children }
            </select>
        </div>
    )
}
