import React, { useState, useEffect } from "react";
import { servicosPrestados, finalizarServico } from "../../service/api";
import { TiLocation } from "react-icons/ti";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { CgSandClock } from "react-icons/cg";
import { MdLockOutline } from "react-icons/md";

const ServicosPrestados = () => {
    const [servPrestados, setServPrestados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [servicos, setServicos] = useState([]);
    const pedreiro_id = localStorage.getItem("pedreiro_id");

    useEffect(() => {
        const carregarDados = async () => {
            setLoading(true);
            try {
                // Busca os serviços prestados pelo pedreiro (já inclui nome e imagem)
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


    const handleFinalizarServico = async (servico_id) => {
        try {
            const response = await finalizarServico(servico_id);

            // Atualiza a lista apenas se a finalização for bem-sucedida
            setServPrestados(prev =>
                prev.map(servico =>
                    servico.id === servico_id ? { ...servico, status: "Aguardando confirmação" } : servico
                )
            );
        } catch (error) {
            console.error("Erro ao finalizar serviço!", error);
            alert(`Erro ao finalizar serviço: ${error.response?.data?.message || error.message}`);
        }
    };

    if (loading) return <div>
        <p style={{textAlign: "center", marginBottom: 10, color: "#020411", fontSize: 16, fontWeight: 600}}>Organizando seus serviços</p>
        <div className="spinner"></div>
    </div>;

    const servicosEmAndamento = servPrestados.filter(
        servico => servico.status === "aceito" || servico.status === "aguardando confirmacao"
    );

    return (
        <div>
            {/* <hr style={{ margin: 10 }} /> */}
            <h3 style={{ fontSize: "1em", color: "#020411", margin: "-25px 0", textAlign: "center" }}>Serviços em andamento</h3>
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

                                    <div className="valor-servico">

                                    </div>
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

                                    if (servico.status === "pendente") {
                                        if (index === 0) icon = <CgSandClock />;
                                    } else if (servico.status === "aceito") {
                                        if (index === 0) {
                                            icon = <FaCheck />;
                                            color = "#FF8812";
                                        } else if (index === 1) {
                                            icon = <CgSandClock />;
                                        }
                                    } else if (servico.status === "aguardando confirmação") {
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
                                            <div className="checkpoint" >
                                                <div className="circulos" style={{ backgroundColor: color }}>{icon}</div>
                                                <span>{step.label}</span>
                                            </div>
                                            {index < 2 && <div className="linha" style={{ backgroundColor: color }}></div>}
                                        </React.Fragment>
                                    );
                                })}
                            </div>

                            <div className="botoes-servico">
                                <button className="botao-entrar contato-servico"><span>Falar com <br />Contratante</span><IoLogoWhatsapp style={{ fontSize: 25 }} /></button>

                                <button
                                    onClick={() => handleFinalizarServico(servico.id)}
                                    disabled={servico.status !== "aceito"}
                                    className="finalizar-servico botao-entrar"
                                >
                                    {servico.status === "aguardando confirmacao" ? "Aguardando confirmação" : "Finalizar Serviço"}
                                </button>

                            </div>

                        </div>
                    ))}
                </div>
            ) : (
                <p>Sem serviços em andamento</p>
            )}
        </div>
    );

};

export default ServicosPrestados;
