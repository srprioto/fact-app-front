import { Field, ErrorMessage } from 'formik';
import { BiQuestionMark } from 'react-icons/bi';
import { ToolTip } from '../tooltip/ToolTip';

interface toolTip {
    anchor:string;
    descripcion:string;
}

interface inputMk{
    label?:string;
    value?:any;
    type:string;
    name:string;
    error:any;
    moneda?:boolean;
    color?:string;
    colorLabel?:string;
    placeholder?:string;
    noError?:boolean;
    tooltip?:toolTip;
}

interface msgError {
    error:any;
}

// requiere formik
export const InputMk = ({ 
    label, 
    value, 
    type, 
    name, 
    error, 
    moneda, 
    color, 
    colorLabel, 
    placeholder, 
    noError,
    tooltip
}:inputMk) => {

    return (
        <div className="wrap-form" id={tooltip && tooltip.anchor}>
            {/* { label && (<><label htmlFor={name}>{ label }</label><br /></>) } */}
            { label && (<><label className={colorLabel} htmlFor={name}>{ label }</label><br /></>) }
            <div className="relative">
                <div className="box-form">
                    {
                        value
                        ? (
                        <Field 
                            className={color}
                            type={type}
                            value={value}
                            id={name}
                            name={name} 
                            placeholder={placeholder}
                            autoComplete="off"
                        /> ) : (
                            <Field 
                                className={color}
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

            {
                !!tooltip
                && <ToolTip
                    anchor={tooltip.anchor}
                    descripcion={tooltip.descripcion}
                /> 
            }

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