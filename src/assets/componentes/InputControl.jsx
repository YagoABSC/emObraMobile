import React from "react";
import './InputControl.scss'

const InputControl = ({
    label,
    type = "text",
    id,
    name,
    value,
    onChange,
    required = false,
    placeholder = "",
    inputClass = "",
    labelClass = "",
    style = {}
}) => {
    return (
        <div className="input-control">
            <input
                type={type}
                id={id}
                name={name}
                className={`form-input ${inputClass}`}
                value={value}
                onChange={onChange}
                required={required}
                placeholder=" " // Importante para a animação da label
                style={style}
            />
            <label htmlFor={id} className={`form-label ${labelClass}`}>
                {label}
            </label>
        </div>
    );
};

export default InputControl