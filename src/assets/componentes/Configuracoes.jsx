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

    const excluir = () => {
        navigate("/excluir-conta");
    }

    return (
        <div className="container-configuracoes">
             {/* <img src="/imgs-fixas/tijolos-separados.png" alt="Separador" style={{width: "100%"}} /> */}
            <div className="config-categorias">
                <span onClick={editar}>Editar perfil</span>
            </div>
            <div className="config-categorias">
                <span onClick={editarSenha}>Editar senha</span>
            </div>
            <div className="config-categorias">
                <span >Termos e Condições</span>
            </div>
            <div className="config-categorias">
                <span onClick={excluir} style={{color: "red"}}>Excluir conta</span>
            </div>
             {/* <img src="/imgs-fixas/tijolos-separados.png" alt="Separador" style={{width: "100%"}} /> */}
        </div>
    )
}

export default Configuracoes;