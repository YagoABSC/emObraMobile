import React, { useState, useEffect } from "react";
import { listarAvaliacoes } from "../../service/api";

const Avaliacoes = ({ pedreiro_id }) => {

    const [avaliacao, setAvaliacao] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        if (!pedreiro_id) return;

        const fetchAvaliacao = async () => {
            try {
                const response = await listarAvaliacoes(pedreiro_id);
                setAvaliacao(response.media);
            } catch (error) {
                console.error("Erro ao buscar avaliações:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAvaliacao();
    }, [pedreiro_id]);


    return (
        <div className="info-especiais">
            <div>
                <h5>Avaliação</h5>
                <span>{loading ? "Carregando..." : `${avaliacao}/5.0`}</span>
            </div>
            <div>
                <h5>Servicos concluídos</h5>
                <span>45</span>
            </div>
        </div>
    )
}

export default Avaliacoes;