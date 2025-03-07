import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componentes
import Servicos from "../../assets/componentes/Servicos";
import BuscardorServico from "../../assets/componentes/BuscadorServico.jsx";
import Avaliacoes from "../../assets/componentes/Avaliacoes.jsx";
import TotalServicos from "../../assets/componentes/TotalServicos.jsx"
import ServicosPrestados from "../../assets/componentes/ServicosPrestados";
import Historico from "../../assets/componentes/Historico.jsx";
import Configuracoes from "../../assets/componentes/Configuracoes.jsx";

// Hooks
import useAuth from '../../assets/hooks/UseAuth';

// Requisições
import { servicosPedreiro, listarPedreiro } from "../../service/api.js";

//Icones
import { IoMdSearch } from "react-icons/io";
import { MdMapsHomeWork } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import { IoMdSettings } from "react-icons/io";

//Estilo
import './Perfil.scss';


const Perfil = () => {

    useAuth();

    const navigate = useNavigate();
    const pedreiro_id = localStorage.getItem('pedreiro_id');
    const [pedreiro, setPedreiro] = useState(null)
    const [servicos, setServicos] = useState([]);
    const [loadingServicos, setLoadingServicos] = useState(true);
    const [loadingPedreiro, setLoadingPedreiro] = useState(true);
    const [categoria, setCategoria] = useState('minhaObra')

    // Fazer Logout
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login"); // Redireciona sem recarregar a página
    };

    // Editar Perfil
    const editar = () => {
        navigate("/editar-perfil");
    }

    // Mostrar serviços caso não tenha cadastrado
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

    // Informações do Pedreiro
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

            {servicos.length === 0 ? (
                <Servicos pedreiro_id={pedreiro_id} />
            ) : (


                <div>

                    {/* Somente exibir as informações do pedreiro se ele já tiver serviços cadastrados */}
                    {!loadingPedreiro && pedreiro && (
                        <div className="perfil-detalhes">

                            <div className="info-container">

                                <div className="info-pessoais">
                                    <img
                                        src={pedreiro.img || "/img-perfil/avatar-pedreiro.png"}
                                        alt={pedreiro.nome}
                                        onClick={editar}
                                    />
                                    <div>
                                        <h2>{pedreiro.nome}</h2>
                                    </div>
                                </div>

                                <div className="info-especiais">
                                    <Avaliacoes pedreiro_id={pedreiro_id} />
                                    <TotalServicos pedreiro_id={pedreiro_id} />
                                </div>
                            </div>

                        </div>
                    )}
                    <div className="categorias-perfil">

                        <div className={`categorias ${categoria === "minhaObra" ? "ativa" : ""}`}
                            onClick={() => setCategoria("minhaObra")}>
                            <div style={{ backgroundColor: categoria === "minhaObra" ? "#FE8813" : "#020411" }}>
                                <MdMapsHomeWork />
                            </div>
                        </div>

                        <div className={`categorias ${categoria === "buscarObra" ? "ativa" : ""}`}
                            onClick={() => setCategoria("buscarObra")}>
                            <div style={{ backgroundColor: categoria === "buscarObra" ? "#FE8813" : "#020411" }}>
                                <IoMdSearch />
                            </div>
                        </div>

                        <div className={`categorias ${categoria === "historico" ? "ativa" : ""}`}
                            onClick={() => setCategoria("historico")}>
                            <div style={{ backgroundColor: categoria === "historico" ? "#FE8813" : "#020411" }}>
                                <MdWorkHistory />
                            </div>
                        </div>

                        <div className={`categorias ${categoria === "mais" ? "ativa" : ""}`}
                            onClick={() => setCategoria("mais")}>
                            <div style={{ backgroundColor: categoria === "mais" ? "#FE8813" : "#020411" }}>
                                <IoMdSettings />
                            </div>
                        </div>
                    </div>

                    <div className="conteudo-categoria">
                        {categoria === "minhaObra" && <ServicosPrestados />}
                        {categoria === "buscarObra" && <BuscardorServico />}
                        {categoria === "historico" && <Historico />}
                        {categoria === "mais" && <Configuracoes />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Perfil;
