import { Field, ErrorMessage } from 'formik';
import { BiQuestionMark } from 'react-icons/bi';

interface InputMk{
    label:string;
    type?:string;
    name:string;
    error:any;
    // placeholder?:string;
    loading?:boolean;
    value?:any;
    defaultValue?:boolean;
    children:any;
}

// requiere formik
export const SelectMk = ({ label, name, type, error, loading, defaultValue, value = 2, children }:InputMk) => {

    return (
        <div className="wrap-form">
            
            <label htmlFor={name}>{ label }</label>
            
            <div className="box-form">
                <Field 
                    name={name}
                    type={type}
                    id={name}
                    // placeholder={placeholder}
                    // autoComplete="off" 
                    as="select"
                    initialvalues={value ? value : ""}
                >
                    {
                        defaultValue 
                        && (
                            <option defaultValue="">
                                {
                                    loading
                                    ? "Recuperando datos"
                                    : "Selecciona una opción"
                                }
                            </option>
                        )
                    }
                    
                    { children }
                    
                    {/* 
                        ejem:
                        <option value="peru">peru</option>
                        <option value="eeuu">eeuu</option>
                        <option value="mexico">mexico</option> 
                    */}
                </Field>
                <ErrorMessage
                    name={name}
                    component={ () => <MsgError error={error} /> }
                />
            </div>

        </div>
    )
};


const MsgError = ({ error }:any) => { 
    return (
        <div className="msg-error">
            <BiQuestionMark />
            <h5 className="error-message">{error}</h5>
        </div>
    )
}


/* <SelectMk
    label="Tipo de documento"
    type="text"
    name="tipo_documento"
    error={errors.tipo_documento}
>
    <option value="DNI">DNI</option>
    <option value="Pasaporte">Pasaporte</option>
</SelectMk> */