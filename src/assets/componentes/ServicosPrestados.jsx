import React, { useState, useEffect } from "react";
import { servicosPrestados, finalizarServico } from "../../service/api";

const ServicosPrestados = () => {

    const [servPrestados, setServPrestados] = useState([]);
    const [loading, setLoading] = useState(true)
    const pedreiro_id = localStorage.getItem("pedreiro_id");


    useEffect(() => {

        // Carrega os serviços que foram aceitos pelo pedreiro
        const carregarServicos = async () => {

            if (!pedreiro_id) {
                console.error("ID do pedreiro não encontrado.");
                setLoading(false);
                return;
            };

            try {
                const response = await servicosPrestados(pedreiro_id);
                setServPrestados(response.servicos || []);
            } catch (error) {
                console.error("Erro ao buscar serviços prestados:", error);
            } finally {
                setLoading(false);
            }
        };

        carregarServicos();

    }, [pedreiro_id]);

    const handleFinalizarServico = async (servico_id) => {
        try {
            const response = await finalizarServico(servico_id);
            alert(response.message);

            setServPrestados(servPrestados.map(servico =>
                servico.id === servico_id ? { ...servico, status: "Aguardando confirmação" } : servico
            ));
        } catch (error) {
            console.error("Erro ao finalizar serviço!", error);
            alert(`Erro ao finalizar serviço: ${error.response?.data?.message || error.message}`);
        }
    }


    if (loading) return <p>Carregando...</p>;

    const servicosEmAndamento = servPrestados.filter(servico => servico.status === "aceito" || servico.status === "aguardando confirmacao");


    return (
        <div>
            <h3>Serviços em andamento</h3>
            {servicosEmAndamento.length > 0 ? (
                <div>
                    {servicosEmAndamento.map(servico => (
                        <div key={servico.id} className="servico-ativo">
                            <h4>Descrição: {servico.descricao}</h4>
                            <div>
                                <p>Prazo: {servico.prazo}</p>
                                <p>Valor: {servico.valor}</p>
                            </div>
                            <p>Status: {servico.status}</p>
                            <button onClick={() => handleFinalizarServico(servico.id)} disabled={servico.status !== "aceito"}>
                                {servico.status === "aguardando confirmacao" ? "Aguardando confirmação" : "Finalizar Serviço"}
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Sem serviços em andamento</p>
            )}

        </div>
    )
}

export default ServicosPrestados;
