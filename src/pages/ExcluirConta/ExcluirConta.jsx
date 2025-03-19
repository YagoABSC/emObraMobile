import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Hooks
import useAuth from '../../assets/hooks/UseAuth';

// Requisições
import { excluirConta } from "../../service/api";

// Componentes
import InputControl from "../../assets/componentes/InputControl";

// CSS
import './Excluir.scss';

// Icones
import { IoIosArrowBack } from "react-icons/io";

const ExcluirConta = () => {

    useAuth();

    const navigate = useNavigate();
    const pedreiro_id = localStorage.getItem('pedreiro_id');
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [confirmacao, setConfirmacao] = useState(false);

    const handleExcluir = async (e) => {
        e.preventDefault();
        
        try {
            if (!senha) {
                setErro("Por favor, insira sua senha para continuar.");
                return;
            }

            await excluirConta(pedreiro_id, senha);
            
            setConfirmacao(true);

            setTimeout(() => {
                localStorage.clear();
                navigate("/"); // Redireciona para a página inicial após 3s
            }, 8000);
        } catch (error) {
            setErro(error.response?.data?.mensagem || "Erro ao excluir a conta. Tente novamente mais tarde.");
        }
    };

    const voltar = () =>{
            navigate("/perfil");  // Caso não haja histórico, redireciona para a página inicial
    }

    return (
        <div className="container-excluir">

            {!confirmacao ? (
                <>
                    <div className="confirmar-excluir">
                        <div style={{display: "flex", width: "100%", margin: "10px 0 20px 0", justifyContent: "left", padding: "0 10px"}}>
                            <button onClick={voltar} style={{background: "none", border: "none",}}><IoIosArrowBack style={{fontSize: 25, color: "#FFFFFF"}}/></button>
                            </div>
                        <div>
                            <img src="/imgs-fixas/excluir-conta-icon.png" alt="Icone de excluir conta" />
                            <h1>Excluir Conta</h1>
                        </div>
                            <p>Que triste te ver por aqui! Confira abaixo se é isso mesmo que deseja fazer e os passos que deve seguir</p>

                    </div>


                    <div className="info-excluir">
                        <h2>Tem certeza que deseja <strong style={{color: "red"}}>EXCLUIR</strong> sua conta? </h2>
                        <ul>
                            <h4>O que será excluído:</h4>
                            <li>Seus dados pessoais na plataforma </li>
                            <li>Seu histórico de serviços</li>
                            <li>Seu acesso a serviços ativos ou em espera</li>
                        </ul>
                    </div>

                    <div className="senha-excluir">
                        <p>Se deseja continuar, insira sua senha no campo abaixo e clique em <strong>"Excluir minha conta"</strong></p>
                        <img src="/imgs-fixas/excluir-conta.png" alt="até mais" />

                        <form onSubmit={handleExcluir}>
                        <span style={{color: "red", fontSize: ".9rem"}}>Atenção! Esta ação é irreversível!</span>
                            <InputControl
                                type="password"
                                label="Digite sua senha"
                                name="senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            {erro && <p style={{ color: "red" }}>{erro}</p>}
                            <div className="botoes-excluir">
                                <button onClick={() => navigate("/perfil")} className="botao-entrar cancelar-btn">Cancelar</button>
                                <button type="submit" className="botao-entrar" style={{backgroundColor: "#020411"}}>Excluir minha conta</button>
                            </div>
                        </form>
                        
                    </div>

                </>
            ) : (
                <div>
                    <p>Sua conta foi excluída com sucesso! Esperamos te ver de volta um dia, nos vemos em uma próxima obra. Redirecionando...</p>
                    <div className="spinner"></div>
                </div>
            )}
        </div>
    );
}

export default ExcluirConta;