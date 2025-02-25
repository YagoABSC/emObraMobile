import React, { useState, useEffect } from "react";
import Servicos from "../../assets/componentes/Servicos";
import BuscardorServico from "../../assets/componentes/BuscadorServico.jsx";
import Avaliacoes from "../../assets/componentes/Avaliacoes.jsx";
import useAuth from '../../assets/hooks/UseAuth';
import { servicosPedreiro, listarPedreiro } from "../../service/api.js";
import { useNavigate } from "react-router-dom";
import ServicosPrestados from "../../assets/componentes/ServicosPrestados";
import './Perfil.scss';
import { IoMdSearch } from "react-icons/io";
import { MdMapsHomeWork } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import { IoMdMore } from "react-icons/io";


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
            <div className="cabeçalho-logado">
                <a href="/perfil">
                    <img src="https://i.ibb.co/KVZRVhw/logov4-preto.png" alt="logo-em-obra"
                        className="logo-header" />
                </a>
                <button onClick={logout} style={{ color: "#FE8813" }}>Sair</button>
            </div>

            {servicos.length === 0 ? (
                <Servicos pedreiro_id={pedreiro_id} />
            ) : (


                <div>

                    {/* Somente exibir as informações do pedreiro se ele já tiver serviços cadastrados */}
                    {!loadingPedreiro && pedreiro && (
                        <div className="perfil-detalhes">

                            <div className="info-pessoais">
                                <img src={`/imgs-pedreiro/${pedreiro.img}`} alt={pedreiro.nome} />
                                <div>
                                    <p>Bem-vindo,</p>
                                    <h2>{pedreiro.nome}!</h2>
                                    <span onClick={editar}>Editar perfil</span>
                                </div>
                            </div>

                            <Avaliacoes pedreiro_id={pedreiro_id} />

                        </div>
                    )}
                    <div className="categorias-perfil">

                        <div className={`categorias ${categoria === "minhaObra" ? "ativa" : ""}`}
                            onClick={() => setCategoria("minhaObra")}>
                            <div style={{ backgroundColor: categoria === "minhaObra" ? "#FE8813" : "#020411" }}>
                                <MdMapsHomeWork />
                            </div>
                            {/* <span>Minhas<br />Obras</span> */}
                        </div>

                        <div className={`categorias ${categoria === "buscarObra" ? "ativa" : ""}`}
                            onClick={() => setCategoria("buscarObra")}>
                            <div style={{ backgroundColor: categoria === "buscarObra" ? "#FE8813" : "#020411" }}>
                                <IoMdSearch />
                            </div>
                            {/* <span>Buscar<br />Obra</span> */}
                        </div>

                        <div className={`categorias ${categoria === "historico" ? "ativa" : ""}`}
                            onClick={() => setCategoria("historico")}>
                            <div style={{ backgroundColor: categoria === "historico" ? "#FE8813" : "#020411" }}>
                                <MdWorkHistory />
                            </div>
                            {/* <span>Histórico</span> */}
                        </div>

                        <div className={`categorias ${categoria === "mais" ? "ativa" : ""}`}
                            onClick={() => setCategoria("mais")}>
                            <div style={{ backgroundColor: categoria === "mais" ? "#FE8813" : "#020411" }}>
                                <IoMdMore />
                            </div>
                            {/* <span>Mais</span> */}
                        </div>
                    </div>
                    <div className="conteudo-categoria">
                        {categoria === "minhaObra" && <ServicosPrestados />}
                        {categoria === "buscarObra" && <BuscardorServico />}
                        {categoria === "historico" && <p>Histórico de serviços (em breve)</p>}
                        {categoria === "mais" && <p>Mais opções (em breve)</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Perfil;
