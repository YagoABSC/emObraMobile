import React, { useState, useEffect } from "react";
import Modal from "react-modal";

// Requisições
import { buscarServicos, aceitarServico } from "../../service/api.js";

// Componentes
import Loading from "./Loading.jsx";

// Icones
import { TiLocation } from "react-icons/ti";


const BuscardorServico = () => {
    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [superLoading, setSuperLoading] = useState(false)
    const [erroMensagem, setErroMensagem] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false); // Estado do modal
    const [servicoSelecionado, setServicoSelecionado] = useState(null); // Serviço atual selecionado
    const pedreiro_id = localStorage.getItem("pedreiro_id");

    useEffect(() => {
        if (!pedreiro_id) {
            console.error("ID do pedreiro não encontrado.");
            setLoading(false);
            return;
        }

        const fetchServicos = async () => {
            try {
                const response = await buscarServicos(pedreiro_id);
                setServicos(response.servicos || []);
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServicos();
    }, []);

    const handleAbrirModal = (servico) => {
        setServicoSelecionado(servico); // Armazena o serviço selecionado
        setModalIsOpen(true); // Abre o modal
    };

    const handleAceitarServico = async () => {
        if (!pedreiro_id || !servicoSelecionado) {
            console.error("ID do pedreiro ou serviço não encontrado.");
            return;
        }
    
        setModalIsOpen(false);
        setSuperLoading(true); 
     
        try {
            await aceitarServico(servicoSelecionado.id, pedreiro_id);
            window.location.reload();
        } catch (error) {
            const mensagemErro = error.response?.data?.message || "Erro ao aceitar serviço.";
            setErroMensagem(prev => ({ ...prev, [servicoSelecionado.id]: mensagemErro }));
        } finally {
            // setLoading(false);
            setSuperLoading(false); 
        }
    };
    

    if (loading) return (
        <div>
            <p style={{ textAlign: "center", marginBottom: 10, color: "#020411", fontSize: 16, fontWeight: 600 }}>Buscando serviços para você</p>
            <div className="spinner"></div>
        </div>
    );

    if (superLoading) return (
        <Loading />
    );

    return (
        <div>
            <h3 className="titulo-categorias">Serviços para você</h3>
            {servicos.length > 0 ? (
                <div>
                    {servicos.map(servico => (
                        <div key={servico.id} className="servico-pendente">

                            <div className="cabecalho-servico">
                                <div className="icon-servico">
                                    <img src={`/imgs-fixas/${servico.img_servico}`} alt={servico.nome_servico} />
                                </div>
                                <div className="tipo-servico">
                                    <h4>{servico.nome_servico}</h4>
                                    <div>
                                    <p>Prazo: {servico.prazo}</p>
                                    </div>
                                </div>
                                <span className="status-servico" style={{ flexDirection: "column", fontSize: ".6rem" }}>
                                    <span>Valor</span>{servico.valor}
                                </span>
                            </div>

                            <div className="info-servico">
                                <p className="descricao-servico"><span>Descrição</span> {servico.descricao}</p>
                            </div>

                            <div className="local-servico">
                                <TiLocation style={{ fontSize: 25, color: "#FF3512" }} />
                                <p>{servico.bairro} - {servico.cidade}</p>
                            </div>

                            <hr style={{ margin: "20px auto", border: "solid 1px #FF3512", width: "90%" }} />


                            <div className="botoes-servico">
                                <button onClick={() => handleAbrirModal(servico)} className="aceitar-servico botao-entrar">
                                    Me candidatar
                                </button>
                            </div>
                            {erroMensagem[servico.id] && (
                                <p style={{ color: "red", marginTop: "10px", fontSize: "14px", fontWeight: 500 }}>
                                    {erroMensagem[servico.id]}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>Nenhum serviço encontrado.</p>
            )}

            {/* Modal para confirmação */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Confirmação de Candidatura"
                ariaHideApp={false}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        padding: '20px',
                        width: '90%',
                        maxWidth: "600px"
                    }
                }}
            >
                <div className="modal-conteudo">
                    <h2>Confirmar candidatura</h2>
                    <p style={{ color: "#FE8813", fontWeight: 600 }}>Você pode aceitar no máximo 2 serviços ao mesmo tempo. </p>
                    <p>O serviço ficará em espera até o contratante aceitar sua candidatura.</p>
                    <p style={{ fontSize: ".9rem" }}>Se estiver de acordo, clique em <strong>"Me candidatar"</strong> para confirmar.</p>
                </div>
                <div className="botoes-excluir">
                    <button type="button" onClick={() => setModalIsOpen(false)} className="cancelar-btn cancelar botao-entrar">Cancelar</button>
                    <button type="button" onClick={handleAceitarServico} className="botao-entrar">Me candidatar</button>
                </div>
            </Modal>
        </div>
    );
}

export default BuscardorServico;
