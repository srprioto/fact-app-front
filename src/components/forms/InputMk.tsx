import { Field, ErrorMessage } from 'formik';
import { BiQuestionMark } from 'react-icons/bi';

interface inputMk{
    label?:string;
    value?:any;
    type:string;
    name:string;
    error:any;
    moneda?:boolean;
    placeholder?:string;
    noError?:boolean;
}

interface msgError {
    error:any;
}

// requiere formik
export const InputMk = ({ label, value, type, name, error, moneda, placeholder, noError }:inputMk) => {

    return (
        <div className="wrap-form">

            {
                label && (<><label htmlFor={name}>{ label }</label><br /></>)
            }

            <div className="relative">
            
                <div className="box-form">
                    {
                        value
                        ? (
                        <Field 
                            type={type}
                            value={value}
                            id={name}
                            name={name} 
                            placeholder={placeholder}
                            autoComplete="off"
                        /> ) : (
                            <Field 
                                type={type}
                                id={name}
                                name={name} 
                                placeholder={placeholder}
                                autoComplete="off"
                            />
                        )
                    }
                    
                    {
                        !noError
                        && <ErrorMessage
                            name={name}
                            component={ () => <MsgError error={error} /> }
                        />
                    }
                </div>
                {
                    moneda
                    && <span className="moneda">S/.</span>
                }
            </div>

        </div>
    )
};


const MsgError = ({ error }:msgError) => { 
    return (
        <div className="msg-error">
            <BiQuestionMark />
            <h5 className="error-message">{error}</h5>
        </div>
    )
}


/* 
<InputMk 
    label="Nombre"
    type="text"
    name="nombre"
    error={errors.nombre}
/> 
*/