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
    const navigate = useNavigate('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { token, tipo } = await autenticarUsuario(identificador, senha);

            localStorage.setItem('token', token);
            localStorage.setItem('tipoUsuario', tipo);

            if (tipo === 'contratante') {
                navigate('/contratante');
            } else if (tipo === 'pedreiro') {
                navigate('/perfil');
            }
            setMessage(response.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Erro ao fazer login')
        }
    };

    return (
        <>

            <Containerform>
                <h1>Entrar</h1>
                {/* <div id="message" className="alert alert-info" style="display: none;"></div> */}
                <form onSubmit={handleLogin} id="loginForm">

                    <InputControl>
                        <label htmlFor="identifier" className="text">CPF ou Email</label>
                        <input type="text" id="identifier" name="identifier" placeholder="Digite seu email ou CPF"
                            required className="input" value={identificador} onChange={(e) => setIdentificador(e.target.value)} />
                    </InputControl>

                    <InputControl>
                        <label htmlFor="senha" className="text">Senha</label>
                        <input type="password" id="senha" name="senha" placeholder="Digite sua senha" required
                            className="input" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    </InputControl>

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
                    <Link to="/esqueceu-senha" className="outras-acoes-login">Esqueceu sua senha?</Link>
                </div>
            </Containerform>

        </>


    )
}

export default Login;