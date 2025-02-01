import React from "react";
import './Containerform.scss'

const Containerform = ({ children }) => {
    return (
        <>
            <div className="main-container-form">
                <div className="banner-logo">
                    <h1><a href="/"><img src="https://i.ibb.co/KVZRVhw/logov4-preto.png" alt="logo-em-obra"
                        className="logo-header" /></a></h1>
                    <h3>Facilitando conexões, <br />construindo sonhos.</h3>
                </div>

                <div className="container">
                    <div className="formulario">
                        {children}
                    </div>
                </div>


            </div>
        </>
    )
}

export default Containerform;