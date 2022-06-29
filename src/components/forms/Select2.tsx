// establece valor por defecto manualmente

interface select {
    label?:string;
    name:string;
    onChange:any;
    value:any;
    children:any;
    defaultValue?:any;
}

export const Select2 = ({ 
    label, 
    name, 
    onChange, 
    value,
    defaultValue,
    children 
}:select) => {
    return (
        <div className="wrap-form w100">
            { label && <><label htmlFor={name}>{ label }</label><br /></> }
            {
                defaultValue
                ? (
                    <select 
                        name={name}
                        id={name}
                        onChange={onChange}
                        autoComplete="off"
                        defaultValue={defaultValue}
                    >
                        { children }
                    </select>
                ) : (
                    <select 
                        name={name}
                        id={name}
                        onChange={onChange}
                        autoComplete="off"
                        defaultValue={value}
                    >
                        { children }
                    </select>
                )
            }            
            
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