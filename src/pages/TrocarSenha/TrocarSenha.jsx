import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import InputControl from "../../assets/componentes/InputControl";
import Loading from '../../assets/componentes/Loading'

// Requisições
import { atualizarSenha } from "../../service/api";

const TrocarSenha = () => {

    const navigate = useNavigate();
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const pedreiro_id = localStorage.getItem("pedreiro_id");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem("");
    
        if (novaSenha !== confirmarSenha) {
            setMensagem("As senhas não coincidem!");
            return;
        }
    
        setLoading(true);
    
        try {
            // Envia apenas a senha
            const response = await atualizarSenha(novaSenha);
            setMensagem(response.message || "Senha alterada com sucesso!");
            setTimeout(() => navigate("/perfil"), 3000);
        } catch (error) {
            console.error("Erro ao alterar senha:", error);
            setMensagem("Não foi possível alterar senha");
        } finally {
            setLoading(false);
        }
    };
    

    const handleCancel = () => {
        navigate("/perfil")
    }

    if (loading) return <Loading />;
    return (
        <>
            <div>
                <h3>Trocar Senha</h3>

                <form onSubmit={handleSubmit}>

                    <InputControl
                        type="password"
                        label="Nova Senha"
                        name="senha"
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                        required
                    />

                    <InputControl
                        type="password"
                        label="Confirme a Nova Senha"
                        name="confirmarSenha"
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Salvando" : "Atualizar Senha"}
                    </button>

                    <button type="button" onClick={handleCancel}>Cancelar</button>

                    {mensagem && <p>{mensagem}</p>}
                </form>
            </div>
        </>
    )
}

export default TrocarSenha;