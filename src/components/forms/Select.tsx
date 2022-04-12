interface select {
    label:string;
    name:string;
    onChange:any;
    defaultValue:any; // activa el valor por defecto "no"
    loading:boolean;
    textDefault?:string;
    children:any;
}

export const Select = ({ 
    label, 
    name, 
    onChange, 
    defaultValue, 
    loading, 
    textDefault = "Selecciona una opción", 
    children 
}:select) => {
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
                                : textDefault
                            }
                        </option>
                    )
                }
                { children }
            </select>
        </div>
    )
}

/* <Select
    label="Local destino *"
    name="localDestino"
    onChange={handlerChangeGenerales}
    loading={loadingLocales}
    defaultValue
>
    {
        locales.map((e:any) => {
            if (e.id !== idLocal) {
                return (
                    <option key={e.id} value={Number(e.id)}>{ e.nombre }</option>
                )    
            }
        })
    }
    
</Select> */