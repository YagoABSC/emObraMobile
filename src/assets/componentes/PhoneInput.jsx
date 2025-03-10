import React from 'react';
import './InputControl.scss'; // Certifique-se de importar o estilo de InputControl

const PhoneInput = ({ value, onChange, label, required, inputClass, labelClass, style }) => {

    // Função para formatar o telefone enquanto o usuário digita
    const formatPhone = (value) => {
        const cleanValue = value.replace(/\D/g, ""); // Remove tudo que não for número

        // Adiciona a máscara de telefone (ex: (99) 99999-9999)
        if (cleanValue.length <= 2) {
            return `(${cleanValue}`;
        } else if (cleanValue.length <= 6) {
            return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2)}`;
        } else {
            return `(${cleanValue.slice(0, 2)}) ${cleanValue.slice(2, 7)}-${cleanValue.slice(7, 11)}`;
        }
    };

    const handlePhoneChange = (e) => {
        const formattedValue = formatPhone(e.target.value);
        onChange(formattedValue);  // Atualiza o valor no estado do componente pai
    };

    return (
        <div className="input-control">
            <input
                type="text"
                value={value}
                onChange={handlePhoneChange}
                placeholder=" "
                required={required}
                className={`form-input ${inputClass}`} // Usando as classes de InputControl
                style={style}
            />
            <label htmlFor="telefone" className={`form-label ${labelClass}`}>
                {label}
            </label>
        </div>
    );
};

export default PhoneInput;
