import React, { useState } from "react";
import { redefinirSenha, solicitarCodigo } from "../../service/api";
import { Link, useNavigate } from 'react-router-dom';
import Containerform from '../../assets/componentes/Containerform';
import InputControl from "../../assets/componentes/InputControl";

const RedefinirSenha = () => {

    const [formPart, setFormPart] = useState('pt1');
    const [identificador, setIdentificador] = useState('');
    const [codigo, setCodigo] = useState('');
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate('');

    // Solicitar código
    const handleEnviarCodigo = async (e) => {
        e.preventDefault();
        try {
            if (!identificador) {
                alert("Preencha o campo.");
                return;
            }

            const response = await solicitarCodigo(identificador);
            window.alert(response.message);
            setErro('');
            setFormPart('pt2');
        } catch (err) {
            setErro(err.response?.data?.message || err.message);
        }
    };

    // Redefinir senha
    const handleRedefinirSenha = async (e) => {
        e.preventDefault();

        if (!codigo || !novaSenha || !confirmarSenha) {
            alert("Preencha todos os campos.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        try {
            const response = await redefinirSenha(codigo, novaSenha);
            window.alert(response.message);
            setErro('');
            navigate("/login");
        } catch (error) {
            setErro(error.response?.data?.message || error.message);
        }
    };

    return (
        <>
            <div className="container-responsivo">

                <div className="login-image">
                    <img src="/imgs-fixas/login-tablet.jpg" alt="Login para tablets e desktops" />
                </div>

                <Containerform>
                    <h2>Redefinir sua senha</h2>
                    {formPart === 'pt1' && (
                        <form style={{ width: '100%' }} onSubmit={handleEnviarCodigo}>
                            <InputControl
                                label="CPF ou Email:"
                                id="identificador"
                                name="identificador"
                                value={identificador}
                                onChange={(e) => setIdentificador(e.target.value)}
                                required={true}
                                placeholder="Informe seu email ou CPF"
                            />
                            <button type="submit" className="botao-entrar">Enviar</button>
                            {erro && <p style={{ color: 'red' }}>{erro}</p>}
                        </form>
                    )}

                    {formPart === 'pt2' && (
                        <form style={{ width: '100%' }} onSubmit={handleRedefinirSenha}>
                            <InputControl
                                label="Código:"
                                id="codigo"
                                name="codigo"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                required={true}
                                placeholder="Código de recuperação"
                            />
                            <InputControl
                                label="Nova senha:"
                                id="novaSenha"
                                name="novaSenha"
                                value={novaSenha}
                                onChange={(e) => setNovaSenha(e.target.value)}
                                required={true}
                                placeholder="Digite a nova senha"
                                type="password"
                            />
                            <InputControl
                                label="Confirmar nova senha:"
                                id="confirmarSenha"
                                name="confirmarSenha"
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                required={true}
                                placeholder="Confirmar nova senha"
                                type="password"
                            />
                            <button type="submit" className="botao-entrar">Salvar nova senha</button>
                            {erro && <p style={{ color: 'red' }}>{erro}</p>}
                        </form>
                    )}
                    <div>
                        <Link to="/login" className="outras-acoes-login">Entrar na conta</Link>
                        <Link to="/cadastro" className="outras-acoes-login">Cadastre-se</Link>
                    </div>
                </Containerform>
            </div>
        </>
    );
};

export default RedefinirSenha;
