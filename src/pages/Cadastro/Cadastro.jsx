import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

// Requisições
import { cadastrarPedreiro } from "../../service/api.js";

// CSS
import './Cadastro.scss';

// Componentes
import Containerform from '../../assets/componentes/Containerform.jsx';
import InputControl from '../../assets/componentes/InputControl';
import PhoneInput from '../../assets/componentes/PhoneInput';

// Modal
import ModalTermo from "../../assets/componentes/ModalTermo.jsx"; // Importando o modal

const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [cep, setCep] = useState('');
    const [formPart, setFormPart] = useState('pt1');
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTermsAccepted, setIsTermsAccepted] = useState(false);

    const navigate = useNavigate('');

    const handleConfirmTerms = async () => {
        setErrorMessage('');
        setSuccessMessage('');
        setIsLoading(true); // Ativar o loading

        if (!nome || !telefone || !cpf || !email || !senha || !confirmarSenha || !cep) {
            setErrorMessage("Preencha todos os campos.");
            setIsLoading(false);
            return;
        }

        if (senha !== confirmarSenha) {
            setErrorMessage("As senhas não coincidem.");
            setIsLoading(false);
            return;
        }

        if (!isTermsAccepted) {
            setErrorMessage("Você precisa aceitar os termos para continuar.");
            setIsLoading(false);
            return;
        }

        setShowModal(false); // Fecha o modal

        try {
            const response = await cadastrarPedreiro(nome, telefone, cpf, email, senha, cep);
        
            console.log("Resposta do servidor:", response); // Debug para ver o que vem do backend
        
            if (response.error) { // Se houver um erro vindo do servidor
                setErrorMessage(response.error); 
                setSuccessMessage(""); // Limpa mensagem de sucesso
            } else {
                setErrorMessage(""); // Limpa mensagens de erro
                setSuccessMessage(""); // Garante que não exiba no estado
                
                alert("Cadastro realizado com sucesso!"); // Mostra o alert antes do redirecionamento
                navigate("/login"); // Redireciona após fechar o alert
            }
        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            setErrorMessage(error.response?.data?.message || "Erro de conexão com o servidor.");
            setSuccessMessage(""); // Garante que a mensagem de sucesso não apareça
        } finally {
            setIsLoading(false);
        }
        
    };




    return (
        <>
            <div className="container-responsivo">
                <div className="login-image">
                    <img src="/imgs-fixas/login-tablet.jpg" alt="Login para tablets e desktops" />
                </div>

                <Containerform>
                    <h2>Criar conta</h2>
                    <form id="registrationForm">
                        <div id="cadastroInicio" className="avancar-cadastro-pedreiro">
                            {formPart === 'pt1' &&
                                <div>
                                    <InputControl label="Nome e sobrenome" value={nome} onChange={(e) => setNome(e.target.value)} required />
                                    <InputControl label="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} required mask={{ delimiters: [".", ".", "-"], blocks: [3, 3, 3, 2], numericOnly: true }} />
                                    <InputControl label="CEP" value={cep} onChange={(e) => setCep(e.target.value)} required mask={{ delimiters: ["-"], blocks: [5, 3], numericOnly: true }} />

                                    <button className="avancar-cadastro-pedreiro botao-entrar" onClick={() => setFormPart('pt2')}> Avançar</button>
                                </div>
                            }

                            {formPart === 'pt2' &&
                                <div>
                                    <PhoneInput label="Celular" value={telefone} onChange={setTelefone} required />
                                    <InputControl label="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <InputControl label="Senha" type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
                                    <InputControl label="Confirmar senha" type="password" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required />

                                    <p onClick={() => setShowModal(true)} className="aceitar-termos" style={{
                                        backgroundColor: isTermsAccepted ? '#FE8813' : '020411dc'
                                    }}>{isTermsAccepted ? 'Termos aceitos' : 'Clique aqui para aceitar os termos'}</p>

                                    {/* Exibindo a mensagem de erro, se houver */}
                                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                                    <div className="container-buttons">
                                        <button type="button" className="botao-entrar cadastro-tipo-servico" onClick={() => setFormPart('pt1')} style={{ backgroundColor: "white", color: "#FE8813", border: "2px solid #FE8813" }}>{`<`} Voltar</button>

                                        {/* Botão de cadastro com base no estado de aceitação dos termos */}
                                        <button
                                            type="button"
                                            className="botao-entrar cadastro-tipo-servico"
                                            onClick={handleConfirmTerms}
                                            disabled={!isTermsAccepted}  // O botão só será habilitado se os termos forem aceitos
                                            style={{
                                                backgroundColor: isTermsAccepted ? '#FE8813' : '#D3D3D3',
                                                color: isTermsAccepted ? '#fff' : '#000'
                                            }}
                                        >
                                            Cadastrar
                                        </button>
                                    </div>
                                </div>
                            }
                        </div>
                    </form>
                    <Link to="/login" className="outras-acoes-login">Já tenho conta</Link>
                </Containerform>
            </div>

            <ModalTermo
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={() => {
                    setIsTermsAccepted(true);  // Quando os termos forem aceitos, habilita o botão de cadastro
                    setShowModal(false);
                }}
            />

            {isLoading && (
                <div className="loading-overlay" style={{position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: "9999"}}>
                    <div className="spinner"></div>
                </div>
            )}


        </>
    );
}

export default Cadastro;
