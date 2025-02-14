import React, { useState, useEffect } from "react";
import { buscarServicos } from "../../service/api.js";

const BuscardorServico = () => {

    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const pedreiro_id = localStorage.getItem("pedreiro_id");
        console.log("Id do pedreiro: ",pedreiro_id)

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
    }, [])

    if (loading) return <p>Carregando...</p>;

    return (
        <>
            <div>
                <h3>Serviços para você</h3>
                {servicos.length > 0 ? (
                    <div>
                        {servicos.map(servico => (
                            <div key={servico.id}>
                                <p>Tipo de serviço: {servico.tipo_servico_id}</p>
                                <p>Descrição: {servico.descricao}</p>
                                <p>Prazo: {servico.prazo}</p>
                                <p>Distancia de você: {servico.distancia_km}km</p>
                            </div>
                        ))}

                    </div>
                ) : (
                    <p>Nenhum serviço encontrado.</p>
                )}
            </div>

        </>
    )
}

export default BuscardorServico;

