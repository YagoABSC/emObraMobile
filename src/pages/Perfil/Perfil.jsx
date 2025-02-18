import React, { useState, useEffect } from "react";
import Servicos from "../../assets/componentes/Servicos";
import BuscardorServico from "../../assets/componentes/BuscadorServico.jsx";
import { servicosPedreiro } from "../../service/api.js";
import { useNavigate } from "react-router-dom";
import ServicosPrestados from "../../assets/componentes/ServicosPrestados";
import './Perfil.scss';

const Perfil = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Redireciona sem recarregar a página
    };

    const pedreiro_id = localStorage.getItem('pedreiro_id');
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!pedreiro_id) {
            console.error("ID do pedreiro não encontrado.");
            return;
        }

        const fetchServicos = async () => {
            try {
                const response = await servicosPedreiro(pedreiro_id);
                setServicos(response.tiposServicos || []); // Corrigindo chave errada
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServicos();
    }, [pedreiro_id]);

    if (loading) return <p>Carregando...</p>;

    return (
        <div>
            <div className="cabeçalho-logado">
                <a href="/perfil"><img src="https://i.ibb.co/KVZRVhw/logov4-preto.png" alt="logo-em-obra"
                    className="logo-header" />
                </a>
                <button onClick={logout}>Sair</button>
            </div>
            {servicos.length === 0 ? <Servicos pedreiro_id={pedreiro_id} /> :
                <div>
                    <div className="Perfil">
                        <h1>Bem vindo</h1>
                    </div>
                    <BuscardorServico />
                    <ServicosPrestados />
                </div>}
        </div>
    );
};

export default Perfil;
