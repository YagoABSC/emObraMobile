import React, { useState, useEffect } from "react";
import { buscarServicos, aceitarServico } from "../../service/api.js";
import ServicosPrestados from "./ServicosPrestados.jsx";

const BuscardorServico = () => {

    const [servicos, setServicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const pedreiro_id = localStorage.getItem("pedreiro_id");

    
    useEffect(() => {
        
        console.log("Id do pedreiro: ",pedreiro_id)

        if (!pedreiro_id) {
            console.error("ID do pedreiro não encontrado.");
            setLoading(false);
            return;
        }
        
        // Carrega os serviços que correspondam ao id do pedreiro e serviços que ele cadastrou
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
        // carregarServicos();
    }, []);

    // Mudar status para aceito
    const handleAceitarServico = async (servico_id) => {
        if(!pedreiro_id){
            console.error("ID do pedreiro não encontrado.");
            return;
        }

        try {
            const response = await aceitarServico(servico_id, pedreiro_id);
            alert(response.message);

            // Atualiza os serviços disponíveis (remove o aceito)
            setServicos(servicos.filter(servico => servico.id !== servico_id));

            // Atualiza os serviços prestados chamando a função que busca eles
            ServicosPrestados(); 
        } catch (error) {
            console.error("Erro ao aceitar o serviço: ", error);
            alert("Erro ao aceitar serviço.");
        }
    }

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
                                <button onClick={() => handleAceitarServico(servico.id)}>Aceitar</button>
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

