import { Field, ErrorMessage } from 'formik';
import { BiQuestionMark } from 'react-icons/bi';

interface inputMk{
    label:string;
    type:string;
    name:string;
    error:any;
    moneda?:boolean;
    placeholder?:string;
}

interface msgError {
    error:any;
}

// requiere formik
export const InputMk = ({ label, type, name, error, moneda, placeholder }:inputMk) => {

    return (
        <div className="wrap-form">

            <label htmlFor={name}>{ label }</label>

            <div className="relative">
            
                <div className="box-form">
                    <Field 
                        type={type}
                        id={name}
                        name={name} 
                        placeholder={placeholder}
                        autoComplete="off"
                    />
                    <ErrorMessage
                        name={name}
                        component={ () => <MsgError error={error} /> }
                    />
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