import React, { useState, useEffect } from "react";
import Servicos from "../../assets/componentes/Servicos";
import BuscardorServico from "../../assets/componentes/BuscadorServico.jsx";
import { servicosPedreiro, listarPedreiro } from "../../service/api.js";
import { useNavigate } from "react-router-dom";
import ServicosPrestados from "../../assets/componentes/ServicosPrestados";
import './Perfil.scss';

const Perfil = () => {

    const navigate = useNavigate();
    const pedreiro_id = localStorage.getItem('pedreiro_id');
    const [pedreiro, setPedreiro] = useState(null)
    const [servicos, setServicos] = useState([]);
    const [loadingServicos, setLoadingServicos] = useState(true);
    const [loadingPedreiro, setLoadingPedreiro] = useState(true);

    // Fazer Logout
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Redireciona sem recarregar a página
    };


    useEffect(() => {

        if (!pedreiro_id) {
            console.error("ID do pedreiro não encontrado.");
            return;
        }

        // Buscar tipos deserviços caso não tenha
        const fetchServicos = async () => {
            try {
                const response = await servicosPedreiro(pedreiro_id);
                setServicos(response.tiposServicos || []);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            } finally {
                setLoadingServicos(false);
            }
        };

        fetchServicos();
    }, [pedreiro_id]);

    useEffect(() => {
        if (!pedreiro_id) {
            return;
        }

        const fetchPedreiro = async () => {
            try {
                const response = await listarPedreiro(pedreiro_id);
                setPedreiro(response);
            } catch (error) {
                console.error("Erro ao buscar dados do pedreiro:", error);
            } finally {
                setLoadingPedreiro(false);
            }
        };

        fetchPedreiro();
    }, [pedreiro_id]);

    if (loadingServicos) return <p>Carregando...</p>;

    return (
        <div>
            <div className="cabeçalho-logado">
                <a href="/perfil">
                    <img src="https://i.ibb.co/KVZRVhw/logov4-preto.png" alt="logo-em-obra"
                        className="logo-header" />
                </a>
                <button onClick={logout}>Sair</button>
            </div>

            {servicos.length === 0 ? (
                <Servicos pedreiro_id={pedreiro_id} />
            ) : (


                <div>
                    <div className="Perfil">
                        <h1>Bem-vindo</h1>
                    </div>
                    
                    {/* Somente exibir as informações do pedreiro se ele já tiver serviços cadastrados */}
                    {!loadingPedreiro && pedreiro && (
                        <div className="perfil-detalhes">
                            <h2>Bem-vindo, {pedreiro.nome}!</h2>
                            <p><strong>Email:</strong> {pedreiro.email}</p>
                            <p><strong>CPF:</strong> {pedreiro.cpf}</p>
                            <p><strong>Telefone:</strong> {pedreiro.telefone}</p>
                            <p><strong>CEP:</strong> {pedreiro.cep}</p>
                        </div>
                    )}
                    <BuscardorServico />
                    <ServicosPrestados />
                </div>
            )}
        </div>
    );
};

export default Perfil;
