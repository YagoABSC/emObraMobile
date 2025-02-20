import React, { useState, useEffect } from "react";
import Servicos from "../../assets/componentes/Servicos";
import BuscardorServico from "../../assets/componentes/BuscadorServico.jsx";
import Avaliacoes from "../../assets/componentes/Avaliacoes.jsx";
import { servicosPedreiro, listarPedreiro } from "../../service/api.js";
import { useNavigate } from "react-router-dom";
import ServicosPrestados from "../../assets/componentes/ServicosPrestados";
import './Perfil.scss';
import { FaSearch } from "react-icons/fa";
import { LuBrickWall } from "react-icons/lu";
import { MdOutlineWorkHistory } from "react-icons/md";
import { IoMdMore } from "react-icons/io";


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
                <button onClick={logout} style={{color: "#FE8813"}}>Sair</button>
            </div>

            {servicos.length === 0 ? (
                <Servicos pedreiro_id={pedreiro_id} />
            ) : (


                <div>
                    
                    {/* Somente exibir as informações do pedreiro se ele já tiver serviços cadastrados */}
                    {!loadingPedreiro && pedreiro && (
                        <div className="perfil-detalhes">

                            <div className="info-pessoais">
                                <img src={`/imgs-fixas/${pedreiro.img}`} alt={pedreiro.nome} />
                                <div>
                                    <p>Bem-vindo,</p>
                                    <h2>{pedreiro.nome}!</h2>
                                    <span>Editar perfil</span>
                                </div>
                            </div>

                            <Avaliacoes pedreiro_id={pedreiro_id} />

                        </div>
                    )}
                    <div className="categorias-perfil">
                        <div className="categorias">
                            <div>
                                <FaSearch />
                            </div>
                            <span>Buscar<br />Obra</span>
                        </div>

                        <div className="categorias">
                            <div>
                                <LuBrickWall />
                            </div>
                            <span>Minhas<br />Obras</span>
                        </div>

                        <div className="categorias">
                            <div><MdOutlineWorkHistory /></div>
                            <span>Histórico</span>
                        </div>

                        <div className="categorias">
                            <div><IoMdMore /></div>
                            <span>Mais</span>
                        </div>
                    </div>
                    <BuscardorServico />
                    <ServicosPrestados />
                </div>
            )}
        </div>
    );
};

export default Perfil;
