import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import InputControl from "../../assets/componentes/InputControl";
import Loading from '../../assets/componentes/Loading'

// Requisições
import { atualizarSenha } from "../../service/api";

// Icones
import { IoIosArrowBack } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

const TrocarSenha = () => {

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


    const handleCancel = () => {
        navigate("/perfil")
    }

    if (loading) return <Loading />;
    return (
        <>
            <div className="trocar-senha">

                <div className="header-edicao">
                    <div className='editar-acoes'>
                        <button type="button" onClick={handleCancel} className="cancelar"><IoIosArrowBack /> <span>Voltar</span></button>
                        <button type="button" className="editar-salvar" onClick={() => formRef.current.requestSubmit()}>Salvar  <FaCheck /></button>
                    </div>
                    <h1>Trocar Senha</h1>
                    <p>O emObra preza pela segurança dos seus dados. Lembre-se de não compartilhar sua senha com ninguém!</p>
                </div>
                <div className="editar-ilustracao">
                    <span>Atenção: Evite usar seus dados pessoais como senha.</span>
                    <span> Por exemplo: data de nascimento, aniverario e seu próprio nome</span>
                    <img style={{width: "100%", }} src="/imgs-fixas/trocar-senha.png" alt="" />
                </div>

                <div style={{ backgroundColor: "white", padding: "15px", width: "90%", maxWidth: "450px", margin: "0 auto" }}>
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
                </div>
            </div>
        </>
    )
}

export default TrocarSenha;