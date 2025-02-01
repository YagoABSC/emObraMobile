import React from "react";
import './InputControl.scss'

const InputControl = ({children}) => {
    return(
        <>
            <div className="input-control">
                {children}
            </div>
        </>
    )
}

export default InputControl