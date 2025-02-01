import React from "react";
import { Link } from 'react-router-dom';
import './Login.scss';
// import Bannerlogo from '../../assets/componentes/Bannerlogo';

function Login() {
    return (
        <>
            <div className="main-login-cad">
                
            <Bannerlogo />
                <div className="login-container">
                    <div className="form-login">
                        <h1>Entrar</h1>

                        {/* <div id="message" className="alert alert-info" style="display: none;"></div> */}

                        <form action="" id="loginForm">
                            <div className="input-control-login">
                                <label for="identifier" className="text">CPF ou Email</label>
                                <input type="text" id="identifier" name="identifier" placeholder="Digite seu email ou CPF"
                                    required className="input" />
                            </div>

                            <div className="input-control-login">
                                <label for="senha" className="text">Senha</label>
                                <input type="password" id="senha" name="senha" placeholder="Digite sua senha" required
                                    class="input" />
                            </div>

                            <div className="manter-conectado">
                                <div>
                                    <input type="checkbox" id="conectado" name="conectado" />
                                    <label for="conectado">Manter-se conectado</label>
                                </div>
                            </div>

                            <button type="submit" className="botao-entrar">Entrar</button>
                        </form>

                        <div>
                            <Link to="/cadastro" className="outras-acoes-login">Cadastre-se</Link>
                            <Link to="/esqueceu-senha" className="outras-acoes-login">Esqueceu sua senha?</Link>
                        </div>

                    </div>

                </div>

            </div>
        </>


    )
}

export default Login;