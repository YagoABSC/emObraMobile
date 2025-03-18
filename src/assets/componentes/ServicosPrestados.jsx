import React, { useState, useEffect } from "react";

// Modal
import ModalConfirmacao from "./ModalConfirmacao"

// Requisições
import { servicosPrestados, finalizarServico } from "../../service/api";

// Icones
import { TiLocation } from "react-icons/ti";
import { IoLogoWhatsapp, IoMdSearch } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { CgSandClock } from "react-icons/cg";
import { MdLockOutline } from "react-icons/md";


const ServicosPrestados = ({ setCategoria }) => {
    const [servPrestados, setServPrestados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [servicoSelecionado, setServicoSelecionado] = useState(null);
    const pedreiro_id = localStorage.getItem("pedreiro_id");

    useEffect(() => {
        const carregarDados = async () => {
            setLoading(true);
            console.log(pedreiro_id)
            try {
                const servicosPrestadosResp = await servicosPrestados(pedreiro_id);
                const servicosPrestadosData = servicosPrestadosResp?.servicos || [];

                setServPrestados(servicosPrestadosData);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        };

        if (pedreiro_id) {
            carregarDados();
        }
    }, [pedreiro_id]);

    const handleBuscarObra = () => {
        setCategoria('buscarObra');
    };

    const handleFinalizarServico = (servico) => {
        setServicoSelecionado(servico);
        setIsModalOpen(true);
    };

    const finalizarServicoConfirmado = async () => {
        if (servicoSelecionado) {
            try {
                await finalizarServico(servicoSelecionado.id); // Chama a função de finalizar serviço
                setServPrestados((prev) =>
                    prev.map((servico) =>
                        servico.id === servicoSelecionado.id
                            ? { ...servico, status: "finalizado" }
                            : servico
                    )
                );
                setIsModalOpen(false); // Fecha o modal após a confirmação
            } catch (error) {
                console.error("Erro ao finalizar serviço!", error);
            }
        }
    };

    if (loading) return <div>
        <p style={{ textAlign: "center", marginBottom: 10, color: "#020411", fontSize: 16, fontWeight: 600 }}>Organizando seus serviços</p>
        <div className="spinner"></div>
    </div>;

    const servicosEmAndamento = servPrestados.filter(
        servico => servico.status === "aceito" || servico.status === "aguardando confirmacao" || servico.status === "em andamento"
    );

    return (
        <div>
            {/* <hr style={{ margin: 10 }} /> */}

            <h3 className="titulo-categorias">Serviços em andamento</h3>
            {servicosEmAndamento.length > 0 ? (
                <div>
                    {servicosEmAndamento.map(servico => (
                        <div key={servico.id} className="servico-ativo">

                            <div className="cabecalho-servico">
                                <div className="icon-servico">
                                    <img
                                        src={servico.img_servico ? `/imgs-fixas/${servico.img_servico}` : "default.jpg"}
                                        alt={servico.nome_servico || "Imagem não disponível"}
                                    />
                                </div>
                                <div className="tipo-servico">
                                    <h4>{servico.nome_servico}</h4>
                                </div>

                                <span className="status-servico">{servico.status}</span>
                            </div>

                            <div className="info-servico">
                                <p className="descricao-servico">{servico.descricao}</p>

                            </div>

                            <div className="local-servico">
                                <TiLocation style={{ fontSize: 25, color: "#FF3512" }} />
                                <p>{servico.endereco} - {servico.bairro}</p>
                            </div>

                            <hr style={{ margin: "20px auto", border: "solid 1px orange", width: "90%" }} />

                            <div className="prazo-servico">
                                <p><span>Valor</span> {servico.valor}</p>
                                <p ><span>Prazo</span> {servico.prazo}</p>
                            </div>

                            <div className="linha-tempo-servico">

                                {[
                                    { label: "Aceito", key: "aceito" },
                                    { label: "Finalizado", key: "finalizado" },
                                    { label: "Confirmado", key: "confirmado" }
                                ].map((step, index) => {
                                    let icon = <MdLockOutline />; // Ícone padrão (cadeado)
                                    let color = "#020411"; // Cor padrão

                                    if (servico.status === "em andamento") {
                                        if (index === 0) icon = <CgSandClock />; // Relógio no primeiro estágio
                                    } else if (servico.status === "aceito") {
                                        if (index === 0) {
                                            icon = <FaCheck />;
                                            color = "#FF8812";
                                        } else if (index === 1) {
                                            icon = <CgSandClock />;
                                        }
                                    } else if (servico.status === "aguardando confirmacao") {
                                        if (index < 2) {
                                            icon = <FaCheck />;
                                            color = "#FF8812";
                                        } else if (index === 2) {
                                            icon = <CgSandClock />;
                                        }
                                    } else if (servico.status === "finalizado") {
                                        icon = <FaCheck />;
                                        color = "#FF8812";
                                    }

                                    return (
                                        <React.Fragment key={step.key}>
                                            <div className="checkpoint">
                                                <div className="circulos" style={{ backgroundColor: color }}>{icon}</div>
                                                <span>{step.label}</span>
                                            </div>
                                            {index < 2 && <div className="linha" style={{ backgroundColor: color }}></div>}
                                        </React.Fragment>
                                    );
                                })}

                            </div>

                            <div className="botoes-servico">
                                <button
                                    className="botao-entrar contato-servico"
                                    disabled={servico.status === "em andamento"}
                                    style={{ backgroundColor: (servico.status === "em andamento" ? "gray" : ""), color: (servico.status === "em andamento" ? "#FFFFFF" : "") }}
                                    onClick={() => {
                                        const numeroWhatsApp = `+55${servico.telefone.replace(/\D/g, "")}`; // Remove caracteres não numéricos
                                        const mensagem = encodeURIComponent(`Olá, ${servico.nome}! Gostaria de falar sobre o serviço: ${servico.nome_servico} - ${servico.descricao}`);
                                        const linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensagem}`;
                                        window.open(linkWhatsApp, "_blank"); // Abre em uma nova aba
                                    }}
                                >
                                    <span>Falar com <br />Contratante</span><IoLogoWhatsapp style={{ fontSize: 25 }} />
                                </button>

                                <button
                                    onClick={() => handleFinalizarServico(servico)}
                                    disabled={servico.status !== "aceito"}
                                    className="finalizar-servico botao-entrar"
                                    style={{ backgroundColor: (servico.status !== "aceito" ? "gray" : "") }}
                                >
                                    {servico.status === "aguardando confirmacao" ? "Aguardando confirmação" : "Finalizar Serviço"}
                                </button>

                            </div>

                        </div>
                    ))}
                </div>
            ) : (
                <div className="container-ilustracoes">

                    <div className="ilustracoes">
                        {/* <h3>Você não possui nenhum serviço em andamento</h3> */}
                        <img src="/imgs-fixas/nada_encontrado.png" alt="Nada encontrado" className="ilustracao" />
                    </div>

                    <div className="info-ilustracoes" >
                        {/* <h3>Nenhum resultado!</h3> */}
                        <p>Visite a aba de <strong>"BUSCAR"</strong> para encontrar novos serviços e aceitá-los</p>
                        <button type="button" className="botao-entrar" onClick={handleBuscarObra}>Buscar </button>
                    </div>
                </div>
            )}

            {/* Modal de confirmação */}
            <ModalConfirmacao
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={finalizarServicoConfirmado}
            />
        </div>
    );

};

export default ServicosPrestados;
