import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { cadastrarPedreiro } from "../../service/api.js";

import './Cadastro.scss';
import Containerform from '../../assets/componentes/Containerform.jsx';
import InputControl from '../../assets/componentes/InputControl';

const Cadastro = () => {

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [cep, setCep] = useState('');
    const navigate = useNavigate('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!nome || !telefone || !cpf || !email || !senha || !confirmarSenha || !cep) {
            alert("Preencha todos os campos.");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        try {
            const response = await cadastrarPedreiro(nome, telefone, cpf, email, senha, cep);
    
            if (response.message) {
                alert(response.message); // Exibe a mensagem retornada pelo backend
            } else {
                alert("Cadastro realizado com sucesso!");
            }
    
            navigate("/login"); // Redireciona o usuário
    
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
    
            // Exibe o erro real caso a API retorne algo
            if (error.response) {
                alert(error.response.data.message || "Erro ao realizar o cadastro.");
            } else {
                alert("Erro de conexão com o servidor.");
            }
        }
    }

    const [formPart, setFormPart] = useState('pt1')

    return (
        <>
            <Containerform>
                <h2>Criar conta</h2>

                <form id="registrationForm" onSubmit={handleSignUp}>


                    <div id="cadastroInicio" className="avancar-cadastro-pedreiro">
                        {formPart === 'pt1' &&

                            <div>
                                <InputControl>
                                    <label htmlFor="nome" className="text">Nome:</label>
                                    <input type="text" name="nome" required className="input" value={nome} onChange={(e) => setNome(e.target.value)}/>
                                </InputControl>
                                
                                <InputControl>
                                    <label htmlFor="cpf" className="text">CPF:</label>
                                    <input type="text" name="cpf" required className="input" value={cpf} onChange={(e) => setCpf(e.target.value)}/>
                                </InputControl>

                                <InputControl>
                                    <label htmlFor="cep" className="text">CEP:</label>
                                    <input type="text" name="cep" required className="input" value={cep} onChange={(e) => setCep(e.target.value)}/>
                                </InputControl>

                                <button className="avancar-cadastro-pedreiro botao-entrar" onClick={() => setFormPart('pt2')}> Avançar</button>
                            </div>

                        }


                        {formPart === 'pt2' &&

                            <div>
                                <InputControl>
                                    <label htmlFor="telefone" className="text">Telefone:</label>
                                    <input type="text" name="telefone" className="input" value={telefone} onChange={(e) => setTelefone(e.target.value)}/>
                                </InputControl>
                                <InputControl>
                                    <label htmlFor="email" className="text">Email:</label>
                                    <input type="text" name="email" required className="input" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                </InputControl>
                                <InputControl>
                                    <label htmlFor="senha" className="text">Senha:</label>
                                    <input type="password" name="senha" required className="input" value={senha} onChange={(e)=> setSenha(e.target.value)}/>
                                </InputControl>

                                <InputControl>
                                    <label htmlFor="confirmarSenha" className="text">Confirmar senha:</label>
                                    <input type="password" name="confirmarSenha" required className="input" value={confirmarSenha} onChange={(e)=> setConfirmarSenha(e.target.value)}/>
                                </InputControl>

                                <div className="manter-conectado cadastro-tipo-servico">
                                    <div>
                                        <input type="checkbox" id="conectado" name="conectado" />
                                        <label htmlFor="conectado">Aceitar termos e condições de uso de dados </label>
                                    </div>

                                </div>
                                <div className="container-buttons">
                                    <button type="submit" className="botao-entrar cadastro-tipo-servico" onClick={() => setFormPart('pt1')} style={{ backgroundColor: "white", color: "#FE8813", border: "2px solid #FE8813" }}>Voltar</button>

                                    <button type="submit" className="botao-entrar cadastro-tipo-servico">Cadastrar</button>
                                </div>
                            </div>


                        }
                    </div>

                </form>

                <Link to="/login" className="outras-acoes-login">Já tenho conta</Link>

            </Containerform>

        </>
    )
}

export default Cadastro;