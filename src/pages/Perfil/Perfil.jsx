import React, { useState, useEffect } from "react";
import Servicos from "../../assets/componentes/Servicos";
import { servicosPedreiro } from "../../service/api.js";
import './Perfil.scss';

const Perfil = ({ pedreiro_id }) => {
    const [loading, setLoading] = useState(true);
    const [hasServicos, setHasServicos] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            console.log("Iniciando busca..."); // Log para saber se o useEffect está rodando

            setLoading(true);
            try {
                const data = await servicosPedreiro(pedreiro_id);
                console.log("Resposta da API:", data); // Log para ver o que a API retorna

                if (data.servicos && data.servicos.length > 0) {
                    setHasServicos(true);
                } else {
                    setHasServicos(false);
                }
            } catch (error) {
                console.error("Erro ao buscar serviços:", error);
                setHasServicos(false);
            } finally {
                setLoading(false);
                console.log("Finalizou a busca!"); // Log para saber se chegou no fim
            }
        };

        if (pedreiro_id) {
            fetchData();
        }
    }, [pedreiro_id]);



    return (
        <div>
            {hasServicos ? (
                <h1>Parabéns, você está logado</h1>
            ) : (
                <Servicos />
            )}
        </div>
    );
};

export default Perfil;
