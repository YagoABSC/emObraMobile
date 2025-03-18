import React from "react";
import { useNavigate } from "react-router-dom";

const Configuracoes = () => {

    const navigate = useNavigate();

    const editar = () => {
        navigate("/editar-perfil");
    }

    const editarSenha = () => {
        navigate("/editar-senha");
    }

    const termos = () => {
        navigate("/termos")
    }

    const excluir = () => {
        navigate("/excluir-conta");
    }

    return (
        <div className="container-configuracoes">
            <div className="config-categorias">
                <span onClick={editar}>Editar perfil</span>
            </div>
            <div className="config-categorias">
                <span onClick={editarSenha}>Editar senha</span>
            </div>
            <div className="config-categorias">
                <span onClick={termos}>Termos e Condições</span>
            </div>
            <div className="config-categorias">
                <span onClick={excluir} style={{ color: "red" }}>Excluir conta</span>
            </div>
        </div>
    )
}

export default Configuracoes;