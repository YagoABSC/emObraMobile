import React from "react";
import './InputControl.scss'
import Cleave from "cleave.js/react";

const InputControl = ({
    label,
    type = "text",
    id,
    name,
    value = "", // Garante que nunca será undefined
    onChange,
    required = false,
    placeholder = "",
    inputClass = "",
    labelClass = "",
    style = {},
    mask = null, // Adicionando máscara opcional
}) => {

    return (

        <div className="input-control">
            {mask ? (
                <Cleave
                    id={id}
                    name={name}
                    className={`form-input ${inputClass}`}
                    value={value}
                    options={mask}
                    onChange={onChange}
                    required={required}
                    placeholder=" "
                    style={style}
                />
            ) : (
                <input
                    type={type}
                    id={id}
                    name={name}
                    className={`form-input ${inputClass}`}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder=" "
                    style={style}
                />
            )}
            <label htmlFor={id} className={`form-label ${labelClass}`}>
                {label}
            </label>
        </div>
    );
};


export default InputControl