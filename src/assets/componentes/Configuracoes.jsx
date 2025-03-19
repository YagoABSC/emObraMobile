import React from "react";
import { useNavigate } from "react-router-dom";

//Icones
import { IoExitOutline } from "react-icons/io5";

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

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Redireciona sem recarregar a página
    };

    return (
        <div className="container-configuracoes">
            <div className="config-categorias" onClick={editar}>
                <span>Editar perfil</span>
            </div>
            <div className="config-categorias" onClick={editarSenha}>
                <span >Editar senha</span>
            </div>
            <div className="config-categorias" onClick={termos}>
                <span >Termos e Condições</span>
            </div>
            <div className="config-categorias" onClick={excluir}>
                <span>Excluir conta</span>
            </div>
            <div className="config-categorias" onClick={logout}>
                <span>Sair da conta </span>
            </div>
        </div>
    )
}

export default Configuracoes;