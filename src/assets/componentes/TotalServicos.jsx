import React, { useState, useEffect } from "react";
import { totalServicosFinalizados } from "../../service/api";

const TotalServicos = ({ pedreiro_id }) => {

    const [totalServicos, setTotalServicos] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!pedreiro_id) return;

        const fecthTotalServicos = async () => {
            try {
                const response = await totalServicosFinalizados(pedreiro_id);
                setTotalServicos(response.total);
            } catch (error) {
                console.error("Erro ao buscar avaliações", error);
            } finally {
                setLoading(false);
            }
        };

        fecthTotalServicos();

    }, [pedreiro_id]);

    return (
        <div>
            <h5>Servicos concluídos</h5>
            <span>{loading ? "..." : `${totalServicos}`}</span>
        </div>
    )

}

export default TotalServicos;