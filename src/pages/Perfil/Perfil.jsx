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
        <div className="container-geral">
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
                            <img src={`/imgs-fixas/${pedreiro.img}`} alt={pedreiro.nome} />
                            <h2>Bem-vindo, {pedreiro.nome}!</h2>
                            <div className="info-especiais">
                                <div>
                                    <h5>Avaliação</h5>
                                    <span>4.0/5.0</span>
                                </div>
                                <div>
                                    <h5>Servicos concluídos</h5>
                                    <span>45</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="categorias-perfil">
                        <div className="categorias">Perfil</div>
                        <div className="categorias">Minhas Obras</div>
                        <div className="categorias">Histórico</div>
                        <div className="categorias">Mais</div>
                    </div>
                    <BuscardorServico />
                    <ServicosPrestados />
                </div>
            )}
        </div>
    );
};

export default Perfil;
