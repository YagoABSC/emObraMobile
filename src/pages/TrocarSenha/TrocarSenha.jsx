import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Hooks
import useAuth from "../../assets/hooks/UseAuth";

// Componentes
import InputControl from "../../assets/componentes/InputControl";
import Loading from '../../assets/componentes/Loading'

// Requisições
import { atualizarSenha } from "../../service/api";

// Icones
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

const TrocarSenha = () => {

    useAuth();

    const navigate = useNavigate();
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState("");
    const pedreiro_id = localStorage.getItem("pedreiro_id");
    const formRef = useRef(null);

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

    const voltar = () => {
            navigate("/perfil");  // Caso não haja histórico, redireciona para a página inicial
    }

    const handleCancel = () => {
        navigate("/perfil")
    }

    if (loading) return <Loading />;
    return (
        <>
            <div className="trocar-senha">

                <div className="header-edicao">
                    <button onClick={voltar} style={{ background: "none", border: "none" }}><IoIosArrowBack style={{ fontSize: 25, color: "#FFFFFF" }} /></button>

                    <h1>Trocar Senha</h1>
                    <p>O emObra preza pela segurança dos seus dados. Lembre-se de não compartilhar sua senha com ninguém!</p>
                </div>
                <div className="editar-ilustracao">
                    <span>Atenção: Evite usar seus dados pessoais como senha.</span>
                    <span> Por exemplo: data de nascimento, aniverario e seu próprio nome</span>
                    <img style={{ width: "100%", }} src="/imgs-fixas/trocar-senha.png" alt="" />
                </div>

                <div style={{ backgroundColor: "white", padding: "15px", width: "90%", maxWidth: "450px", margin: "0 auto", borderRadius: "10px", boxShadow: "0 0 1px 0 rgba(2, 4, 17, 0.6), 0 3px 5px 0 rgba(2, 4, 17, 0.6)" }}>
                    <span style={{ fontSize: ".9rem", fontWeight: 500 }}>Digite uma nova senha e em seguida confirme-a.</span>
                    <form ref={formRef} onSubmit={handleSubmit}>
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
                        {/* <button type="submit" disabled={loading}>
                            {loading ? "Salvando" : "Atualizar Senha"}
                        </button>
                        <button type="button" onClick={handleCancel}>Cancelar</button> */}
                        {mensagem && <p>{mensagem}</p>}
                    </form>
                <div className='editar-acoes'>
                    <button type="button" onClick={handleCancel} className="cancelar botao-entrar cancelar-btn"><IoIosArrowBack /> <span>Voltar</span></button>
                    <button type="button" className="editar-salvar botao-entrar" onClick={() => formRef.current.requestSubmit() } style={{ backgroundColor: "#020411" }}>Salvar  <FaCheck /></button>
                </div>
                </div>
            </div>
        </>
    )
}

export default TrocarSenha;