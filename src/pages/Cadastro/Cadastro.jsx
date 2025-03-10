import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { cadastrarPedreiro } from "../../service/api.js";

// CSS
import './Cadastro.scss';

// Componentes
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
    const [formPart, setFormPart] = useState('pt1');

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

    return (
        <>
            <div className="container-responsivo">

                <div className="login-image">
                    <img src="/imgs-fixas/login-tablet.jpg" alt="Login para tablets e desktops" />
                </div>

                <Containerform>
                    <h2>Criar conta</h2>
                    <form id="registrationForm" onSubmit={handleSignUp}>
                        <div id="cadastroInicio" className="avancar-cadastro-pedreiro">
                            {formPart === 'pt1' &&
                                <div>
                                    <InputControl
                                        label="Nome e sobrenome"
                                        id="nome"
                                        name="nome"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required={true}
                                    />

                                    <InputControl
                                        label="CPF"
                                        id="cpf"
                                        name="cpf"
                                        value={cpf || ""} // Garante que não seja undefined
                                        onChange={(e) => setCpf(e.target.value)}
                                        required={true}
                                        mask={{
                                            delimiters: [".", ".", "-"],
                                            blocks: [3, 3, 3, 2],
                                            numericOnly: true,
                                        }}
                                    />


                                    <InputControl
                                        label="CEP"
                                        id="cep"
                                        name="cep"
                                        value={cep || ""}
                                        onChange={(e) => setCep(e.target.value)}
                                        required={true}
                                        mask={{
                                            delimiters: ["-"],
                                            blocks: [5, 3],
                                            numericOnly: true,
                                        }}
                                    />

                                    <button className="avancar-cadastro-pedreiro botao-entrar" onClick={() => setFormPart('pt2')}> Avançar</button>
                                </div>
                            }

                            {formPart === 'pt2' &&
                                <div>

                                    <InputControl
                                        label="Telefone"
                                        id="telefone"
                                        name="telefone"
                                        value={telefone}
                                        onChange={(e) => setTelefone(e.target.value)} // Atualiza o estado com o valor
                                        required={true}
                                        isPhone={true} // Indica que este é um campo de telefone
                                    />

                                    <InputControl
                                        label="Email"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required={true}
                                    />

                                    <InputControl
                                        label="Senha"
                                        id="senha"
                                        name="senha"
                                        value={senha}
                                        onChange={(e) => setSenha(e.target.value)}
                                        required={true}
                                        type="password"
                                    />

                                    <InputControl
                                        label="Confirmar senha"
                                        id="confirmarSenha"
                                        name="confirmarSenha"
                                        value={confirmarSenha}
                                        onChange={(e) => setConfirmarSenha(e.target.value)}
                                        required={true}
                                        type="password"
                                    />

                                    <div className="manter-conectado cadastro-tipo-servico">
                                        <div>
                                            <input type="checkbox" id="conectado" name="conectado" />
                                            <label htmlFor="conectado">Aceitar termos e condições de uso de dados </label>
                                        </div>
                                    </div>

                                    <div className="container-buttons">
                                        <button type="button" className="botao-entrar cadastro-tipo-servico" onClick={() => setFormPart('pt1')} style={{ backgroundColor: "white", color: "#FE8813", border: "2px solid #FE8813" }}>Voltar</button>

                                        <button type="submit" className="botao-entrar cadastro-tipo-servico">Cadastrar</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </form>
                    <Link to="/login" className="outras-acoes-login">Já tenho conta</Link>
                </Containerform>
            </div>
        </>
    )
}

export default Cadastro;
