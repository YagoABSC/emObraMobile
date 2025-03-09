import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { autenticarUsuario } from '../../service/api.js';

import './Login.scss';
import Containerform from '../../assets/componentes/Containerform';
import InputControl from "../../assets/componentes/InputControl";

const Login = () => {
    const [identificador, setIdentificador] = useState('');
    const [senha, setSenha] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await autenticarUsuario(identificador, senha);
            const { token, id, tipo } = response;

            if (tipo !== 'pedreiro') {
                setMessage("Este aplicativo é exclusivo para pedreiros!");
                return;
            }

            localStorage.setItem('token', token);
            localStorage.setItem('pedreiro_id', id);
            localStorage.setItem('tipoUsuario', tipo);

            navigate('/perfil');
        } catch (error) {
            console.error("Erro no login:", error);
            setMessage(error.response?.data?.message || 'Erro ao fazer login');
        }
    };

    return (
        <div className="container-responsivo">
            <div className="login-image">
                <img src="/imgs-fixas/login-tablet.jpg" alt="Login para tablets e desktops" />
            </div>

            <Containerform>
                <h2>Entrar</h2>
                <form onSubmit={handleLogin} id="loginForm">
                    <InputControl
                        label="CPF ou Email"
                        type="text"
                        id="identifier"
                        name="identifier"
                        placeholder="Digite seu email ou CPF"
                        required
                        value={identificador}
                        onChange={(e) => setIdentificador(e.target.value)}
                    />

                    <InputControl
                        label="Senha"
                        type="password"
                        id="senha"
                        name="senha"
                        placeholder="Digite sua senha"
                        required
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <div className="manter-conectado">
                        <div>
                            <input type="checkbox" id="conectado" name="conectado" />
                            <label htmlFor="conectado">Manter-se conectado</label>
                        </div>
                    </div>

                    <button type="submit" className="botao-entrar">Entrar</button>
                    {message && <p>{message}</p>}
                </form>

                <div>
                    <Link to="/cadastro" className="outras-acoes-login">Cadastre-se</Link>
                    <Link to="/redefinir-senha" className="outras-acoes-login">Esqueceu sua senha?</Link>
                </div>
            </Containerform>
        </div>
    );
};

export default Login;
