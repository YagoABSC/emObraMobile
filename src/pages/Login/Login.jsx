import React from "react";
import { Link } from 'react-router-dom';
import './Login.scss';
import Containerform from '../../assets/componentes/Containerform';
import InputControl from '../../assets/componentes/InputControl';

function Login() {
    return (
        <>
            {/* <div className="main-login-cad"> */}

            <Containerform>
                <h1>Entrar</h1>
                {/* <div id="message" className="alert alert-info" style="display: none;"></div> */}
                <form action="" id="loginForm">

                    <InputControl>
                        <label htmlFor="identifier" className="text">CPF ou Email</label>
                        <input type="text" id="identifier" name="identifier" placeholder="Digite seu email ou CPF"
                            required className="input" />
                    </InputControl>

                    <InputControl>
                        <label htmlFor="senha" className="text">Senha</label>
                        <input type="password" id="senha" name="senha" placeholder="Digite sua senha" required
                            className="input" />
                    </InputControl>

                    <div className="manter-conectado">
                        <div>
                            <input type="checkbox" id="conectado" name="conectado" />
                            <label htmlFor="conectado">Manter-se conectado</label>
                        </div>
                    </div>

                    <button type="submit" className="botao-entrar">Entrar</button>

                </form>
                <div>
                    <Link to="/cadastro" className="outras-acoes-login">Cadastre-se</Link>
                    <Link to="/esqueceu-senha" className="outras-acoes-login">Esqueceu sua senha?</Link>
                </div>
            </Containerform>

            {/* </div> */}
        </>


    )
}

export default Login;