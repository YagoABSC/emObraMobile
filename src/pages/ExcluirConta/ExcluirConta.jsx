import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Hooks
import useAuth from '../../assets/hooks/UseAuth';

// Requisições
import { excluirConta } from "../../service/api";

const ExcluirConta = () => {

    useAuth();

    const navigate = useNavigate();
    const pedreiro_id = localStorage.getItem('pedreiro_id');
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [confirmacao, setConfirmacao] = useState(false);

    const handleExcluir = async () => {
        try {
            if (!senha) {
                setErro("Por favor, insira sua senha para continuar.");
                return;
            }
            

            await excluirConta(pedreiro_id, senha);
            localStorage.clear();   
            setConfirmacao(true);

            setTimeout(() => {
                navigate("/"); // Redireciona para a página inicial após 3s
            }, 3000);
        } catch (error) {
            setErro(error.response?.data?.mensagem || "Erro ao excluir a conta. Tente novamente mais tarde.");
        }
    };

    return (
        <div>
            <h2>Excluir Conta</h2>

            {!confirmacao ? (
                <>
                    <p>Tem certeza que deseja excluir sua conta? Essa ação é irreversível.</p>

                    <input
                        type="password"
                        placeholder="Digite sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    {erro && <p style={{ color: "red" }}>{erro}</p>}

                    <button onClick={handleExcluir}>Confirmar Exclusão</button>
                    <button onClick={() => navigate("/perfil")}>Cancelar</button>
                </>
            ) : (
                <p>Sua conta foi excluída com sucesso! Redirecionando...</p>
            )}
        </div>
    );
}

export default ExcluirConta;