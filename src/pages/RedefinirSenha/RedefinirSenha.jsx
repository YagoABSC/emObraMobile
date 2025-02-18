import React, { useEffect, useState } from "react";
import { redefinirSenha, solicitarCodigo, validarCodigo } from "../../service/api";
import { Link, useNavigate } from 'react-router-dom';
import Containerform from '../../assets/componentes/Containerform';
import InputControl from "../../assets/componentes/InputControl";

const RedefinirSenha = () => {

    const [formPart, setFormPart] = useState('pt1')
    const [identificador, setIdentificador] = useState('')
    const [codigo, setCodigo] = useState('')
    const [novaSenha, setNovaSenha] = useState('')
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
            setErro('')
            setFormPart('pt2');
        } catch (err) {
            setErro(err.response?.data?.message || err.message)
        }
    }

    // Validar código
    const handleValidarCodigo = async (e) => {
        e.preventDefault();
        try {
            const response = await validarCodigo(codigo);
            window.alert(response.message);

            // Salva o código no localStorage para usar na etapa 3
            localStorage.setItem('codigo_verificacao', codigo);

            setErro('');
            setFormPart('pt3');
        } catch (error) {
            setErro(error.response?.data?.message || error.message)
        }
    }

    // Redefinir senha
    const handleRedefinirSenha = async (e) => {
        e.preventDefault();

        const codigoSalvo = localStorage.getItem('codigo_verificacao');
        console.log(codigoSalvo)

        if (!codigoSalvo) {
            alert("Código de verificação não encontrado. Tente novamente.");
            return;
        }

        if (!novaSenha || !confirmarSenha) {
            alert("Preencha todos os campos.");
            return;
        }

        if (novaSenha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        try {
            const response = await redefinirSenha(codigoSalvo, novaSenha);
            window.alert(response.message);
            setErro('');

            localStorage.removeItem('codigo_verificacao');

            navigate("/login");
        } catch (error) {
            setErro(error.response?.data?.message || error.message)
        }
    }

    useEffect(() => {
        if (formPart === "pt3") {
            const codigoSalvo = localStorage.getItem("codigo_verificacao");
            if (!codigoSalvo) {
                alert("Código de verificação não encontrado. Tente novamente.");
                setFormPart("pt1"); // Retorna para a primeira etapa
            }
        }
    }, [formPart]);

    return (
        <>
            <Containerform>
                <h2>Redefinir sua senha</h2>

                {formPart === 'pt1' && (

                    <form style={{ width: '100%' }} onSubmit={handleEnviarCodigo}>
                        <InputControl>
                            <label htmlFor="identificador" className="text">CPF ou Email:</label>
                            <input type="text" name="identificador" required className="input" placeholder="Informe seu email ou CPF" value={identificador} onChange={(e) => setIdentificador(e.target.value)} />
                        </InputControl>

                        <button type="submit" className="botao-entrar">Enviar</button>
                        {erro && <p style={{ color: 'red' }}>{erro}</p>}
                    </form>

                )}

                {formPart === 'pt2' && (

                    <form style={{ width: '100%' }} onSubmit={handleValidarCodigo}>
                        <InputControl>
                            <label htmlFor="codigo" className="text">Código:</label>
                            <input type="text" name="codigo" required className="input" placeholder="Informe o código" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                        </InputControl>

                        <button type="submit" className="botao-entrar">Validar código</button>
                        {erro && <p style={{ color: 'red' }}>{erro}</p>}
                    </form>

                )}

                {formPart === 'pt3' && (
                    <form style={{ width: '100%' }} onSubmit={handleRedefinirSenha}>
                        <InputControl>
                            <label htmlFor="senha" className="text">Nova senha:</label>
                            <input type="password" name="senha" required className="input" placeholder="Digite a nova senha" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} />
                        </InputControl>
                        <InputControl>
                            <label htmlFor="confirmarSenha" className="text">Confirmar nova senha:</label>
                            <input type="password" name="confirmarSenha" required className="input" placeholder="Confirmar nova senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                        </InputControl>

                        <button className="botao-entrar">Salvar nova senha</button>
                        {erro && <p style={{ color: 'red' }}>{erro}</p>}
                    </form>
                    
                )}

                <div >
                    <Link to="/login" className="outras-acoes-login">Entrar na conta</Link>
                    <Link to="/cadastro" className="outras-acoes-login">Cadastre-se</Link>

                </div>

            </Containerform>
        </>
    )
}

export default RedefinirSenha;